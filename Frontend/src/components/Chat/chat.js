import React, { useState, useEffect, useRef } from 'react';
import { Layout, Button, theme, List, Input } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import useSimpleReactValidator from '../../helpers/useReactSimpleValidator';
import APIUtils from '../../helpers/APIUtils';
import './chat.css';
import { handleOnlineUser } from '../../redux/actions/sidebarAction';
import UploadModal from './uploadModal';
import ImageModal from './imageModal';

const { Content } = Layout;

const api = msg => new APIUtils(msg);

const Chat = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const messagesContainerRef = useRef(null);
  const { activatedSidebarKey, sidebarData } = useSelector(state => state.sidebar);
  const { user } = useSelector(state => state.auth);

  const [validator, setValidator] = useSimpleReactValidator();
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [listenNewMessage, setListener] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const [previewedImage, setPreviewedImage] = useState('');

  const handleModal = bool => {
    setIsModal(bool);
  };

  const handlePreview = bool => {
    setIsPreview(bool);
  };

  const handleFileData = fileData => {
    setFileList(fileData);
  };

  const handleIsImage = bool => {
    setIsImage(bool);
  };

  const handleImageUrls = (imageData, isReset) => {
    if (!isReset) setImageUrls(prevUrls => [...prevUrls, imageData]);
    else setImageUrls(imageData);
  };

  const handleSubmit = async () => {
    try {
      if (fileList.length > 0) {
        await Promise.all(
          fileList.map(async (e, index) => {
            const data = {
              chatId: activatedSidebarKey.key,
              senderId: user,
              content: imageUrls[index],
              mimeType: e.type,
              fileName: e.name,
              isImage: isImage,
            };

            if (socket === null) return;

            const [recipient] = sidebarData.filter(cur => cur.key === activatedSidebarKey.key);
            socket.emit('sendMessage', { content: data, recipient });
            setListener(!listenNewMessage);
            setMessage('');

            await api().sendMessage(data);
          })
        );
        handleFileData([]);
        handleIsImage(false);
        handleImageUrls([], true);
        await getMessages();
      } else if (validator.allValid()) {
        const data = {
          chatId: activatedSidebarKey.key,
          senderId: user,
          content: message,
          isImage: isImage,
        };

        if (socket === null) return;

        const [recipient] = sidebarData.filter(cur => cur.key === activatedSidebarKey.key);
        socket.emit('sendMessage', { content: data, recipient });
        setListener(!listenNewMessage);
        setMessage('');

        await api().sendMessage(data);
        await getMessages();
      } else {
        validator.getErrorMessages();
        setValidator(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getMessages = async () => {
    try {
      const data = {
        chatId: activatedSidebarKey.key,
      };

      const res = await api().getAllMessages(data);

      setAllMessages(res.data.content);
    } catch (e) {
      console.log(e);
    }
  };

  const updateOnlineStatus = async onlineUsers => {
    await dispatch(handleOnlineUser(onlineUsers));
  };

  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // add online users
  useEffect(() => {
    (async () => {
      if (socket === null) return;
      socket.emit('addNewUser', user);
      socket.on('getOnlineUsers', res => {
        updateOnlineStatus(res);
      });

      return () => {
        socket.off('getOnlineUsers');
      };
    })();
  }, [socket]);

  // receive message
  useEffect(() => {
    if (socket === null) return;

    const handleMessageReceived = res => {
      if (activatedSidebarKey.key !== res.recipient.key) return;

      console.log(res);
      setAllMessages(prev => [...prev, res.content]);
    };

    socket.on('getMessage', handleMessageReceived);

    return () => {
      socket.off('getMessage', handleMessageReceived);
    };
  }, [socket, activatedSidebarKey.key, listenNewMessage]);

  useEffect(() => {
    (async () => {
      await getMessages();
    })();
  }, [user, activatedSidebarKey.key]);

  useEffect(() => {
    // Scroll to the bottom of the messages container
    const messagesContainer = messagesContainerRef.current;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, [allMessages]);

  return (
    <Layout>
      <Content style={{ padding: '24px' }}>
        <div
          className="chat-container"
          style={{
            background: colorBgContainer,
          }}
          ref={messagesContainerRef}
        >
          <List
            dataSource={allMessages}
            renderItem={item => (
              <List.Item className={item.senderId === user ? 'textRight' : ''}>
                {item.isImage ? (
                  <img
                    src={item.content}
                    alt="Image"
                    role="presentation"
                    onClick={() => {
                      setPreviewedImage(item.content);
                      handlePreview(true);
                    }}
                  />
                ) : (
                  <>{item.content}</>
                )}
              </List.Item>
            )}
          />
        </div>
        <div className="chat-input">
          <Input
            placeholder="Type a message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onPressEnter={handleSubmit}
            style={{ marginRight: '10px' }}
          />
          {validator.message('message', message, 'required')}
          <PaperClipOutlined className="attach-icon" onClick={() => handleModal(true)} />
          <Button type="primary" onClick={handleSubmit}>
            Send
          </Button>
        </div>
      </Content>

      {isModal && (
        <UploadModal
          handleModal={handleModal}
          isModal={isModal}
          handleFileData={handleFileData}
          handleIsImage={handleIsImage}
          fileList={fileList}
          imageUrls={imageUrls}
          handleImageUrls={handleImageUrls}
          handleSubmit={handleSubmit}
        />
      )}

      {isPreview && (
        <ImageModal
          isPreview={isPreview}
          handlePreview={handlePreview}
          previewedImage={previewedImage}
        />
      )}
    </Layout>
  );
};

export default Chat;

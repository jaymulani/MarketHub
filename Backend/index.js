const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const { dbConnection } = require('./config/config');
const authMiddleware = require('./Middleware/authMiddleware');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');
const productRoute = require('./Routes/productRoute');
const contactusRoute = require('./Routes/contactUsRoute');

const app = express();
const server = http.createServer(app);
require('dotenv').config();
const io = socketIO(server, {
  cors: process.env.FRONTEND_URL,
});

dbConnection();

// app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/chats', authMiddleware, chatRoute);
app.use('/api/message', authMiddleware, messageRoute);
app.use('/api/product', authMiddleware, productRoute);
app.use('/api/contact-us', contactusRoute);
app.get('/', (req, res) => {
  res.send('working');
});

let onlineUsers = [];

io.on('connection', socket => {
  console.log('New connection: ', socket.id);

  // listen to a connection

  socket.on('addNewUser', userId => {
    !onlineUsers.some(user => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    io.emit('getOnlineUsers', onlineUsers);
  });

  // add message
  socket.on('sendMessage', message => {
    const user = onlineUsers.find(cur => cur.userId === message.recipient.id);

    if (user) {
      io.to(user.socketId).emit('getMessage', message);
    }
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

    io.emit('getOnlineUsers', onlineUsers);
  });
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log('Server is running', PORT);
});

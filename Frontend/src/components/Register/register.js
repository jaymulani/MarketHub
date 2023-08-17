import { useState } from 'react';
import { Button, Form, Input, Layout, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useSimpleReactValidator from '../../helpers/useReactSimpleValidator';
import { register } from '../../redux/actions/authActions';
import './register.css';

const { Content } = Layout;

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [fields, setFields] = useState({
    name: null,
    email: null,
    password: null,
  });

  const [validator, setValidator] = useSimpleReactValidator();

  const handleChange = (e, field) => {
    setFields(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (validator.allValid()) {
      await dispatch(register(fields));
      navigate('/chats');
    } else {
      validator.getErrorMessages();
      setValidator(true);
    }
  };

  return (
    <Layout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="container">
          <h1>Register Form</h1>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            autoComplete="off"
          >
            <Form.Item label="name" name="name">
              <Input
                type="text"
                placeholder="name"
                value={fields.name}
                onChange={e => handleChange(e, 'name')}
                autoComplete="new-password"
              />
              {validator.message('Name', fields.name, 'required')}
            </Form.Item>

            <Form.Item label="email" name="email">
              <Input
                type="text"
                placeholder="email"
                value={fields.email}
                onChange={e => handleChange(e, 'email')}
                autoComplete="new-password"
              />
              {validator.message('Email', fields.email, 'required|email')}
            </Form.Item>

            <Form.Item label="Password" name="password">
              <Input.Password
                placeholder="password"
                value={fields.password}
                onChange={e => handleChange(e, 'password')}
                autoComplete="new-password"
              />
              {validator.message('Password', fields.password, 'required')}
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
          <p onClick={() => navigate('/login')}>Sign In</p>
        </div>
      </Content>
    </Layout>
  );
};
export default Register;

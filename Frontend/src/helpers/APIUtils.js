import axios from 'axios';
import { notification } from 'antd';
import store from '../redux/store';
import { logout } from '../redux/actions/authActions';

const TOKEN_NAME = process.env.REACT_APP_TOKEN_NAME;

class ApiUtils {
  constructor(message = false, request = true, appendAuth = true, response = true) {
    this.axios = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/api`,
    });

    if (request) {
      this.axios.interceptors.request.use(
        config => {
          const myConfig = { ...config };
          if (appendAuth) {
            const { auth } = store.getState();
            if (auth.isAuthenticated) myConfig.headers.authorization = auth.token;
          }
          return myConfig;
        },
        error => Promise.reject(error)
      );
    }

    if (response) {
      this.axios.interceptors.response.use(
        config => {
          const myConfig = { ...config };
          if (message) {
            notification.success({
              message: 'Success',
              description: myConfig.data.message,
            });
          }
          return myConfig;
        },
        error => {
          if (error.response.data.status === 401 || error.response.data.status === 403) {
            const { auth } = store.getState();
            notification.error({
              message: 'Error',
              description: error.response.data.message,
            });
            localStorage.removeItem('token');
            if (auth.token) {
              store.dispatch(logout());
              setTimeout(() => window.location.assign('/login'), 1000);
            }
          } else {
            notification.error({
              message: 'Error',
              description: error.response.data.message,
            });
          }
          return Promise.reject(error);
        }
      );
    }
  }

  login = data =>
    this.axios({
      method: 'POST',
      url: '/users/login',
      data,
    });

  register = data =>
    this.axios({
      method: 'POST',
      url: '/users/register',
      data,
    });

  loadUser = headers =>
    this.axios({
      method: 'GET',
      url: '/users/me',
      headers,
    });

  getAllUsers = () =>
    this.axios({
      method: 'GET',
      url: '/users',
    });

  createChat = data =>
    this.axios({
      method: 'POST',
      url: '/chats/',
      data,
    });

  getAllChats = () =>
    this.axios({
      method: 'GET',
      url: '/chats/getAllChats',
    });

  getAllMessages = data =>
    this.axios({
      method: 'POST',
      url: '/message/getMessages',
      data,
    });

  sendMessage = data =>
    this.axios({
      method: 'POST',
      url: '/message/sendMessage',
      data,
    });

  getALlProducts = () =>
    this.axios({
      method: 'POST',
      url: '/product/',
    });

  setContactUs = data =>
    this.axios({
      method: 'POST',
      url: '/contact-us',
      data,
    });
}

export default ApiUtils;

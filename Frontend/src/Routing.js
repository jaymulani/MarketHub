import React, { Suspense, lazy } from 'react';
import { Route, useNavigate, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import GlobalHeader from './shared/header';
import Loader from './shared/loader';

const Chat = lazy(() => import('./components/Chat/chat'));
const Sidebar = lazy(() => import('./shared/sidebar'));
const Login = lazy(() => import('./components/Login/login'));
const Product = lazy(() => import('./components/Product/product'));
const ContactUs = lazy(() => import('./components/ContactUs/contactUs'));
const Faq = lazy(() => import('./components/FAQ/FAQ'));

const { Content } = Layout;

const Routing = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const PublicRoutes = [
    {
      export: true,
      path: '/',
      component: <Login />,
    },
    {
      export: true,
      path: '/login',
      component: <Login />,
    },
  ].filter(cur => cur);

  const PrivateRoutes = [
    {
      export: true,
      path: '/products',
      component: <Product />,
    },
    {
      export: true,
      path: '/chats',
      component: <Chat />,
    },
  ].filter(cur => cur);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : navigate('/login', { replace: true });
  };

  const PublicRoute = ({ children }) => {
    return isAuthenticated ? navigate('/products', { replace: true }) : children;
  };

  return (
    <Suspense className="loader" fallback={<Loader />}>
      <Layout style={{ minHeight: '100vh', display: 'flex' }}>
        {isAuthenticated && <Sidebar style={{ backgroundColor: '#f0f0f0' }} />}
        <Layout style={{ flex: 1, overflow: 'hidden' }}>
          <GlobalHeader />
          <Content style={{ padding: '24px', overflow: 'auto' }}>
            <Routes>
              <Route
                exact={true}
                key={'/contact-us'}
                path={'/contact-us'}
                element={<ContactUs />}
              />
              <Route exact={true} key={'/faq'} path={'/faq'} element={<Faq />} />
              {PublicRoutes.map(route => (
                <Route
                  exact={route.exact}
                  key={route.path}
                  path={route.path}
                  element={<PublicRoute>{route.component}</PublicRoute>}
                />
              ))}
              {PrivateRoutes.map(route => (
                <Route
                  exact={route.exact}
                  key={route.path}
                  path={route.path}
                  element={<PrivateRoute>{route.component}</PrivateRoute>}
                />
              ))}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Suspense>
  );
};

export default Routing;

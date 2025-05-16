import React, { useState } from 'react';
import { Button, Space, Typography } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartDrawer from './CartDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth || {});

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
          E-Commerce Website
        </Title>
      </Link>

      <Space size="middle">
        {isAuthenticated ? (
          <>
            <Text>Welcome, {user?.username}</Text>
            <Button onClick={handleLogout} type="primary">
              Logout
            </Button>
          </>
        ) : (
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
        )}

        <Button
          icon={<ShoppingCartOutlined />}
          onClick={() => setOpen(true)}
          type="primary"
        >
          Cart
        </Button>

        <CartDrawer open={open} onClose={() => setOpen(false)} />
      </Space>
    </div>
  );
};

export default Header;

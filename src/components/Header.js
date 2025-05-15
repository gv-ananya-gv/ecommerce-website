import React, { useState } from 'react';
import { Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import CartDrawer from './CartDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth || {});


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
        padding: 16,
        borderBottom: '1px solid #eee',
      }}
    >
      <h2 style={{ margin: 0 }}>
        <Link to="/"> E-Commerce Website</Link>
      </h2>


      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}</span>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
        )}


        <Button icon={<ShoppingCartOutlined />} onClick={() => setOpen(true)}>
          Cart
        </Button>


        <CartDrawer open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};


export default Header;

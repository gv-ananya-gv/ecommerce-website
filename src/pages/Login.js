import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.auth.error);  
  const [loading, setLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      // Fetch users (mock)
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
      // Find user by email
      const user = data.find(
        u => u.email.toLowerCase() === email.trim().toLowerCase()
      );
      // Mock password check
      if (user && password === 'password') {
        dispatch(loginSuccess(user));
        navigate('/');  
      } else {
        dispatch(loginFailure('Invalid credentials.'));
      }
    } catch (err) {
      dispatch(loginFailure('Login failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <h2>Login</h2>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password />
        </Form.Item>


        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}


        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};


export default Login;

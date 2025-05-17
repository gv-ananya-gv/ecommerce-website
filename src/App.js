import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Drawer, Typography, Button, InputNumber, List } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { removeFromCart, updateQuantity } from './features/cartSlice';
import ProductList from "./components/ProductList";
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Header from './components/Header';
import './App.css';

const { Text } = Typography;

const App = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  // Handlers
  const handleQuantityChange = (productId, value) => {
    dispatch(updateQuantity({ productId, quantity: value }));
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Router>
      <Header onCartClick={() => setIsCartOpen(true)} />

      {/* Cart Drawer */}
      <Drawer
        title="Shopping Cart"
        placement="right"
        onClose={() => setIsCartOpen(false)}
        open={isCartOpen}
        width={350}
      >
        {cartItems.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item
                  key={item.product.id}
                  actions={[
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => handleQuantityChange(item.product.id, value)}
                    />,
                    <Button
                      danger
                      type="link"
                      onClick={() => handleRemove(item.product.id)}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={item.product.title}
                    description={`$${item.product.price.toFixed(2)} x ${item.quantity}`}
                  />
                </List.Item>
              )}
            />
            <Text strong style={{ display: 'block', marginTop: 20 }}>
              Total: ${totalPrice.toFixed(2)}
            </Text>
          </>
        )}
      </Drawer>

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;

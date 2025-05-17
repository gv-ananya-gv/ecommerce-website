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


  // Correct total price calculation using product.price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );


  return (
    <Router>
      <Header onCartClick={() => setIsCartOpen(true)} />


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
                    onChange={(value) =>
                      dispatch(updateQuantity({ productId: item.product.id, quantity: value }))
                    }
                  />,
                  <Button
                    danger
                    onClick={() => dispatch(removeFromCart(item.product.id))}
                    type="link"
                    key="remove"
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
        )}
        <Text strong style={{ display: 'block', marginTop: 20 }}>
          Total: ${totalPrice.toFixed(2)}
        </Text>
      </Drawer>


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

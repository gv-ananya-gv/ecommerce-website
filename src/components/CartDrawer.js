import React from 'react';
import { Drawer, List, Button, InputNumber, Typography, Space, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import { DeleteOutlined } from '@ant-design/icons';


const { Text, Title } = Typography;


const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items) || [];


  // totalPrice calculation with product.price * quantity
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );


  // Note: use productId key to match your slice payload
  const handleQuantityChange = (productId, value) => {
    if (value > 0) {
      dispatch(updateQuantity({ productId, quantity: value }));
    }
  };


  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };


  return (
    <Drawer
      title="Shopping Cart"
      placement="right"
      onClose={onClose}
      open={open}   // correct usage
      width={400}
    >
      <List
        dataSource={items}
        locale={{ emptyText: 'Your cart is empty' }}
        renderItem={item => (
          <List.Item
            key={item.product.id}
            actions={[
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={value => handleQuantityChange(item.product.id, value)}
                key="qty"
              />,
              <Popconfirm
                title="Remove this item?"
                onConfirm={() => handleRemove(item.product.id)}
                okText="Yes"
                cancelText="No"
                key="remove"
              >
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  style={{ width: 60, height: 60, objectFit: 'contain' }}
                />
              }
              title={item.product.title}
              description={`$${item.product.price.toFixed(2)} x ${item.quantity}`}
            />
          </List.Item>
        )}
      />
      <Space style={{ marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
        <Title level={5}>Total:</Title>
        <Text strong style={{ fontSize: 18 }}>${totalPrice.toFixed(2)}</Text>
      </Space>
    </Drawer>
  );
};


export default CartDrawer;

import React from 'react';
import {
  Drawer,
  List,
  Button,
  InputNumber,
  Typography,
  Space,
  Popconfirm,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cartSlice';

const { Text, Title } = Typography;

const CartDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items) || [];

  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

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
      title={<Title level={4} style={{ margin: 0 }}>Shopping Cart</Title>}
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
    >
      <List
        dataSource={items}
        locale={{ emptyText: 'Your cart is empty' }}
        renderItem={(item) => (
          <List.Item key={item.product.id}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <img
                src={item.product.image}
                alt={item.product.title}
                style={{ width: 60, height: 60, objectFit: 'contain', marginRight: 16 }}
              />
              <div style={{ flex: 1 }}>
                <Text strong style={{ display: 'block', marginBottom: 4 }}>
                  {item.product.title}
                </Text>
                <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                  ${item.product.price.toFixed(2)} x {item.quantity}
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) =>
                      handleQuantityChange(item.product.id, value)
                    }
                    size="small"
                  />
                  <Popconfirm
                    title="Remove this item?"
                    onConfirm={() => handleRemove(item.product.id)}
                    okText="Yes"
                    cancelText="No"
                    icon={null}
                  >
                    <Button type="link" danger size="small">
                      Remove
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />

      <Space
        style={{
          marginTop: 20,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Title level={5} style={{ margin: 0 }}>
          Total:
        </Title>
        <Text strong style={{ fontSize: 18 }}>
          ${totalPrice.toFixed(2)}
        </Text>
      </Space>
    </Drawer>
  );
};

export default CartDrawer;

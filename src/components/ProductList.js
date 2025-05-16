import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card, Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Meta } = Card;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          Explore Our Products
        </Title>

        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                onClick={() => navigate(`/product/${product.id}`)}
                cover={
                  <img
                    alt={product.title}
                    src={product.image}
                    style={{ height: 200, objectFit: "contain" }}
                  />
                }
              >
                <Meta
                  title={product.title}
                  description={<strong>${product.price}</strong>}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </div>
  );
};

export default ProductList;

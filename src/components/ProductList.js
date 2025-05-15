import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";


const { Meta } = Card;


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);


  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={<img alt={product.title} src={product.image} style={{ height: 200, objectFit: "contain" }} />}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <Meta title={product.title} description={`$${product.price}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};


export default ProductList;

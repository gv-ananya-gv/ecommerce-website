import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Typography } from "antd";


const { Title, Paragraph } = Typography;

//fetch products from API into product cards
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Detail fetch error:", err));
  }, [id]);


  if (!product) return <p>Loading...</p>;


  return (
    <Card
      style={{ width: "80%", margin: "40px auto" }}
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{ maxHeight: 400, objectFit: "contain" }}
        />
      }
    >
      <Title level={2}>{product.title}</Title>
      <Paragraph>
        <strong>Price:</strong> ${product.price}
      </Paragraph>
      <Paragraph>
        <strong>Category:</strong> {product.category}
      </Paragraph>
      <Paragraph>{product.description}</Paragraph>
    </Card>
  );
};


export default ProductDetails;

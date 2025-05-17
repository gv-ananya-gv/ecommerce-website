import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Select, Slider, Button, Input, Pagination } from 'antd';
import { addToCart } from '../features/cartSlice';

const { Option } = Select;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [allPrices, setAllPrices] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setCategories([...new Set(data.map((p) => p.category))]);
        const prices = data.map((p) => p.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setPriceRange([min, max]);
        setAllPrices([min, max]);
      });
  }, []);

  useEffect(() => {
    let result = [...products];
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    result = result.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(result);
    setCurrentPage(1); 
  }, [selectedCategory, priceRange, products, searchTerm]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange(allPrices);
    setSearchTerm('');
  };

  const paginatedProducts = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div style={{ padding: '20px' }}>
      <h1>EXPLORE PRODUCTS HERE:</h1>

      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <Input
          placeholder="Search products by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: 200,
            height: 40,
            borderRadius: 4,
          }}
        />

        <Select
          placeholder="Select category"
          onChange={(value) => setSelectedCategory(value)}
          style={{ width: 200 }}
          value={selectedCategory}
          allowClear
        >
          {categories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat}
            </Option>
          ))}
        </Select>

        <Slider
          range
          min={allPrices[0]}
          max={allPrices[1]}
          step={1}
          value={priceRange}
          onChange={setPriceRange}
          style={{ width: 300 }}
          tooltip={{ formatter: (value) => `$${value}` }}
        />

        <Button onClick={clearFilters}>Clear Filters</Button>

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginLeft: 'auto' }}
          showSizeChanger={false}
        />
      </div>

      <Row gutter={[16, 16]}>
        {paginatedProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              cover={
                <img
                  alt={product.title}
                  src={product.image}
                  style={{ height: 200, objectFit: 'contain' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                />
              }
              actions={[
                <Button type="primary" onClick={() => dispatch(addToCart(product))}>
                  Add to Cart
                </Button>,
              ]}
            >
              <Card.Meta title={product.title} description={`$${product.price}`} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;

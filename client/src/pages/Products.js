import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import api from '../utils/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Our Products</Title>
      <ProductList>
        {products.map(product => (
          <ProductCard key={product._id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            <ProductPrice>${product.price}</ProductPrice>
          </ProductCard>
        ))}
      </ProductList>
    </Container>
  );
};

const Container = styled(motion.div)`
  padding: 40px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const ProductCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const ProductName = styled.h3`
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-weight: bold;
`;

export default Products;
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Welcome to Honeymoon Skincare</Title>
      <Nav>
        <StyledLink to="/products">Products</StyledLink>
        <StyledLink to="/orders">Orders</StyledLink>
        <StyledLink to="/purchase">Purchase</StyledLink>
        <StyledLink to="/admin">Admin Panel</StyledLink>
      </Nav>
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

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.primary};
  font-size: 18px;
  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

export default Dashboard;
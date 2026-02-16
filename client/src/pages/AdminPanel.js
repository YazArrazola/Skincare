import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AdminPanel = () => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Admin Panel</Title>
      <p>Manage users, products, orders here.</p>
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

export default AdminPanel;
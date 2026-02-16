import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import api from '../utils/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  const exportPDF = (orderId) => {
    window.open(`${process.env.REACT_APP_API_URL}/orders/${orderId}/pdf`, '_blank');
  };

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title>My Orders</Title>
      <OrderList>
        {orders.map(order => (
          <OrderCard key={order._id}
            whileHover={{ scale: 1.02 }}
          >
            <OrderInfo>
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
            </OrderInfo>
            <Button onClick={() => exportPDF(order._id)}>Export PDF</Button>
          </OrderCard>
        ))}
      </OrderList>
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

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OrderCard = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderInfo = styled.div``;

const Button = styled.button``;

export default Orders;
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import api from '../utils/api';

const schema = yup.object({
  productId: yup.string().required('Product is required'),
  quantity: yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
});

const Purchase = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(schema),
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState(JSON.parse(localStorage.getItem('purchaseDraft')) || {});

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

  const watchedValues = watch();
  useEffect(() => {
    localStorage.setItem('purchaseDraft', JSON.stringify(watchedValues));
  }, [watchedValues]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const total = products.find(p => p._id === data.productId).price * data.quantity;
      await api.post('/orders', { products: [{ product: data.productId, quantity: data.quantity }], total });
      localStorage.removeItem('purchaseDraft');
      alert('Purchase successful');
    } catch (err) {
      alert('Purchase failed');
    }
    setLoading(false);
  };

  return (
    <Container
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>Purchase Product</Title>
        <Select {...register('productId')} defaultValue={draft.productId}>
          <option value="">Select Product</option>
          {products.map(product => (
            <option key={product._id} value={product._id}>{product.name}</option>
          ))}
        </Select>
        <Error>{errors.productId?.message}</Error>
        <Input {...register('quantity')} type="number" placeholder="Quantity" defaultValue={draft.quantity} />
        <Error>{errors.quantity?.message}</Error>
        <Button type="submit" disabled={loading}>Purchase</Button>
      </Form>
    </Container>
  );
};

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled.form`
  background: ${props => props.theme.colors.white};
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid ${props => props.theme.colors.lightBrown};
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;

const Error = styled.p`
  color: red;
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
`;

export default Purchase;
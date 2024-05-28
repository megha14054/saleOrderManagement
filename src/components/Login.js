import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

const Login = ({ onLogin }) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.username === 'admin' && data.password === 'password') {
      onLogin(true);
      navigate('/sale-orders');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="md" mx="auto" mt="8">
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input {...register('username', { required: true })} />
      </FormControl>
      <FormControl mt="4">
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register('password', { required: true })} />
      </FormControl>
      <Button mt="4" type="submit">Login</Button>
    </Box>
  );
};

export default Login;

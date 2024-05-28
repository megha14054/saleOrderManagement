import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  customer_id: yup.number().required(),
  invoice_no: yup.string().required(),
  invoice_date: yup.date().required(),
  // Additional validation rules
});

const SaleOrderModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation(newOrder => {
    // Mock API call to create a new sale order
    return Promise.resolve(newOrder);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['saleOrders']);
      onClose();
    },
  });

  const onSubmit = data => {
    mutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Customer ID</FormLabel>
            <Input {...register('customer_id')} isInvalid={errors.customer_id} />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Items</FormLabel>
            {/* Add fields for items */}
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Paid</FormLabel>
            <Input {...register('paid')} />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Invoice No</FormLabel>
            <Input {...register('invoice_no')} isInvalid={errors.invoice_no} />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Invoice Date</FormLabel>
            <Input type="date" {...register('invoice_date')} isInvalid={errors.invoice_date} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;

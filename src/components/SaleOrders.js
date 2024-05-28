import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import SaleOrderModal from './SaleOrderModal';
import { fetchSaleOrders } from '../api/mockApi';

const SaleOrders = () => {
  const { data, isLoading, error } = useQuery(['saleOrders'], fetchSaleOrders);
  const [isModalOpen, setModalOpen] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Box>
      <Button onClick={() => setModalOpen(true)}>+ Sale Order</Button>
      <SaleOrderModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <Tabs>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {/* Map through active sale orders and display them */}
          </TabPanel>
          <TabPanel>
            {/* Map through completed sale orders and display them */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default SaleOrders;

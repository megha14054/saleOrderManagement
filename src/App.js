import { useColorMode, Button, Flex, Box } from '@chakra-ui/react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './components/Login';
import SaleOrders from './components/SaleOrders';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('chakra-ui-color-mode');
    if (savedTheme) {
      document.body.classList.add(savedTheme);
    }
  }, []);

  const handleLogin = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Flex direction="column" minH="100vh">
      <Box p="4">
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Box>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/sale-orders"
          element={<ProtectedRoute isAuthenticated={isAuthenticated}>
            <SaleOrders />
          </ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Flex>
  );
}

export default App;

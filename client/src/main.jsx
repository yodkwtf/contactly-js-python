import { StrictMode } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

const theme = extendTheme({});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);

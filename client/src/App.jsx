import { Button, Container, Stack } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Stack minH="100vh">
      <Navbar />
      <Container maxW="1200px" my={8} flex="1">
        <Button colorScheme="teal">Click me</Button>
      </Container>
      <Footer />
    </Stack>
  );
}

export default App;

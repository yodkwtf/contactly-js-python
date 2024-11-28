import { Container, Heading, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import ContactList from './components/ContactList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const [contacts, setContacts] = useState([]);

  return (
    <Stack minH="100vh">
      <Navbar setContacts={setContacts} />
      <Container maxW="1200px" my={8} flex="1">
        <Stack spacing={4} textAlign="center">
          <Heading as="h1" size="xl">
            Welcome to{' '}
            <Text as="span" color="teal.500">
              Contactly
            </Text>
          </Heading>
          <Text fontSize="lg">Your online public phone directory</Text>
        </Stack>

        <Stack mt={8}>
          <ContactList contacts={contacts} setContacts={setContacts} />
        </Stack>
      </Container>
      <Footer />
    </Stack>
  );
}

export default App;

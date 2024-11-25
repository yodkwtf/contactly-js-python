import contacts from '../data/contacts';
import { SimpleGrid } from '@chakra-ui/react';
import ContactCard from './ContactCard';

const ContactList = () => {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={8}>
      {contacts.map((contact) => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </SimpleGrid>
  );
};
export default ContactList;

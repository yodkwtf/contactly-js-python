import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FaTrash as DeleteIcon } from 'react-icons/fa';
import EditContactModal from './EditContactModal';
import { BASE_URL } from '../config/constants';

const ContactCard = ({ contact, setContacts }) => {
  const { name, phone, occupation, address, gender, imgUrl } = contact;

  const toast = useToast();

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
      });

      // TODO: Handle error based on data return from backend
      if (!res.ok) {
        throw new Error('Failed to delete contact');
      }

      toast({
        title: 'Contact deleted.',
        description: 'Contact deleted successfully.',
        status: 'success',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });

      // Update the UI by calling the setContacts function
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message,
        status: 'error',
        duration: 4000,
        position: 'top-center',
        isClosable: true,
      });
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="6"
      boxShadow="lg"
      bg="white"
      _dark={{ bg: 'gray.700', color: 'white' }}
    >
      <VStack spacing={4}>
        <Flex w="100%" justify="space-between" align="center">
          <Flex gap={'1rem'} align="center">
            <Image
              borderRadius="full"
              boxSize="50px"
              src={
                imgUrl ||
                `https://randomuser.me/api/portraits/${
                  gender === 'male' ? 'men' : 'women'
                }/1.jpg`
              }
              alt={`${name}'s avatar`}
            />
            <Box>
              <Text fontWeight="bold" fontSize="lg">
                {name}
              </Text>
              <Text>{phone}</Text>
            </Box>
          </Flex>

          <HStack spacing={0}>
            <EditContactModal contact={contact} setContacts={setContacts} />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              variant="ghost"
              size="sm"
              aria-label="Delete"
              onClick={() => handleDelete(contact.id)}
            />
          </HStack>
        </Flex>

        <Box w="100%">
          <Text fontSize={'sm'}>
            <strong>Occupation:</strong> {occupation}
          </Text>
          <Text fontSize={'sm'}>
            <strong>Address:</strong> {address}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ContactCard;

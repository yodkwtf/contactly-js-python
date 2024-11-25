import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaTrash as DeleteIcon, FaEdit as EditIcon } from 'react-icons/fa';

const ContactCard = ({ contact }) => {
  const { name, phone, occupation, address, gender, img_url } = contact;

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
                img_url ||
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
            <IconButton
              icon={<EditIcon />}
              colorScheme="teal"
              variant="ghost"
              size="sm"
              aria-label="Edit"
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              variant="ghost"
              size="sm"
              aria-label="Delete"
            />
          </HStack>
        </Flex>

        <Box w="100%">
          <Text fontSize={'sm'}>Job: {occupation}</Text>
          <Text fontSize={'sm'}>
            Address: <em>{address}</em>
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default ContactCard;

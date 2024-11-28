import {
  Box,
  Button,
  Container,
  Flex,
  Spacer,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSun as LuSun } from 'react-icons/fa';
import { IoMoon } from 'react-icons/io5';
import AddContactModal from './AddContactModal';

const Navbar = ({ setContacts }) => {
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');
  const themeBtnBg = useColorModeValue('gray.200', 'gray.800');

  return (
    <Box bg={bg} px={4}>
      <Container maxW="1200px">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box fontWeight="bold" fontSize="xl" color={color}>
            Contactly
          </Box>
          <Spacer />

          <AddContactModal setContacts={setContacts} />

          <Button onClick={toggleColorMode} bg={themeBtnBg}>
            {useColorModeValue(<IoMoon />, <LuSun />)}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

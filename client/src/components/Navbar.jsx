import {
  Box,
  Flex,
  Button,
  useColorMode,
  useColorModeValue,
  Spacer,
  Container,
} from '@chakra-ui/react';
import { IoMoon } from 'react-icons/io5';
import { FaSun as LuSun } from 'react-icons/fa';
import AddContactModal from './AddContactModal';

const Navbar = () => {
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

          <AddContactModal />

          <Button onClick={toggleColorMode} bg={themeBtnBg}>
            {useColorModeValue(<IoMoon />, <LuSun />)}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

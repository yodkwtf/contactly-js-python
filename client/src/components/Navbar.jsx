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
          <Button colorScheme="teal" variant="outline" mr={4}>
            Add Contact
          </Button>
          <Button
            leftIcon={useColorModeValue(<IoMoon />, <LuSun />)}
            onClick={toggleColorMode}
            bg={themeBtnBg}
          >
            {useColorModeValue('Dark', 'Light')}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

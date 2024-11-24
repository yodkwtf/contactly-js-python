import { Box, Text, Link, Stack, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  const bg = useColorModeValue('gray.700', 'black');

  return (
    <Box as="footer" py={4} bg={bg} color="white">
      <Stack direction="row" spacing={4} justify="center">
        <Link href="/">Home</Link>
        <Link href="https://github.com/yodkwtf/contactly-js-python" isExternal>
          Source Code
        </Link>
        <Link href="https://yodkwtf.com" isExternal>
          Portfolio
        </Link>
      </Stack>
      <Text textAlign="center" mt={4}>
        © {new Date().getFullYear()} Contactly. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;

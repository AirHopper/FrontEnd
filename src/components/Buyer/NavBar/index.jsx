import {
  Box,
  Flex,
  Spacer,
  Input,
  Button,
  Icon,
  Image,
} from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box bg="teal.500" px={4} py={2}>
      <Flex align="center" maxW="1200px" mx="auto">
        {/* Logo */}
        <Image src="/logo.png" alt="Logo" boxSize="40px" />

        {/* Spacer */}
        <Spacer />

        {/* Search Bar */}
        <InputGroup maxW="400px" mx={4}>
          <Input placeholder="Search..." borderRadius="full" bg="white" />
          <InputRightElement>
            <Icon as={SearchIcon} color="gray.500" />
          </InputRightElement>
        </InputGroup>

        {/* Login Button */}
        <Button colorScheme="blue" borderRadius="full">
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default NavBar;

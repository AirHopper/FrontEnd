import { Box, Flex, Input, Button, Icon, Spacer } from "@chakra-ui/react";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={3} boxShadow="md">
      <Flex align="center">
        {/* Logo */}
        <Box color="white" fontSize="xl" fontWeight="bold">
          MyLogo
        </Box>

        {/* Search Bar */}
        <Flex align="center" w={{ base: "50%", md: "30%" }}>
          <Input
            placeholder="Search..."
            size="md"
            bg="white"
            borderRadius="md"
            mr={2}
          />
          <Button bg="white" color="teal.500" size="md">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Flex>

        {/* Spacer to separate the logo from the rest */}
        <Spacer />

        {/* Login Button */}
        <Button
          as={Link}
          to="/login"
          ml={4}
          colorScheme="teal"
          variant="outline"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Login
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;

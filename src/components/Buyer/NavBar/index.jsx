import { Box, Flex, Input, Button, Spacer, Container } from "@chakra-ui/react";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { ColorModeButton } from "../../ui/color-mode";

const Navbar = () => {
  return (
    <Container bg="teal.500" px={5} py={4} boxShadow="md">
      <Flex align="center" gap={3}>
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
            borderRadius="xl"
            mr={2}
          />
          <Button bg="white" color="teal.500" size="md">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Flex>

        {/* Spacer to separate the logo from the rest */}
        <Spacer />

        {/* Dark/Light Mode Toggle */}
        <ColorModeButton ml={4} />

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
    </Container>
  );
};

export default Navbar;

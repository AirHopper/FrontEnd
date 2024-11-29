import {
  Box,
  Flex,
  Input,
  Button,
  Spacer,
  Container,
  Image,
} from "@chakra-ui/react";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { Logo } from "../../../assets/img";
import { ColorModeButton } from "../../ui/color-mode";

const Navbar = () => {
  return (
    <Container
      px={{ sm: "2vw", lg: "5vw" }}
      py={2}
      boxShadow="md"
      zIndex={20}
      bgColor="white"
    >
      <Flex align="center" gap={5}>
        {/* Logo */}
        <Box
          bgColor="#2078b8"
          fontSize="xl"
          fontWeight="bold"
          borderRadius="full"
        >
          <Image src={Logo} alt="AirHopper Logo" width="5vw" />
        </Box>

        <Flex
          align="center"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.300"
          _dark={{ bgColor: "gray.700" }}
          px={3}
          w="full"
          maxW="400px"
        >
          <Input
            placeholder="Search..."
            variant="unstyled"
            size="md"
            mr={2}
            _dark={{ bgColor: "gray.700" }}
          />
          <FontAwesomeIcon
            as={Button}
            cursor="pointer"
            aria-label="Search"
            size="lg"
            icon={faMagnifyingGlass}
            color="#8A8A8A"
          />
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
          borderRadius={10}
          bg="#44b3f8"
          border="#44b3f8"
          color="white"
          colorPalette="cyan"
          variant="outline"
          _hover={{
            bg: "#2078b8",
            color: "white",
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Masuk
        </Button>
      </Flex>
    </Container>
  );
};

export default Navbar;

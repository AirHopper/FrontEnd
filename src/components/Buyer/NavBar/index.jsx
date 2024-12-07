import {
  Box,
  Flex,
  Button,
  Spacer,
  Container,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
        <HStack>
          <Box
            bgColor="#2078b8"
            fontWeight="bold"
            borderRadius="full"
            width="35px"
          >
            <Image src={Logo} alt="AirHopper Logo" />
          </Box>
          <Text fontWeight="bold" color="#2078b8">
            AirHopper
          </Text>
        </HStack>

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

import React from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  HStack,
  Link,
  Image,
  Button,
} from "@chakra-ui/react";
import { faPlaneUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LogoAirHopper } from "../../assets/img";

const Footer = () => {
  return (
    <Box
      as="footer"
      bgColor="#2078b8"
      color="white"
      py={4}
      mt="auto" // Untuk memastikan footer berada di bawah
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={6}
        >
          {/* Logo dan Judul */}
          <HStack spacing={4} align="center">
            <Image
              src={LogoAirHopper}
              alt="Logo AirHopper"
              boxSize="50px"
              borderRadius="full"
            />
            <Text fontSize="2xl" fontWeight="bold">
              AirHopper
            </Text>
          </HStack>

          {/* Links */}
          <Flex
            direction={{ base: "column", md: "row" }}
            mt={{ base: 6, md: 0 }}
            align={{ base: "flex-start", md: "center" }}
          >
            <VStack align="flex-start" spacing={2} mr={{ base: 0, md: 8 }}>
              <Text fontWeight="semibold" textTransform="uppercase">
                Ikuti Kami
              </Text>
              <Link href="#" _hover={{ textDecoration: "underline" }}>
                GitHub
              </Link>
              <Link href="#" _hover={{ textDecoration: "underline" }}>
                Tentang Kami
              </Link>
            </VStack>
            <VStack align="flex-start" spacing={2}>
              <Text fontWeight="semibold" textTransform="uppercase">
                Penerbangan
              </Text>
              <Link href="#" _hover={{ textDecoration: "underline" }}>
                Domestik
              </Link>
            </VStack>
          </Flex>
        </Flex>

        <Flex
          mt={6}
          align="center"
          justify={{ base: "center", md: "space-between" }}
          direction={{ base: "column", md: "row" }}
        >
          <Text fontSize="sm" textAlign="center">
            © 2024 AirHopper | Seluruh Hak Cipta Dilindungi.
          </Text>
          <Button
            aria-label="Scroll to Top"
            colorScheme="blue"
            bg="blue.500"
            _hover={{ bg: "blue.400" }}
            mt={{ base: 4, md: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <FontAwesomeIcon
              icon={faPlaneUp}
              size="xl"
              style={{ color: "#74C0FC" }}
            />
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;

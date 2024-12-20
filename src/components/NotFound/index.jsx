
import { Button, Container, Heading, Image, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { notFound } from "../../assets/img";


const NotFoundPage = () => {
  // Responsively adjust the image size and container width
  const containerWidth = useBreakpointValue({ base: "90%", md: "60%" });

  return (
    <Container maxW="container.xl" h="100vh" centerContent>
      <VStack spacing={6} align="center" justify="center" height="100%">
        {/* Gambar untuk halaman 404 */}
        <Image
          src={notFound}
          alt="404 Not Found"
          boxSize="400px"
          objectFit="contain"
          mb={4}
        />
        
        <Heading as="h1" size="2xl" color="gray.700" fontWeight="bold">
          404 - Page Not Found
        </Heading>

        <Text fontSize="lg" color="gray.500" textAlign="center" maxWidth="500px">
          Oops! The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.
        </Text>

        <Button
            mt={{ base: 5, sm: 4, md: 2 }} 
            variant="ghost"
            as={Link}
            to="/" 
            bg="#44b3f8"
            borderRadius="10px"
            _hover={{
                color: "blue.700", 
                bg: "yellow.300", 
                transform: "scale(1.05)",
                boxShadow: "xl",
          }}
        >
          Go Back to Homepage
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFoundPage;

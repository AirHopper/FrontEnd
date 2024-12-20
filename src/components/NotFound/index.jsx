// components/NotFoundPage.js

import { Box, Button, Container, Heading, Image, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "../../assets/img";


const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const NotFoundPage = () => {
  const containerWidth = useBreakpointValue({ base: "90%", md: "60%" });

  return (
    <Container maxW="container.xl" h="100vh" centerContent>
      <VStack spacing={6} align="center" justify="center" height="100%">
        {/* Gambar dengan animasi bounce */}
        <MotionBox
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        >
          <Image
            src={notFound}
            alt="404 Not Found"
            boxSize="400px"
            objectFit="contain"
            mb={4}
          />
        </MotionBox>

        {/* Heading dengan efek fade-in */}
        <MotionHeading
          as="h1"
          size="2xl"
          color="gray.700"
          fontWeight="bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          404 - Page Not Found
        </MotionHeading>

        {/* Text dengan efek slide-in */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Text fontSize="lg" color="gray.500" textAlign="center" maxWidth="500px">
            Oops! The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the homepage.
          </Text>
        </motion.div>

        {/* Tombol dengan animasi hover */}
        <Button
          as={Link}
          to="/"
          variant="solid"
          bg="#44b3f8"
          size="lg"
          mt={4}
          borderRadius="10px"
          _hover={{
            bg: "#359dd7",
            transform: "scale(1.05)",
            boxShadow: "lg",
          }}
          whileHover={{ scale: 1.1 }}
        >
          Go Back to Homepage
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFoundPage;

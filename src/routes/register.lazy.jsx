import * as React from "react";
import {
  Container,
  Row,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { CarAuth } from "../assets/img";

export const Route = createLazyFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <Container maxW="100%" h="80vh" p={0} display="flex">
      <Row w="100%" m={0}>
        {/* Left side with image */}
        <Box
          md={6}
          style={{
            backgroundImage: `url(${CarAuth})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
          }}
        ></Box>

        {/* Right side with form */}
        <Box md={6} display="flex" alignItems="center" justifyContent="center">
          <Container maxW="500px" p="0.5rem" w="100%">
            <Text fontSize="lg" fontWeight="bold" mb={3} color="gray.600">
              BINAR CAR RENTAL
            </Text>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              Welcome!
            </Text>
            <form onSubmit={onSubmit}>
              {/* Name Field */}
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="text" placeholder="Complete Name" />
              </FormControl>

              {/* Email Field */}
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" placeholder="Email" />
              </FormControl>

              {/* Password Field */}
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input id="password" type="password" placeholder="Password" />
              </FormControl>

              {/* Confirm Password Field */}
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
              </FormControl>

              {/* Profile Picture Field */}
              <FormControl mb={4} isRequired>
                <FormLabel htmlFor="profilePicture">Profile Picture</FormLabel>
                <Input
                  id="profilePicture"
                  type="file"
                  accept=".jpeg, .jpg, .png"
                />
              </FormControl>

              {/* Submit Button */}
              <Button type="submit" colorScheme="teal" size="lg" width="full">
                Sign Up
              </Button>
            </form>

            {/* Alternative text for login */}
            <Text fontSize="sm" mt={2} textAlign="center">
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#38B2AC" }}>
                Sign In
              </Link>
            </Text>
          </Container>
        </Box>
      </Row>
    </Container>
  );
}

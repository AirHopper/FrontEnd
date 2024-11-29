import React, { useEffect, useState } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  Separator,
  Box,
  Image,
  useBreakpointValue,
  HStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { LogoAirHopper } from "../assets/img";
import AirHopper from "@/assets/img/airhopper.jpg"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from '@react-oauth/google';
import { login, googleLogin } from "../services/auth"; // Ensure this is the correct path to your auth services
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { toast } from 'react-toastify'; // Ensure toast is imported

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); // Change to identifier
  const [password, setPassword] = useState("");
  const [identifierError, setIdentifierError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  // Mutation for login
  const { mutate: loginUser  } = useMutation({
    mutationFn: async (body) => {
      return await login(body); // Assuming login is your API call
    },
    onSuccess: (data) => {
      dispatch(setToken(data?.token));
      toast.success("Login Success")
      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error(err?.message || "Login failed. Please check your credentials.");
    },
  });

  // Mutation for Google login
    const { mutate: googleLoginUser } = useMutation({
      mutationFn: (accessToken) => googleLogin({ accessToken }),
      onSuccess: (data) => {
          dispatch(setToken(data?.token));
            
          navigate({ to: "/" });
      },
      onError: (err) => {
          toast.error("Google login failed. Please try again.");
      },
    }); 

  const handleLogin = (e) => {
    e.preventDefault();
    // Reset errors
    setIdentifierError(false);
    setPasswordError(false);

    // Simple validation
    if (!identifier) {
      setIdentifierError(true);
    }
    // if (password.length < 6) {
    //   setPasswordError(true);
    // }

    // Submit logic
    if (!identifierError) {
      const body = {
        identifier, // Use identifier for email or phone number
        password,
      };

      loginUser (body); // Call the login mutation
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
        googleLoginUser(tokenResponse.access_token);
        console.log(tokenResponse)
    },
    onError: (err) => {
        console.error(err);
        toast.error("Google login initialization failed.");
    },
});

  // Responsively adjust the width of the left and right boxes
  const leftBoxWidth = useBreakpointValue({ base: "100%", md: "55%" });
  const rightBoxWidth = useBreakpointValue({ base: "100%", md: "45%" });

  // Hide image on tablet breakpoints
  const imageDisplay = useBreakpointValue({ base: "none", md: "block" });

  return (
    <Flex
      w="100%"
      h="100vh"
      alignItems="center"
      direction={{ base: "column ", md: "row" }} // Stack the boxes on small screens
    >
      {/* Left Section with Image */}
      <Box
        w={leftBoxWidth}
        h="100vh"
        position="relative"
        display={imageDisplay} // Hide image on tablet breakpoints
        justifyContent="center"
        alignItems="center"
        overflow="hidden" // Prevents image overflow
      >
        <Image
          src={AirHopper}
          alt="AirHopper"
          objectFit="cover" // Ensures image covers the entire area
          w="100%" // Make image larger
          h="100%"
          position="absolute" // Keeps the image in the background
          top="0"
          left="0"
        />
      </Box>

      {/* Right Side - Login Form */}
      <Stack
        bg="white"
        w={rightBoxWidth}
        p="6%"
        ml={{ base: 0, md: 5 }} // Add margin on larger screens
        mt={{ base: -5, md: -16 }} // Adjust margin top to move upward
        mr={{ base: 0, md: 3 }} // Add margin on smaller screens
        position="relative" // Ensure proper positioning
      >
        {/* Heading and Description */}
        <Stack spacing={4} textAlign="center" mb="1">
          <Flex w="100%" justify="space-between" align="center" mb={2}>
            <Button
              mt={{ base: 5, sm: 4, md: 2 }} // Responsive margin top values
              variant="ghost"
              as={Link} to="/" // Navigate to the homepage
              color="blue.500"
              borderRadius="10px"
              _hover={{
                color: "blue.700", // Change text color on hover
                bg: "yellow.300", // Add a background color on hover
                transform: "scale(1.05)", // Slightly enlarge the button on hover
                boxShadow: "xl", // Add shadow effect
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </Button>

            <Image
              src={LogoAirHopper}
              alt="AirHopper"
              boxSize="100px" // Set the size of the logo (adjust as needed)
              objectFit="contain" // Ensure the image fits within the specified box size
              mb={0} // Add margin at the bottom to separate the image from the text
              display="block" // Make the image a block element
              mx="auto"
            />
          </Flex>
          <Heading as="h1" size="4xl" mb="3">
            AirHopper
          </Heading>
          <Text as="p" fontSize="lg">
            Your Traveling Partner
          </Text>
          <Text as="p" fontSize="lg" mb="5">
            Sign in to get the best promotions in AirHopper
          </Text>
        </Stack>

        <Heading as="h1" size="2xl" color="#333" mb="3" fontWeight={"bold"}>
          Sign In
        </Heading>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <Stack gap="4">
            {/* Email or Phone Field */}
            <Field
              label="Email Address or Phone Number"
              invalid={identifierError}
              errorText={identifierError && "Invalid email or phone number"}
            >
              <Input
                borderRadius="10px"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your email or phone number"
              />
            </Field>

            {/* Password Field Label with Forgot Password Link */}
            <HStack justifyContent="space-between" mb="1">
              <Text fontSize="sm" fontWeight="medium">
                Password
              </Text>
              <Text as={Link} to="/forgot-password" color="blue.500" fontSize="sm">
                Forgot Password?
              </Text>
            </HStack>

            {/* Password Field */}
            <Field
              invalid={passwordError}
              errorText={passwordError && "Password must be at least 6 characters"}
            >
              <PasswordInput
                borderRadius="10px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </Field>

            {/* Submit Button */}
            <Button
              borderRadius="10px"
              type="submit"
              color="white" // Set text color to white
              width="full"
              bg="#44b3f8"
              _hover={{
                bg: "#359dd7", // Change background color on hover
                transform: "scale(1.02)", // Slightly enlarge the button on hover
                boxShadow: "md", // Add a shadow for depth
              }}
            >
              Sign In
            </Button>

            <HStack>
              <Separator />
              <Text flexShrink="0">or sign in with</Text>
              <Separator />
            </HStack>

            <Button
              onClick={handleGoogleLogin}
              borderRadius="10px"
              type="button" // Change to type="button" to prevent form submission
              variant="outline"
              color="black"
              width="full"
              _hover={{
                transform: "scale(1.02)", // Slightly enlarge the button on hover
                boxShadow: "md", // Add a shadow for depth
              }}
            >
              <FontAwesomeIcon icon={faGoogle} />
              Sign In With Google
            </Button>
          </Stack>
        </form>

        {/* Sign Up Link */}
        <Text textAlign="center" mt="4">
          Don't have an account?{" "}
          <Text as={Link} to="/register" color="blue.500">
            Sign Up
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
}
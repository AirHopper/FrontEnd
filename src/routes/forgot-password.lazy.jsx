import React, { useState, useEffect } from 'react';
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router';
import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  Box,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { LogoAirHopper } from '../assets/img';
import AirHopper from '@/assets/img/airhopper.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify'; // Make sure you import toast for notifications
import { forgotPassword } from '../services/auth'; // Ensure correct path to your service
import { useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";

export const Route = createLazyFileRoute('/forgot-password')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Reset errors
    setEmailError(false);

    // Simple validation for email
    if (!email.includes('@')) {
      setEmailError(true);
      return; // Prevent form submission if the email is invalid
    }
    try {
      // Call forgotPassword API service
      const response = await forgotPassword(email);
        toast.success('Password reset email sent successfully!');
      
    } catch (error) {
      toast.error(error?.message || 'Failed to send password reset email');
    }
  };

  // Responsively adjust the width of the left and right boxes
  const leftBoxWidth = useBreakpointValue({ base: '100%', md: '55%' });
  const rightBoxWidth = useBreakpointValue({ base: '100%', md: '45%' });

  // Hide image on tablet breakpoints
  const imageDisplay = useBreakpointValue({ base: 'none', md: 'block' });

  return (
    <Flex
      w="100%"
      h="100vh"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }} // Stack the boxes on small screens
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

      {/* Right Side - Forgot Password Form */}
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
          {/* Row to align Image and Button */}
          <Flex w="100%" justify="" align="center" mb={2}>
            {/* Back Button (Aligned to the left) */}
            <Button
              mt={{ base: 5, sm: 4, md: 2 }} // Responsive margin top values
              variant="ghost"
              as={Link}
              to="/" // Navigate to the homepage
              color="blue.500"
              borderRadius="10px"
              _hover={{
                color: 'blue.700', // Change text color on hover
                bg: 'yellow.300', // Add a background color on hover
                transform: 'scale(1.05)', // Slightly enlarge the button on hover
                boxShadow: 'xl', // Add shadow effect
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </Button>

            {/* Image (Centered in the remaining space) */}
          </Flex>
          {/* Image (Centered in the remaining space) */}
          <Image
            src={LogoAirHopper}
            alt="AirHopper"
            boxSize="100px" // Set the size of the logo (adjust as needed)
            objectFit="contain" // Ensure the image fits within the specified box size
            mb={0} // Add margin at the bottom to separate the image from the text
            display="block" // Make the image a block element
            mx="auto"
          />
          <Heading as="h1" size="4xl" mb="3">
            AirHopper
          </Heading>
          <Text as="p" fontSize="lg" mb="5">
            Send Email to Reset your Password
          </Text>
        </Stack>

        <Heading as="h1" size="2xl" color="#333" mb="3" fontWeight={'bold'}>
          Forgot Password
        </Heading>

        {/* Form */}
        <form onSubmit={handleForgotPassword}>
          <Stack gap="4">
            {/* Email Field */}
            <Field
              label="Email Address"
              invalid={emailError}
              errorText={emailError && 'Invalid email address'}
            >
              <Input
                borderRadius="10px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
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
                bg: '#359dd7', // Change background color on hover
                transform: 'scale(1.02)', // Slightly enlarge the button on hover
                boxShadow: 'md', // Add a shadow for depth
              }}
            >
              Send Email
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}


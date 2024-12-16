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
import { Typewriter } from 'react-simple-typewriter';

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
        toast.success('Tautan reset password telah terkirim');
      
    } catch (error) {
      toast.error(error?.message || 'Gagal untuk mengirim tautan reset password');
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
      h="100%"
      alignItems="center"
      direction={{ base: 'column', md: 'row' }}
    >
      <Box
        w={leftBoxWidth}
        bgGradient="to-tr" gradientFrom="rgba(38,31,163,1) 45%" gradientTo="rgba(0,212,255,1) 90%"
        h="120vh"
        position="relative"
        display={imageDisplay} 
        justifyContent="center"
        alignItems="center"
        overflow="hidden" 
      >
        {/* Gambar AirHopper */}
        <Image
          src={LogoAirHopper}
          alt="AirHopper"
          objectFit="cover" 
          w="40%" 
          position="absolute"
          top="40%" 
          left="50%"
          transform="translate(-50%, -50%)" // Center the image
        />
        
        {/* Teks di bawah gambar dengan teks statis dan animasi */}
        <Box
          position="absolute" 
          top="70%" 
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center" 
          color="white" 
        >
          {/* Teks Statis */}
          <Text fontSize="5xl" fontWeight="bold" mb="2">
            AirHopper
          </Text>
          {/* Teks dengan Animasi */}
          <Text fontSize="4xl" fontWeight="medium">
            <Typewriter
              words={['Partner perjalanan anda!', 'Solusi untuk pengalaman terbaik']}
              loop={true} 
              cursor 
              cursorStyle="|" 
              typeSpeed={70} 
              deleteSpeed={50} 
              delaySpeed={1000} 
            />
          </Text>
        </Box>
      </Box>

      {/* Right Side - Forgot Password Form */}
      <Stack
        bg="white"
        w={rightBoxWidth}
        p="6%"
        ml={{ base: 0, md: 5 }} 
        mt={{ base: -5, md: -16 }} 
        mr={{ base: 0, md: 3 }} 
        position="relative" 
      >
        {/* Heading and Description */}
        <Stack spacing={4} textAlign="center" mb="1">
          {/* Row to align Image and Button */}
          <Flex w="100%" justify="" align="center" mb={2}>
            {/* Back Button (Aligned to the left) */}
            <Button
              mt={{ base: 5, sm: 4, md: 2 }}
              variant="ghost"
              as={Link}
              to="/" 
              color="blue.500"
              borderRadius="10px"
              _hover={{
                color: 'blue.700', 
                bg: 'yellow.300', 
                transform: 'scale(1.05)', 
                boxShadow: 'xl', 
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </Button>

            {/* Image (Centered in the remaining space) */}
          </Flex>
          <Box
              bgColor="#2078b8"
              fontWeight="bold"
              mx="auto"
              borderRadius="full"
            >
              <Image
                src={LogoAirHopper}
                alt="AirHopper"
                boxSize="100px"
                objectFit="contain"
                mb={0} 
                display="block" 
                mx="auto"
              />
            </Box>
            <Heading as="h1" size="4xl" fontWeight="bold" color="#2078b8">
              AirHopper
            </Heading>
          <Text as="p" fontSize="lg" mb="5">
            Kirim email untuk reset password
          </Text>
        </Stack>

        <Heading as="h1" size="2xl" color="#333" mb="3" fontWeight={'bold'}>
          Lupa password
        </Heading>

        {/* Form */}
        <form onSubmit={handleForgotPassword}>
          <Stack gap="4">
            {/* Email Field */}
            <Field
              label="Email Address"
              invalid={emailError}
              errorText={emailError && 'Email tidak ditemukan'}
            >
              <Input
                borderRadius="10px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Masukkan email"
              />
            </Field>

            {/* Submit Button */}
            <Button
              borderRadius="10px"
              type="submit"
              color="white" 
              width="full"
              bg="#44b3f8"
              _hover={{
                bg: '#359dd7',
                transform: 'scale(1.02)',
                boxShadow: 'md', 
              }}
            >
              Kirim Email
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}


import React, { useEffect, useState } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
  HStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import AirHopper from "@/assets/img/airhopper.jpg"; // Your image
import { LogoAirHopper } from '../assets/img';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { resetPassword } from "../services/auth"; // Assume your reset password API service
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { Typewriter } from 'react-simple-typewriter';

export const Route = createLazyFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  // Extract token from URL
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token); // Save the token in local storage
    }
  }, []);

  if (!token) {
    navigate({ to: "/login" });
  }

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordError(false);
    setConfirmPasswordError(false);
  
    // Basic validation for password length
    if (newPassword.length < 6) {
      setPasswordError(true);
    }
  
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
    }
  
    if (newPassword.length >= 8 && newPassword === confirmPassword) {
      const token = localStorage.getItem("token"); // Get the token from local storage
  
      const body = {
        token,
        newPassword,
        confirmPassword,
      };
  
      if (token) {
        try {
          // Await the response from the resetPassword service
          await resetPassword(body);
          toast.success("Your Password has Been Reset")

          dispatch(setToken(null));

          localStorage.removeItem("token"); // Corrected removal of token

          navigate({ to: "/login"}); // Redirect to login page after success
        } catch (err) {
          console.error("Error resetting password:", err.message);
        }
      }
    }
  };

  // Responsively adjust the width of the left and right boxes
  const leftBoxWidth = useBreakpointValue({ base: "100%", md: "55%" });
  const rightBoxWidth = useBreakpointValue({ base: "100%", md: "45%" });

  const imageDisplay = useBreakpointValue({ base: "none", md: "block" });

  return (
    <Flex w="100%" h="100%" alignItems="center" direction={{ base: "column", md: "row" }}>
      <Box
        w={leftBoxWidth}
        bgGradient="to-tr" gradientFrom="rgba(38,31,163,1) 45%" gradientTo="rgba(0,212,255,1) 90%"
        h="120vh"
        position="relative"
        display={imageDisplay} // Hide image on tablet breakpoints
        justifyContent="center"
        alignItems="center"
        overflow="hidden" // Prevents image overflow
      >
        {/* Gambar AirHopper */}
        <Image
          src={LogoAirHopper}
          alt="AirHopper"
          objectFit="cover" // Ensures image covers the entire area
          w="40%" // Make image larger
          position="absolute" // Keeps the image in the background
          top="40%" // Adjust the vertical position of the image
          left="50%"
          transform="translate(-50%, -50%)" // Center the image
        />
        
        {/* Teks di bawah gambar dengan teks statis dan animasi */}
        <Box
          position="absolute" // Ensures the text is positioned relative to the parent Box
          top="70%" // Position the text below the image
          left="50%"
          transform="translate(-50%, -50%)" // Center the text horizontally
          textAlign="center" // Center align the text content
          color="white" // Text color
        >
          {/* Teks Statis */}
          <Text fontSize="5xl" fontWeight="bold" mb="2">
            AirHopper
          </Text>
          {/* Teks dengan Animasi */}
          <Text fontSize="4xl" fontWeight="medium">
            <Typewriter
              words={['Partner perjalanan anda!', 'Solusi untuk pengalaman terbaik']}
              loop={true} // Loops through the text
              cursor // Show a blinking cursor
              cursorStyle="|" // Customize cursor style
              typeSpeed={70} // Speed of typing
              deleteSpeed={50} // Speed of deleting
              delaySpeed={1000} // Delay before typing the next word
            />
          </Text>
        </Box>
      </Box>

      {/* Right Side - Reset Password Form */}
      <Stack bg="white" w={rightBoxWidth} p="6%" ml={{ base: 0, md: 5 }} mt={{ base: -5, md: -16 }} mr={{ base: 0, md: 3 }} position="relative">
        <Stack spacing={4} textAlign="center" mb="1">
          <Flex w="100%" justify="space-between" align="center" mb={2}>
            <Button
              mt={{ base: 5, sm: 4, md: 2 }}
              variant="ghost"
              as={Link}
              to="/"
              color="blue.500"
              borderRadius="10px"
              _hover={{ color: "blue.700", bg: "yellow.300", transform: "scale(1.05)", boxShadow: "xl" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </Button>
          </Flex>

          <Heading as="h1" size="2xl" fontWeight="bold" color="#2078b8">
            AirHopper
          </Heading>
          <Text as="p" fontSize="lg" mb="5">Reset password baru anda</Text>
        </Stack>

        <Heading as="h1" size="2xl" color="#333" mb="3" fontWeight={"bold"}>
          Reset Password
        </Heading>

        {/* Form */}
        <form onSubmit={handleResetPassword}>
          <Stack gap="4">
            {/* New Password Field */}
            <Field label="Password Baru" invalid={passwordError} errorText={passwordError && "Password harus 8 karakter"}>
              <PasswordInput
                borderRadius="10px"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Masukkan password"
              />
            </Field>

            {/* Confirm Password Field */}
            <Field label="Konfirmasi Password" invalid={confirmPasswordError} errorText={confirmPasswordError && "Password tidak sama"}>
              <PasswordInput
                borderRadius="10px"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Konfirm password baru"
              />
            </Field>

            {/* Submit Button */}
            <Button
              borderRadius="10px"
              type="submit"
              color="white"
              width="full"
              bg="#44b3f8"
              _hover={{ bg: "#359dd7", transform: "scale(1.02)", boxShadow: "md" }}
            >
              Reset Password
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}
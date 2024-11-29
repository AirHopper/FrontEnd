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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { resetPassword } from "../services/auth"; // Assume your reset password API service

export const Route = createLazyFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigate = useNavigate();

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
  
    if (newPassword.length >= 6 && newPassword === confirmPassword) {
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
    <Flex w="100%" h="100vh" alignItems="center" direction={{ base: "column", md: "row" }}>
      {/* Left Section with Image */}
      <Box w={leftBoxWidth} h="100vh" position="relative" display={imageDisplay} justifyContent="center" alignItems="center" overflow="hidden">
        <Image src={AirHopper} alt="AirHopper" objectFit="cover" w="100%" h="100%" position="absolute" top="0" left="0" />
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

          <Heading as="h1" size="4xl" mb="3">AirHopper</Heading>
          <Text as="p" fontSize="lg" mb="5">Reset your new password</Text>
        </Stack>

        <Heading as="h1" size="2xl" color="#333" mb="3" fontWeight={"bold"}>
          Reset Password
        </Heading>

        {/* Form */}
        <form onSubmit={handleResetPassword}>
          <Stack gap="4">
            {/* New Password Field */}
            <Field label="New Password" invalid={passwordError} errorText={passwordError && "Password must be at least 6 characters"}>
              <PasswordInput
                borderRadius="10px"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
              />
            </Field>

            {/* Confirm Password Field */}
            <Field label="Confirm Password" invalid={confirmPasswordError} errorText={confirmPasswordError && "Passwords do not match"}>
              <PasswordInput
                borderRadius="10px"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
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
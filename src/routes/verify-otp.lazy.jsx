import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  HStack,
} from "@chakra-ui/react";
import { PinInput } from "@/components/ui/pin-input";
import { createLazyFileRoute, Link, useLocation, useNavigate } from "@tanstack/react-router";
import NavbarOtp from "../components/Otp/NavbarOtp";
import { verifyOTP, resendOtp } from "../services/auth";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const Route = createLazyFileRoute("/verify-otp")({
  component: VerifyOtpPage,
});

function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [otpCode, setOtpCode] = useState("");
  const [email, setEmail] = useState(location.state?.email || ""); // Email from registration
  const [timer, setTimer] = useState(60); // Timer 3 minutes
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval
  }, [timer]); // Add `timer` for dependency to detect timer change

  // Format time
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 6) {
      toast.error("Silakan masukkan kode OTP 6 digit yang valid.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {  
      const result = await verifyOTP(email, otpCode);
      toast.success("Email Anda telah berhasil diverifikasi.");
      navigate({ to: "/login" }); // Redirect to login page after success
    } catch (error) {
      toast.error(error.message || "Verifikasi gagal. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    setTimer(60); // Reset timer
    try {
      await resendOtp(email);
      toast.success("A new OTP code has been sent to your email.");
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <>
      <NavbarOtp />
      <Container maxW="lg" py={10}>
        <Flex justifyContent="flex-start" mb={4}>
          <Button
            variant="ghost"
            as={Link}
            to="/register"
            color="blue.500"
            borderRadius="full"
            _hover={{
              color: "blue.700",
              bg: "yellow.300",
              transform: "scale(1.05)",
              boxShadow: "xl",
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          </Button>
        </Flex>
        <Center flexDirection="column" gap={ 6}>
          {/* Header */}
          <Heading as="h2" size="lg" color="#2078b8" textAlign="center">
            OTP verifikasi
          </Heading>
          <Text fontSize="md" textAlign="center">
              Ketikkan 6 digit code yang telah dikirim ke{" "}
            <strong>
              {email.replace(/^(.{2}).+@/, (match, p1) => `${p1}***@`)}
            </strong>
          </Text>

          {/* OTP Input */}
          <HStack>
            <PinInput
              otp
              onChange={(value) => setOtpCode(value)} // Ensure only OTP value is passed
              isDisabled={isSubmitting}
            />
          </HStack>

          {/* Timer */}
          <Text fontSize="sm" color={timer === 0 ? "red.500" : "gray.600"}>
            {timer > 0
              ? `Silakan masukkan kode OTP yang ada ${formatTime(timer)}`
              : "Waktu Anda telah habis, silakan kirim ulang kode OTP."}
          </Text>

          {/* Buttons */}
          <Button
            colorScheme="blue"
            onClick={handleVerifyOtp}
            isDisabled={timer === 0 || isSubmitting}
            isLoading={isSubmitting}
            width="full" // Membuat tombol lebih lebar
            size="lg" // Ukuran tombol lebih besar
            borderRadius="10px"
            color="white" // Set text color to white  
            bg="#44b3f8"
            _hover={{
              bg: "#359dd7", // Change background color on hover
              transform: "scale(1.02)", // Slightly enlarge the button on hover
              boxShadow: "md", // Add a shadow for depth
            }}
          >
            OTP verifikasi
          </Button>

          {/* Resend OTP */}
          {timer === 0 && (
            <Button
              variant="link"
              size="lg"
              color="blue.500"
              _hover={{
                color:"gray.400"
              }}
              onClick={handleResendOtp}
              isDisabled={isSubmitting}
            >
              Kirim ulang OTP
            </Button>
          )}
        </Center>
      </Container>
    </>
  );
}
import React, { useEffect, useState } from "react";
import { createLazyFileRoute, Link, useNavigate} from "@tanstack/react-router";
import {
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Stack,
  StackSeparator,
  Box,
  Image,
  useBreakpointValue,
  Separator,
  HStack
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { LogoAirHopper } from "../assets/img";
import AirHopper from "@/assets/img/airhopper.jpg"; // Make sure to use the image path accordingly
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import { register, googleLogin } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { Typewriter } from 'react-simple-typewriter';

export const Route = createLazyFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("")
  const [fullName, setFUllName] = useState("")
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);

  if (token) {
    navigate({ to: "/" });
  }

  const { mutate: registerUser } = useMutation({
    mutationFn: (body) => {
      return register(body);
    },
    onSuccess: (data) => {
      toast.success("Kode OTP telah dikirim ke email")
      // Arahkan ke halaman verify-otp dengan membawa email pengguna
      navigate({
        to: "/verify-otp",
        state: { email: data?.email }, // Kirim email atau data lain yang diperlukan
      });
    },
    onError: (err) => {
      toast.error(err?.message || "Register Gagal");
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
            toast.error("Google login gagal. Silahkan coba lagi.");
    },
}); 

const onSubmit = async (event) => {
  event.preventDefault();
  // Reset errors
  setEmailError(false);
  setPasswordError(false);
  setPhoneError(false);
  setFullNameError(false);
  setConfirmPasswordError(false);

  // Validasi
  let isValid = true;

  if (!email.includes("@")) {
      setEmailError(true);
      isValid = false;
  }
  if (password.length < 8) {
      setPasswordError(true);
      isValid = false;
  }
  if (password !== confirmPassword) {
      alert("Password and password confirmation must be same!");
      isValid = false;
  }
  if (!/^[0-9]+$/.test(phoneNumber) || phoneNumber.length < 10 || phoneNumber.length > 15) {
      setPhoneError(true);
      isValid = false;
  }
  if (!fullName.trim()) {
      setFullNameError(true);
      isValid = false;
  }

  if (!isValid) {
      return;
  }

  // Jika validasi lolos, hit API
  const request = {
      fullName,
      email,
      password,
      phoneNumber,
  };
  registerUser(request);
};

const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
        googleLoginUser(tokenResponse.access_token);
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
      h="100%"
      alignItems="center"
      direction={{ base: "column", md: "row" }} 
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
          transform="translate(-50%, -50%)" 
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

      {/* Right Side - Login Form */}
      <Stack
        bg="white"
        w={rightBoxWidth}
        p="6%"
        ml={{ base: 0, md: 5 }} 
        mt={{ base: 0, md: -14 }} 
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
              as={Link} to="/" 
              color="blue.500"
              borderRadius="10px"
              _hover={{
                color: "blue.700", 
                bg: "yellow.300", 
                transform: "scale(1.05)", 
                boxShadow: "xl", 
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </Button>
          </Flex>
              {/* Image (Centered in the remaining space) */}
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
            <Heading as="h1" size="3xl" fontWeight="bold" color="#2078b8">
              AirHopper
            </Heading>
        </Stack>

        <Heading as="h1" size="2xl" color="#333" mb="3" fontWeight={"bold"}>
          Daftar
        </Heading>

        {/* Form */}
        <form onSubmit={onSubmit}>
          <Stack gap="4">
            {/* Full name Field */}
            <Field
              label="Nama Lengkap"
              invalid={fullNameError}
              errorText={fullNameError && "Nama lengkap tidak boleh kosong"}
            >
              <Input
                borderRadius="10px"
                value={fullName}
                onChange={(e) => setFUllName(e.target.value)}
                placeholder="Masukkan nama lengkap"
              />
            </Field>
            {/* Email Field */}
            <Field
              label="Alamat Email"
              invalid={emailError}
              errorText={emailError && "Email tidak sesuai"}
            >
              <Input
                borderRadius="10px"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Masukkan Email"
              />
            </Field>

            {/* Phone Number Field */}
            <Field
              label="Nomor Telepon"
              invalid={phoneError}
              errorText={phoneError && "Nomor telepon harus 10 - 15 digit dan angka"}
            >
              <Input
                borderRadius="10px"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Masukkan nomor telepon"
              />
            </Field>

            {/* Password Field */}
            <Field
              label="Password"
              invalid={passwordError}
              errorText={passwordError && "Password harus 8 karakter"}
            >
              <PasswordInput
                borderRadius="10px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
              />
            </Field>

            {/* Confirm Password Field */}
            <Field
              label="Konfirmasi Password"
              invalid={confirmPasswordError}
              errorText={confirmPasswordError && "Password dan konfirmasi password harus sama"}
            >
              <PasswordInput
                borderRadius="10px"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Masukkan konfirmasi password"
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
                bg: "#359dd7", 
                transform: "scale(1.02)", 
                boxShadow: "md", 
              }}
            >
              Daftar
            </Button>

            <HStack>
              <Separator />
              <Text flexShrink="0">atau masuk dengan</Text>
              <Separator />
            </HStack>

            <Button
              onClick={handleGoogleLogin}
              borderRadius="10px"
              type="submit"
              variant="outline"
              color="black"
              width="full"
              _hover={{
                transform: "scale(1.02)", 
                boxShadow: "md", 
              }}
            >
              <FontAwesomeIcon icon={faGoogle} />
              Masuk dengan Google
            </Button>
          </Stack>
        </form>

        {/* Sign Up Link */}
        <Text textAlign="center" mt="4">
          Sudah punya akun?{" "}
          <Text as={Link} to="/login" color="blue.500">
            Masuk
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
}

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
      toast.success("OTP code has been sent to your email")
      // Arahkan ke halaman verify-otp dengan membawa email pengguna
      navigate({
        to: "/verify-otp",
        state: { email: data?.email }, // Kirim email atau data lain yang diperlukan
      });
    },
    onError: (err) => {
      toast.error(err?.message || "Register Failed");
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
      h="120vh"
      alignItems="center"
      direction={{ base: "column", md: "row" }} // Stack the boxes on small screens
    >
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

      {/* Right Side - Login Form */}
      <Stack
        bg="white"
        w={rightBoxWidth}
        p="6%"
        ml={{ base: 0, md: 5 }} // Add margin on larger screens
        mt={{ base: 0, md: -14 }} // Adjust margin top to move upward
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
                  boxSize="100px" // Set the size of the logo (adjust as needed)
                  objectFit="contain" // Ensure the image fits within the specified box size
                  mb={0} // Add margin at the bottom to separate the image from the text
                  display="block" // Make the image a block element
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
              color="white" // Set text color to white
              width="full"
              bg="#44b3f8"
              _hover={{
                bg: "#359dd7", // Change background color on hover
                transform: "scale(1.02)", // Slightly enlarge the button on hover
                boxShadow: "md", // Add a shadow for depth
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
                transform: "scale(1.02)", // Slightly enlarge the button on hover
                boxShadow: "md", // Add a shadow for depth
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

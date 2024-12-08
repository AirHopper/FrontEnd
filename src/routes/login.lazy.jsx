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
import { useGoogleLogin } from "@react-oauth/google";
import { login, googleLogin } from "../services/auth"; // Ensure this is the correct path to your auth services
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";
import { toast } from "react-toastify"; // Ensure toast is imported
import { Typewriter } from "react-simple-typewriter";

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
  const { mutate: loginUser } = useMutation({
    mutationFn: async (body) => {
      return await login(body); // Assuming login is your API call
    },
    onSuccess: (data) => {
      dispatch(setToken(data?.token));
      toast.success("Login Sukses");
      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error(
        err?.message || "Login gagal. Mohon untuk cek email dan password."
      );
    },
  });

  // Mutation for Google login
  const { mutate: googleLoginUser } = useMutation({
    mutationFn: (accessToken) => googleLogin({ accessToken }),
    onSuccess: (data) => {
      dispatch(setToken(data?.token));
      toast.success("Login Sukses");
      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error("Google login gagal. silahkan coba lagi.");
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
    if (password.length < 8) {
      setPasswordError(true);
    }

    // Submit logic
    if (!identifierError && !passwordError) {
      const body = {
        identifier, // Use identifier for email or phone number
        password,
      };

      loginUser(body); // Call the login mutation
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLoginUser(tokenResponse.access_token);
      console.log(tokenResponse);
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
      <Box
        w={leftBoxWidth}
        bgGradient="to-tr"
        gradientFrom="rgba(38,31,163,1) 45%"
        gradientTo="rgba(0,212,255,1) 90%"
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
              words={[
                "Partner perjalanan anda!",
                "Solusi untuk pengalaman terbaik",
              ]}
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
                color: "blue.700", // Change text color on hover
                bg: "yellow.300", // Add a background color on hover
                transform: "scale(1.05)", // Slightly enlarge the button on hover
                boxShadow: "xl", // Add shadow effect
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
            </Button>
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
              boxSize="100px" // Set the size of the logo (adjust as needed)
              objectFit="contain" // Ensure the image fits within the specified box size
              mb={0} // Add margin at the bottom to separate the image from the text
              display="block" // Make the image a block element
              mx="auto"
            />
          </Box>
          <Heading as="h1" size="2xl" fontWeight="bold" color="#2078b8">
            AirHopper
          </Heading>
          <Text as="p" fontSize="lg">
            Partner perjalanan anda
          </Text>
          <Text as="p" fontSize="lg" mb="5">
            Masuk untuk mendapatkan promosi terbaik di AirHopper
          </Text>
        </Stack>

        <Heading as="h1" size="2xl" color="#333" mb="3" fontWeight={"bold"}>
          Masuk
        </Heading>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <Stack gap="4">
            {/* Email or Phone Field */}
            <Field
              label="Alamat Email atau Nomor Telepon"
              invalid={identifierError}
              errorText={identifierError && "Email atau Nomor Telepon salah"}
            >
              <Input
                borderRadius="10px"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Masukkan email atau nomor telepon"
              />
            </Field>

            {/* Password Field Label with Forgot Password Link */}
            <HStack justifyContent="space-between" mb="1">
              <Text fontSize="sm" fontWeight="medium">
                Password
              </Text>
              <Text
                as={Link}
                to="/forgot-password"
                color="blue.500"
                fontSize="sm"
              >
                Lupa Password?
              </Text>
            </HStack>

            {/* Password Field */}
            <Field
              invalid={passwordError}
              errorText={passwordError && "Password minimal 8 karakter"}
            >
              <PasswordInput
                borderRadius="10px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password anda"
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
              Masuk
            </Button>

            <HStack>
              <Separator />
              <Text flexShrink="0">atau masuk dengan</Text>
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
              Masuk dengan Google
            </Button>
          </Stack>
        </form>

        {/* Sign Up Link */}
        <Text textAlign="center" mt="4">
          Tidak punya akun?{" "}
          <Text as={Link} to="/register" color="blue.500">
            Daftar
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
}

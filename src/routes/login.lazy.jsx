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
        identifier, 
        password,
      };

      loginUser(body);
    }
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
      direction={{ base: "column ", md: "row" }} 
    >
      <Box
        w={leftBoxWidth}
        bgGradient="to-tr"
        gradientFrom="rgba(38,31,163,1) 45%"
        gradientTo="rgba(0,212,255,1) 90%"
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
              words={[
                "Partner perjalanan anda!",
                "Solusi untuk pengalaman terbaik",
              ]}
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
                color: "blue.700", 
                bg: "yellow.300", 
                transform: "scale(1.05)",
                boxShadow: "xl",
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
              boxSize="100px"
              objectFit="contain" 
              mb={0} 
              display="block" 
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
              color="white"
              width="full"
              bg="#44b3f8"
              _hover={{
                bg: "#359dd7", 
                transform: "scale(1.02)", 
                boxShadow: "md", 
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
              type="button" 
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
          Tidak punya akun?{" "}
          <Text as={Link} to="/register" color="blue.500">
            Daftar
          </Text>
        </Text>
      </Stack>
    </Flex>
  );
}

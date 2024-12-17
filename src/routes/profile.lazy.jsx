import React, { useEffect, useState, useCallback } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Box,
  Button,
  Flex,
  VStack,
  Heading,
  Input,
  Text,
  Container,
  HStack,
  StackSeparator,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPenToSquare,
  faUserGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, updateProfile } from "../services/user";
import { setToken, setUser } from "../redux/slices/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify'; 
import { profile } from "../services/user";
import Swal from "sweetalert2";

export const Route = createLazyFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("profile");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  
  const handleLogout = useCallback(() => {
    // delete the local storage here
    dispatch(setUser(null));
    dispatch(setToken(null));

    // redirect to homepage
    navigate({ to: "/" });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!token && !user) {
      navigate({ to: "/" });
    }
  }, [navigate, token, user]);

  useEffect(() => {
    if(user){
        setFullName(user.user?.fullName)
        setPhoneNumber(user.user?.phoneNumber)
        setEmail(user?.email)
    }
  },[user])

  // React Query untuk mendapatkan profil user jika token ada
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token,
  });

    // Adjust mutation function to include correctly
    const { mutate: updateProfileData } = useMutation({
      mutationFn: (request) => updateProfile(request),
      onSuccess: () => {
          toast.success("Ubah Profil Berhasil");
      },
      onError: (err) => {
          toast.error(err?.message || "Tidak Bisa Ubah Profil");
      },
    });

    const onSubmitProfile = async (event) => {
      event.preventDefault()
  
      const request = {
        fullName,
        phoneNumber,
        email,
      };
      
      updateProfileData(request);
    }

    // Adjust mutation function to include  correctly
    const { mutate: updatePasswordData } = useMutation({
      mutationFn: (request) => changePassword(request),
      onSuccess: () => {
          toast.success("Ubah Password Berhasil");
      },
      onError: (err) => {
          toast.error(err?.message || "Tidak Bisa Ubah Password");
      },
    });

    const handleChangePassword = async (event) => {
      event.preventDefault()
  
      const request = {
        oldPassword,
        newPassword,
        confirmPassword,
      };
      
      updatePasswordData(request);
    }

    const logout = (event) => {
      event.preventDefault();
      Swal.fire({
        title: "Konfirmasi untuk keluar",
        text: "Apakah anda yakin untuk keluar?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#0d6efd",
        cancelButtonText: "No",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          handleLogout();
        }
      });
    };

  return (
    <>
    <Box 
      borderBottom="4px solid" 
      borderColor="gray.100"
    >
      <Container>
        <Box 
          p={4} 
          mb={7} 
          borderRadius="lg"
        >
          <Heading size="2xl" mb={4}>
            Akun
          </Heading>
          <Button
            as={Link} 
            to="/"
            colorScheme="blue"
            bg="#44b3f8"
            color="white"
            borderRadius="lg"
            _hover={{ bg: "blue.600" }}
            _active={{ bg: "blue.700" }}
            px={6}
            py={4}
            fontWeight="semibold"
            justifyContent="flex-start"
            h="5vh"
            w="100%"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="xl" />
              Beranda
          </Button>
        </Box>
        </Container>
      </Box>
      <Container maxW="container.xl" minH="100vh" p={4} mt={4}>
        <Flex direction={{ base: "column", md: "row" }} minH="30vh">
          {/* Sidebar */}
          <Box
            p={6}
            w={{ base: "100%", md: "40%" }}
            mb={{ base: 4, md: 0 }}
            borderRight={{ base: "none" }}
            borderColor="gray.200"
          >
            <VStack spacing={4} align="start" separator={<StackSeparator />}>
              <Button
                colorPalette="yellow"
                variant={activeTab === "profile" ? "solid" : "ghost"}
                justifyContent="flex-start"
                onClick={() => setActiveTab("profile")}
                w="full"
              >
                <FontAwesomeIcon 
                icon={faPenToSquare} 
                size="2xl" 
                style={{ color: "#74C0FC" }} 
                />
                Edit Profil
              </Button>
              <Button
                colorPalette="yellow"
                variant={activeTab === "settings" ? "solid" : "ghost"}
                justifyContent="flex-start"
                onClick={() => setActiveTab("settings")}
                w="full"
              >
                <FontAwesomeIcon
                  icon={faUserGear}
                  size="2xl"
                  style={{ color: "#74C0FC" }}
                />
                Pengaturan Akun
              </Button>
              <Button
                colorPalette="yellow"
                variant="ghost"
                justifyContent="flex-start"
                w="full"
                onClick={logout}
              >
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  size="2xl"
                  style={{ color: "#74C0FC" }}
                />
                Keluar
              </Button>
            </VStack>
            <Text mt="auto" fontSize="sm" color="gray.500" textAlign="center">
              Version 1.1.0
            </Text>
          </Box>

          {/* Main Content */}
          <Box 
            flex="1" 
            p={6}       
            borderWidth="1px"
            borderColor="border.disabled"
            borderRadius="xl"
          >
            {activeTab === "profile" && (
              <Box>
                <Heading size="2xl" mb={5}>
                  Edit Profil Data
                </Heading>
                <Box
                  bg="#44b3f8"
                  p={2}
                  borderRadius="md"
                  color="white"
                  fontWeight="bold"
                  mb={4}
                  w="full"
                >
                  Data Diri
                </Box>
                <VStack spacing={4} align="start" w="full">
                  <form onSubmit={onSubmitProfile}
                    style={{ width: "100%" }}>
                    {/* Full Name */}
                    <Box w="full">
                      <Text mb={1} fontWeight="semibold">
                        Nama Lengkap
                      </Text>
                      <Input
                        borderRadius="10px"
                        placeholder="Harry"
                        bg="gray.50"
                        w="full"
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                      />
                    </Box>
                    {/* Phone Number */}
                    <Box w="full">
                      <Text mb={1} fontWeight="semibold">
                        Nomor Telepon
                      </Text>
                      <Input
                        borderRadius="10px"
                        placeholder="+62 897823232"
                        bg="gray.50"
                        w="full"
                        value={phoneNumber} 
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </Box>
                    {/* Email */}
                    <Box w="full">
                      <Text mb={1} fontWeight="semibold">
                        Email
                      </Text>
                      <Input
                        borderRadius="10px"
                        placeholder="Johndoe@gmail.com"
                        bg="gray.50"
                        w="full"
                        disabled
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                      />
                    </Box>
                    {/* Save Button */}
                    <Button 
                      loading
                      mt={6} 
                      colorScheme="blue" 
                      w="full"
                      borderRadius="10px"
                      type="submit"
                      color="white" 
                      bg="#44b3f8"
                      _hover={{
                        bg: "#359dd7", 
                        transform: "scale(1.02)", 
                        boxShadow: "md", 
                      }}
                    >
                      Simpan
                    </Button>
                  </form>
                </VStack>
              </Box>
            )}

            {activeTab === "settings" && (
              <Box>
                <Heading size="2xl" mb={4}>
                  Ubah Password
                </Heading>
                <form onSubmit={handleChangePassword}>
                  {/* Old Password Field */}
                  <Field
                    mb={5}
                    label="Password Lama"
                    errorText={"Password harus setidaknya 8 karakter"}
                  >
                    <PasswordInput
                      borderRadius="10px"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Masukkan password lama"
                    />
                  </Field>

                  {/* New Password Field */}
                  <Field
                    mb={4}
                    label="Password Baru"
                    errorText={"Password harus setidaknya 8 karakter"}
                  >
                    <PasswordInput
                      borderRadius="10px"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Masukkan password baru"
                    />
                  </Field>

                  {/* Confirm Password Field */}
                  <Field
                    mb={4}
                    label="Konfirmasi password"
                    errorText={"Konfirmasi password harus sama"}
                  >
                    <PasswordInput
                      borderRadius="10px"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Masukkan konfirmasi password"
                    />
                  </Field>
                <VStack spacing={4} align="start">
                  <Button 
                    loading
                    colorScheme="red"
                    borderRadius="10px"
                    type="submit"
                    color="white" 
                    bg="#44b3f8"
                    _hover={{
                      bg: "#359dd7", 
                      transform: "scale(1.02)", 
                      boxShadow: "md", 
                    }}
                  >
                    Ubah Password
                  </Button>
                </VStack>
                </form>
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
}

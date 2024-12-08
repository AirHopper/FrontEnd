import {
  Box,
  Flex,
  Button,
  HStack,
  Image,
  Text,
  Container,
} from "@chakra-ui/react";
import {
  faRightFromBracket,
  faList,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import { useNavigate, Link } from "@tanstack/react-router";
import { LogoAirHopper } from "../../../assets/img";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../../redux/slices/auth";
=======
import { Link } from "@tanstack/react-router";
import { LogoAirHopper } from "../../../assets/img";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slices/auth";
>>>>>>> parent of 0a0f4a7 (listing ticket & history | slicing listing ticket and history page)
import { profile } from "../../../services/user";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify"; // Ensure toast is imported

const Navbar = () => {
  const dispatch = useDispatch();
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> parent of 0a0f4a7 (listing ticket & history | slicing listing ticket and history page)

  const { user, token } = useSelector((state) => state.auth); // Ambil user dan token dari Redux

  // React Query untuk mendapatkan profil user jika token ada
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token,
  });

  // Update Redux state jika data berhasil diambil
  useEffect(() => {
    if (isSuccess && token) {
      dispatch(setUser(data));
    } else if (isError) {
      toast.error("There`s issue with fetching user");
    }
  }, [isSuccess, isError, data, dispatch, token]);

  return (
    <Box
      position="sticky"
      top={0}
      left={0}
      right={0}
      zIndex={20}
      boxShadow="md"
<<<<<<< HEAD
=======
      px={{ sm: "10px", md: "15px", lg: "25px" }}
>>>>>>> parent of 0a0f4a7 (listing ticket & history | slicing listing ticket and history page)
      bgColor="white"
      mb={5}
    >
      <Container>
        <Flex py={2} align="center" justify="space-between" wrap="wrap" gap={4}>
          {/* Logo */}
          <HStack>
            <Box
              bgColor="#2078b8"
              fontWeight="bold"
              borderRadius="full"
              width="35px"
            >
              <Image src={LogoAirHopper} alt="AirHopper Logo" />
            </Box>
            <Text fontWeight="bold" color="#2078b8">
              AirHopper
            </Text>
          </HStack>

          {/* Login Button */}
          {user ? (
            <HStack spacing={8} alignItems="center" marginRight={5}>
              <Button
                variant="ghost"
                as={Link}
                to="/history"
                size="md"
                color="black"
                _active={{
                  borderColor: "#74C0FC",
                  boxShadow: "0 0 0 3px rgba(116, 192, 252, 0.6)",
                }}
              >
                <FontAwesomeIcon
                  icon={faList}
                  size="xl"
                  style={{ color: "#74C0FC" }}
                />
              </Button>
              <Button
                variant="ghost"
                as={Link}
                to="/notification"
                size="md"
                color="black"
                _active={{
                  borderColor: "#74C0FC",
                  boxShadow: "0 0 0 3px rgba(116, 192, 252, 0.6)",
                }}
              >
                <FontAwesomeIcon
                  icon={faBell}
                  size="xl"
                  style={{ color: "#74C0FC" }}
                />
              </Button>
              <Button
                variant="ghost"
                as={Link}
                to="/profile"
                size="md"
                color="black"
                _active={{
                  borderColor: "#74C0FC",
                  boxShadow: "0 0 0 3px rgba(116, 192, 252, 0.6)",
                }}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  size="xl"
                  style={{ color: "#74C0FC" }}
                />
              </Button>
            </HStack>
          ) : (
            <Button
              as={Link}
              to="/login"
              borderRadius={10}
              bg="#44b3f8"
              border="#44b3f8"
              color="white"
              colorPalette="cyan"
              variant="outline"
              _hover={{
                bg: "#2078b8",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <Box as="span" ml={2}>
                Masuk
              </Box>
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;

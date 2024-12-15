import {
  Box,
  Flex,
  Button,
  HStack,
  Image,
  Text,
  Container,
  Badge,
} from "@chakra-ui/react";
import {
  faRightFromBracket,
  faList,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@tanstack/react-router";
import { LogoAirHopper } from "../../../assets/img";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../../redux/slices/auth";
import { profile } from "../../../services/user";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify"; // Ensure toast is imported
import { enableNotification } from "../../../script";

const Navbar = () => {
  const dispatch = useDispatch();
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const { user, token } = useSelector((state) => state.auth);

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
      // Periksa apakah ada notifikasi yang belum dibaca
      const unreadExists = data.Notification.some((notif) => !notif.isRead);
      setHasUnreadNotifications(unreadExists);
    } else if (isError) {
      toast.error("Ada yang salah, silahkan login kembali");
      dispatch(setToken(null));
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
      px={{ sm: "10px", md: "15px", lg: "25px" }}
      bgColor="white"
    >
      <Container>
        <Flex py={2} align="center" justify="space-between" wrap="wrap" gap={4}>
          {/* Logo */}
          <HStack
            as={Link}
            to="/"  
          >
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
              <Box position="relative">
                <Button
                  onClick={enableNotification}
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
                {hasUnreadNotifications && (
                  <Box
                    position="absolute"
                    top="0px"
                    right="5px"
                    bg="red.500"
                    color="white"
                    borderRadius="full"
                    w={2}
                    h={2}
                  />
                )}
              </Box>
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

import React, { useEffect, useState } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  Badge,
  Container,
  Spinner,
} from "@chakra-ui/react";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilter, faBell } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation, useQueryClient  } from "@tanstack/react-query"; // Import React Query
import { notifications } from "../services/notification";
import { useSelector } from "react-redux";
import { clearNotifications } from "../services/notification";
import Swal from "sweetalert2";
import { profile } from "../services/user";
import Protected from "../components/Auth/Protected";

export const Route = createLazyFileRoute("/notification")({
  component: () => (
    <Protected >
        <NotificationPage />
    </Protected>
),
});

function NotificationPage() {

  const queryClient = useQueryClient();

  const [notification, setNotification] = useState([]);
  const [filterType, setFilterType] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { token } = useSelector((state) => state.auth);
    // React Query untuk mendapatkan profil user jika token ada
    const { data: profileData, isSuccessProfile, isErrorProfile } = useQuery({
      queryKey: ["profile"],
      queryFn: profile,
      enabled: !!token,
    });

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1200); 
    return () => clearTimeout(handler); 
  }, [searchQuery]);

  // Fetch notifications with React Query
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ["notifications", filterType, debouncedQuery],
    queryFn: () =>
      notifications(filterType === "all" ? undefined : filterType, debouncedQuery),
  });

  useEffect(() => {
    if (isSuccess) {
      setNotification(data);
    }
  }, [data, isSuccess]);

  // Handler untuk filter perubahan
  const handleFilterChange = (type) => {
    setFilterType(type);
  };

   // Adjust mutation function to include correctly
   const { mutate: clearAllNotifications } = useMutation({
    mutationFn: () => clearNotifications(),
    onSuccess: () => {
        queryClient.invalidateQueries(["notifications"]);
        toast.success("Berhasil menghapus notif");
    },
    onError: (err) => {
        toast.error(err?.message || "Tidak Bisa Hapus Notif");
    },
  });

  const handleClearNotifications = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Semua notifikasi akan dihapus dan tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        clearAllNotifications(); // Panggil fungsi mutation untuk menghapus notifikasi
        Swal.fire(
          "Dihapus!",
          "Semua notifikasi berhasil dihapus.",
          "success"
        );
      }
    });
  };

  // Loading and error states
  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (isError) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Text color="red.500" fontSize="lg">
          Error: {error.message || "Gagal memuat notifikasi"}
        </Text>
      </Flex>
    );
  }

  return (
    <Box minH="100vh">
      <Box p={4} mb={6} borderBottom="4px solid" borderColor="gray.100">
        <Container>
          <Heading size="2xl" mb={7}>
            Notifikasi
          </Heading>
          <Flex justifyContent="space-between" align="center" gap={4} wrap="wrap">
            {/* Tombol Homepage */}
            <Button
              as={Link}
              to="/"
              colorScheme="blue"
              bg="#44b3f8"
              color="white"
              borderRadius="lg"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
              px={{ base: 4, md: 6 }}
              py={4}
              fontWeight="semibold"
              justifyContent="flex-start"
              h="5vh"
              w={{ base: "100%", sm: "auto", md: "70%" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" /> Beranda
            </Button>

            {/* Tombol Filter dan Input Pencarian */}
            <Flex gap={2} align="center" wrap="wrap">
              <MenuRoot>
                <MenuTrigger asChild>
                  <Button variant="outline" size="sm" mb={{ base: 2, sm: 0 }}>
                    <FontAwesomeIcon icon={faFilter} /> Filter
                  </Button>
                </MenuTrigger>
                <MenuContent>
                  <MenuItem value="semua" onClick={() => handleFilterChange("all")}>Semua</MenuItem>
                  <MenuItem value="promosi" onClick={() => handleFilterChange("promosi")}>Promosi</MenuItem>
                  <MenuItem value= "notifikasi" onClick={() => handleFilterChange("notifikasi")}>
                    Notifikasi
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
              <Input
                placeholder="Cari notifikasi..."
                w={{ base: "100%", sm: "200px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query
              />
            </Flex>
            {/* Tombol Clear All */}
            <Button
              onClick={handleClearNotifications}
              colorPalette="red"
              colorScheme="red"
              size="sm"
            >
              Clear All
            </Button>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.lg" p={6}>
        {/* Notifications List */}
        <VStack spacing={4} align="stretch" gap={5}>
          {notification && notification.length > 0 ? (
            notification.map((notif) => (
              <Flex
                key={notif.id}
                p={4}
                bg="white"
                boxShadow="sm"
                borderRadius="lg"
                border="1px solid"
                borderColor="gray.200"
                align="center"
                justify="space-between"
                flexDirection={{ base: "column", sm: "row" }}
              >
                {/* Bagian Kiri: Icon Bell + Info Notifikasi */}
                <Flex
                  align="center"
                  gap={6}
                  flexDirection={{ base: "column", sm: "row" }}
                >
                  {/* Icon Bell */}
                  <Box>
                    <FontAwesomeIcon icon={faBell} size="2xl" color="#6B7280" />
                  </Box>

                  {/* Info Notifikasi */}
                  <Box>
                    <Badge
                      colorPalette={notif.type === "Promosi" ? "blue" : "gray"}
                      mb={2}
                    >
                      {notif.type}
                    </Badge>
                    <Text fontWeight="bold">{notif.title}</Text>
                    {notif.description && (
                      <Text fontSize="sm" color="gray.600">
                        {notif.description}
                      </Text>
                    )}
                  </Box>
                </Flex>

                {/* Bagian Kanan: Tanggal + Status */}
                <Flex align="center" flexDirection={{ base: "column", sm: "row" }}>
                  <Text fontSize="sm" color="gray.500" mr={2}>
                    {new Date(notif.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Box
                    w={2}
                    h={2}
                    borderRadius="full"
                    bg={notif.isRead ? "green.400" : "red.400"}
                  />
                </Flex>
              </Flex>
            ))
          ) : (
            <Text fontSize="lg" color="gray.500" textAlign="center">
              Tidak ada notifikasi untuk ditampilkan.
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

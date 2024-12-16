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
import { useQuery } from "@tanstack/react-query"; // Import React Query
import { notifications } from "../services/notification";
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/notification")({
  component: NotificationPage,
});

function NotificationPage() {

  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  

  const [notification, setNotification] = useState([]);
  const [filterType, setFilterType] = useState("all"); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    if (!token && !user) {
      navigate({ to: "/" });
    }
  }, [navigate, token, user]);

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
                  <MenuItem onClick={() => handleFilterChange("all")}>Semua</MenuItem>
                  <MenuItem onClick={() => handleFilterChange("promosi")}>Promosi</MenuItem>
                  <MenuItem onClick={() => handleFilterChange("notifikasi")}>
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
                      colorScheme={notif.type === "Promosi" ? "purple" : "gray"}
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

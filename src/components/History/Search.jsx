import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Input,
  HStack,
  Button,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { CloseButton } from "@/components/ui/close-button";
import { getOrderId } from "../../services/history";
import { useQuery } from "@tanstack/react-query";

const Search = ({ setIsSearchOpen }) => {
  const [orderQuery, setOrderQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const [orderIds, setOrderIds] = useState([]);
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["orders", { orderQuery }],
    queryFn: () => getOrderId({ orderQuery }),
    enabled: orderQuery.length > 0,
  });

  useEffect(() => {
    if (isSuccess) {
      // Update state data
      setOrderIds(data.map((order) => order.id));
    }
  }, [data, isSuccess]);

  // Fungsi untuk mendapatkan history dari localStorage
  const loadHistory = () => {
    const savedHistory = localStorage.getItem("searchHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  };

  useEffect(() => {
    setRecentSearches(loadHistory());
  }, []);

  const saveHistory = (newHistory) => {
    const updatedHistory = newHistory.slice(0, 5); // Batasi 5 pencarian terakhir
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory)); // Simpan ke localStorage
    setRecentSearches(updatedHistory); // Update state history
  };

  // handle history
  const handleRemoveRecent = (orderId) => {
    // Pastikan untuk menghapus hanya ID dari pencarian terbaru
    const updatedHistory = recentSearches.filter((item) => item !== orderId);
    saveHistory(updatedHistory); // Simpan kembali ke localStorage
  };

  const handleClearAllRecent = () => {
    saveHistory([]);
  };

  // Handle pencarian baru
  const handleOrderIdSearch = (newQuery) => {
    setOrderQuery(newQuery);
  };

  // Handle orderId selection
  const handleOrderIdSelect = (orderId) => {
    // Pastikan hanya menambahkan ID yang valid, bukan objek
    if (!recentSearches.includes(orderId)) {
      saveHistory([orderId, ...recentSearches]);
    }
    setIsSearchOpen(false); // Tutup pencarian setelah memilih
    setOrderQuery(""); // Clear query setelah pemilihan
  };

  return (
    <>
      {/* Overlay */}
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)" // Semi-transparent black background
        zIndex="9"
      />

      {/* Search Box */}
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="35vw"
        p="6"
        px={2}
        bg="white"
        shadow="lg"
        borderRadius="xl"
        zIndex="10"
      >
        <VStack spacing={4} align={"start"}>
          <HStack px={5}>
            <Flex
              align="center"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              px={2}
              bg="white"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  marginLeft: "10px",
                  fontSize: "20px",
                  color: "gray.200",
                }}
              />
              <Input
                onChange={(event) => handleOrderIdSearch(event.target.value)}
                variant="unstyled"
                placeholder="Masukkan Nomor Penerbangan"
                width="25vw"
                py={0}
                focusBorderColor="transparent"
              />
            </Flex>
            <Box display="flex" justifyContent="flex-end">
              <CloseButton onClick={() => setIsSearchOpen(false)} />
            </Box>
          </HStack>

          {/* Menampilkan saran jika ada */}
          {/* {orderIds.length > 0 && (
            <VStack spacing={1} px={5} width="100%">
              <HStack
                key={booking}
                justifyContent="space-between"
                width="100%"
                borderBottom="1px solid #E2E8F0"
                pb={1}
              >
                {orderIds.map((booking) => (
                  <Text
                    cursor="pointer"
                    onClick={() => handleOrderIdSelect(booking.id)}
                    color="blue.500"
                  >
                    {booking.id}
                  </Text>
                ))}
              </HStack>
            </VStack>
          )} */}

          {isSuccess && Array.isArray(data) && data.length > 0 && (
            <VStack spacing={1} align="start" width="100%">
              {data.map((order) => (
                <HStack
                  key={order.id} // Gunakan `order.id` sebagai key
                  justify="space-between"
                  width="100%"
                  pb={1}
                  borderBottom="1px solid #E2E8F0"
                >
                  <Text
                    cursor="pointer"
                    color="blue.500"
                    onClick={() => handleOrderIdSelect(order.id)} // Pilih berdasarkan `order.id`
                  >
                    {order.id} {/* Menampilkan ID dari setiap order */}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}

          {recentSearches.length > 0 ? (
            <>
              <HStack justify="space-between" px={5} pt={4} width="100%">
                <Text fontWeight="bold" fontSize="sm" color="gray.600">
                  Pencarian Terkini
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  color="red.600"
                  cursor="pointer"
                  mr={3}
                  onClick={handleClearAllRecent}
                >
                  Hapus
                </Text>
              </HStack>

              <VStack px={5} align="start" width="100%" gap={1}>
                {recentSearches.map((search) => (
                  <HStack
                    key={search}
                    justifyContent="space-between"
                    width="100%"
                    borderBottom="1px solid #E2E8F0"
                    pb={1}
                  >
                    <Text
                      cursor="pointer"
                      onClick={() => handleOrderIdSelect(search.id)}
                      color="blue.500"
                    >
                      {search}
                    </Text>
                    <CloseButton onClick={() => handleRemoveRecent(search)} />
                  </HStack>
                ))}
              </VStack>
            </>
          ) : null}
        </VStack>
      </Box>
    </>
  );
};

export default Search;

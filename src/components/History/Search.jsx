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
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CloseButton } from "@/components/ui/close-button";

const Search = ({ setIsSearchOpen, onSearch }) => {
  const [orderId, setOrderId] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const handleSearch = () => {
    if (orderId) {
      // Update recent searches
      const updatedSearches = [
        orderId,
        ...recentSearches.filter((search) => search !== orderId),
      ].slice(0, 5); // Max 5 recent searches
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      onSearch(orderId);
    }
    setIsSearchOpen(false);
  };

  const handleSelectRecent = (search) => {
    setOrderId(search);
    onSearch(search);
    setIsSearchOpen(false);
  };

  const handleRemoveRecent = (search) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleClearAllRecent = () => {
    setRecentSearches([]); // Kosongkan state recentSearches
    localStorage.removeItem("recentSearches"); // Hapus dari localStorage
  };

  // Tambahkan event listener untuk menangkap tombol Enter
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyPress={handleKeyPress}
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
                      onClick={() => handleSelectRecent(search)}
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

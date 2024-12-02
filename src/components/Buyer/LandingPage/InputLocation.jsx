import {
  Box,
  Text,
  Flex,
  Input,
  Stack,
  HStack,
  List,
  Image,
  Separator,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { CloseButton } from "../../ui/close-button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { NoResult } from "../../../assets/img";

const InputLocation = ({ isFocused, onCloseClick, flights, onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);

  // Fungsi untuk mendapatkan history dari localStorage
  const loadHistory = () => {
    const savedHistory = localStorage.getItem("searchHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  };

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  // Fungsi untuk menyimpan history ke localStorage
  const saveHistory = (newHistory) => {
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  // Handle pencarian baru
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  // Handle pilih city
  const handleCitySelect = (city) => {
    // Update history with selected city if not already present
    const newHistory = [
      ...history.filter((item) => item.code !== city.code), // Remove duplicates
      city,
    ];
    saveHistory(newHistory);
    onCitySelect(city); // Pass selected city to parent
  };

  const handleRemoveHistory = (code) => {
    const updatedHistory = history.filter((item) => item.code !== code);
    saveHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    saveHistory([]);
  };

  const filteredCities = flights
    .map((item) => item.departure.city) // Ambil hanya data departure.city
    .filter(
      (city, index, self) =>
        index === self.findIndex((c) => c.name === city.name)
    )
    .filter((city) => {
      const lowerQuery = query.toLowerCase();
      return (
        city.name.toLowerCase().includes(lowerQuery) || // Filter nama
        city.code.toLowerCase().includes(lowerQuery) // Filter kode
      );
    });

  return (
    <Box
      position="absolute"
      top="30%"
      left="50%"
      transform={`translate(-50%, -50%) scale(${isFocused ? 1 : 0.8})`}
      w="55vw"
      p="6"
      bg="white"
      px={0}
      shadow="lg"
      borderRadius="md"
      transition="all 0.3s ease"
      zIndex="10"
    >
      <HStack px={5}>
        <Flex
          align="center"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          px={2}
          py={1}
          bg="white"
        >
          {/* Ikon di sebelah kiri */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{
              marginLeft: "10px",
              fontSize: "20px",
              color: "gray.200",
            }}
          />
          {/* Input field */}
          <Input
            variant="unstyled"
            placeholder="Search"
            width="45vw"
            pl={2}
            py={0}
            focusBorderColor="transparent"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </Flex>
        <CloseButton onClick={onCloseClick} />
      </HStack>

      <List.Root as={Stack} listStyle="none">
        {filteredCities.length > 0 ? (
          query.length > 0 &&
          filteredCities.map((city, index) => (
            <List.Item
              _hover={{ bgColor: "gray.300" }}
              px={5}
              mt={2}
              key={index}
              onClick={() => handleCitySelect(city)}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Text py={2}>
                  {city?.name} ({city?.code})
                </Text>
              </HStack>
              <Separator />
            </List.Item>
          ))
        ) : (
          <Stack alignItems="center" mt={5}>
            <Image
              src={NoResult}
              alt="No result Image"
              width="25%"
              objectFit="cover"
            />
            <Text>Tidak ditemukan lokasi yang cocok</Text>
            <Text color="#44b3f8" mt={-2}>
              Coba cari lokasi lainnya
            </Text>
          </Stack>
        )}
      </List.Root>

      {/* History Pencarian */}
      {history.length > 0 && (
        <>
          <HStack justifyContent="space-between" mt={2} mb={2} px={5}>
            <Text fontWeight="semibold" fontSize="lg">
              Pencarian Terkini
            </Text>
            <Button
              fontWeight="semibold"
              variant="plain"
              color="red"
              pr={3}
              onClick={handleClearHistory}
            >
              Hapus
            </Button>
          </HStack>

          <List.Root as={Stack} gap="3" listStyle="none">
            {history.length > 0 &&
              history.map((city, index) => (
                <List.Item _hover={{ bgColor: "gray.300" }} px={5} key={index}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text
                      mb={1}
                      w="100%"
                      cursor="default"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city.name} ({city.code})
                    </Text>
                    <CloseButton
                      variant="ghost"
                      size="md"
                      colorPalette="gray"
                      borderRadius={0}
                      onClick={() => handleRemoveHistory(city.code)}
                    />
                  </HStack>
                  <Separator />
                </List.Item>
              ))}
          </List.Root>
        </>
      )}
    </Box>
  );
};

export default InputLocation;

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
import { CloseButton } from "@/components/ui/close-button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { NoResult } from "../../../assets/img";
import { getCities } from "../../../services/tickets";
import { useQuery } from "@tanstack/react-query";

const InputLocation = ({ isFocused, onCloseClick, onCitySelect }) => {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);

  // getData
  const [cities, setCities] = useState([]);
  const { data, isSuccess, isError } = useQuery({
    queryKey: ["cities", { query }],
    queryFn: () => getCities({ departureCity: query }),
    enabled: query.length > 0,
  });

  useEffect(() => {
    if (isSuccess) {
      // Update state data
      setCities(data || []);
    }
  }, [data, isSuccess]);

  // Fungsi untuk mendapatkan history dari localStorage
  const loadHistory = () => {
    const savedHistory = localStorage.getItem("searchHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  };

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  /* ------- Handle untuk history ------- */
  // Fungsi untuk menyimpan history ke localStorage
  const saveHistory = (newHistory) => {
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  // handle history
  const handleRemoveHistory = (code) => {
    const updatedHistory = history.filter((item) => item.code !== code);
    saveHistory(updatedHistory);
  };

  const handleClearHistory = () => {
    saveHistory([]);
  };

  /* ------- Handle untuk cari city ------- */
  // Handle pencarian baru
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
  };

  // Filter cities based on search query
  const filteredCityNames = cities
    .flatMap((item) => [
      { name: item.departure.city.name, code: item.departure.city.code },
      { name: item.arrival.city.name, code: item.arrival.city.code },
    ]) // Combine departure and arrival cities
    .filter(
      (city, index, self) =>
        self.findIndex((c) => c.name === city.name) === index // Remove duplicates
    )
    .filter((city) => {
      const lowerQuery = query.toLowerCase();
      return (
        city.name.toLowerCase().includes(lowerQuery) || // Filter by city name
        city.code.toLowerCase().includes(lowerQuery) // Filter by city code
      );
    });

  // Handle city selection
  const handleCitySelect = (city) => {
    // Check if the city is already in history
    const isCityInHistory = history.some((item) => item.code === city.code);

    if (!isCityInHistory) {
      // Add city to the start of history if not already present
      const updatedHistory = [city, ...history];
      saveHistory(updatedHistory);
    }

    onCitySelect(city);
    // Clear query after selection
    setQuery("");
  };

  return (
    <Box
      position="absolute"
      top="200px"
      left="50%"
      transform={`translate(-50%, -50%) scale(${isFocused ? 1 : 0.8})`}
      w={{ base: "90%", lg: "55vw", xl: "40vw" }}
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
          width="100%"
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
            pl={2}
            py={0}
            focusBorderColor="transparent"
            onChange={(event) => handleSearch(event.target.value)}
          />
        </Flex>
        <CloseButton onClick={onCloseClick} />
      </HStack>

      <List.Root as={Stack} listStyle="none">
        {isError ? (
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
        ) : (
          filteredCityNames.length > 0 &&
          query.length > 0 &&
          filteredCityNames.map((city, index) => (
            <List.Item
              _hover={{ bgColor: "gray.300" }}
              px={5}
              mt={2}
              key={index}
              onClick={() => handleCitySelect(city)}
            >
              <HStack justifyContent="space-between" alignItems="center">
                <Text py={2} cursor="default">
                  {city?.name}
                </Text>
              </HStack>
              <Separator />
            </List.Item>
          ))
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
              history.slice(0, 4).map((city, index) => (
                <List.Item _hover={{ bgColor: "gray.300" }} px={5} key={index}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text
                      mb={1}
                      w="100%"
                      cursor="default"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city?.name}
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

import { useState } from "react";
import {
  Text,
  Stack,
  HStack,
  Pagination,
  Skeleton,
  Card,
  Box,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FlightCard from "./FlightCard";
import FlightSkeletonCard from "./Skeleton/FlightCard";

const FlightFav = ({
  loading,
  flights,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
}) => {
  const [continentFilter, setContinentFilter] = useState(""); // Menyimpan benua yang dipilih
  const continentMapping = {
    Asia: ["Indonesia", "Japan", "China", "India", "Singapore"],
    Amerika: [
      "United States",
      "Canada",
      "Mexico",
      "Brazil",
      "Argentina",
      "Chile",
    ],
    Eropa: ["Germany", "France", "Italy", "Spain"],
    Australia: ["Australia", "New Zealand"],
  };

  // Filter data negara berdasarkan benua yang dipilih
  const filteredFlights = flights?.filter((flight) => {
    if (!continentFilter) return true; // Tampilkan semua data jika tidak ada filter
    const arrivalContinent = Object.keys(continentMapping).find((continent) =>
      continentMapping[continent]?.includes(flight.arrival.country.name)
    );
    return arrivalContinent === continentFilter;
  });

  return (
    <Stack marginTop="43vh" px="12vw">
      <Text fontWeight="bold">Destinasi Favorit</Text>

      {/* Continent Filters */}
      <HStack marginTop={2}>
        <Button
          size="md"
          borderRadius="xl"
          bgColor="#44b3f8"
          _hover={{ bgColor: "#2078b8" }}
          onClick={() => setContinentFilter("")}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Semua
        </Button>
        <Button
          size="md"
          borderRadius="xl"
          bgColor="#a5d8ff"
          _hover={{ bgColor: "#70caff" }}
          color="gray.700"
          onClick={() => setContinentFilter("Asia")}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Asia
        </Button>
        <Button
          size="md"
          borderRadius="xl"
          bgColor="#a5d8ff"
          _hover={{ bgColor: "#70caff" }}
          color="gray.700"
          onClick={() => setContinentFilter("Amerika")}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Amerika
        </Button>
        <Button
          size="md"
          borderRadius="xl"
          bgColor="#a5d8ff"
          _hover={{ bgColor: "#70caff" }}
          color="gray.700"
          onClick={() => setContinentFilter("Australia")}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Australia
        </Button>
        <Button
          size="md"
          borderRadius="xl"
          bgColor="#a5d8ff"
          _hover={{ bgColor: "#70caff" }}
          color="gray.700"
          onClick={() => setContinentFilter("Eropa")}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Eropa
        </Button>
      </HStack>

      {/* Flight Cards */}
      <HStack justifyContent="center" marginTop={5} flexWrap="wrap">
        {loading
          ? filteredFlights.map((index) => <FlightSkeletonCard key={index} />)
          : filteredFlights.map((flight, index) => (
              <FlightCard key={index} flight={flight} loading={loading} />
            ))}
      </HStack>

      {/* Pagination */}
      <HStack justifyContent="center" mt={10}>
        <PaginationRoot
          count={totalPages}
          pageSize={pageSize}
          page={currentPage}
          onPageChange={(e) => onPageChange(e.page)}
        >
          <HStack>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </HStack>
    </Stack>
  );
};

export default FlightFav;

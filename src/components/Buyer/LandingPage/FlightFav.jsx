import { Text, Stack, HStack, Pagination } from "@chakra-ui/react";
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

const FlightFav = ({
  flights,
  departureDate,
  arrivalDate,
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
}) => {
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
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Eropa
        </Button>
      </HStack>

      {/* Flight Cards */}
      <HStack marginTop={5} flexWrap="wrap">
        {flights?.length === 0 ? (
          <Text>Flights data is not found!</Text>
        ) : (
          flights?.map((flight) => (
            <FlightCard
              flight={flight}
              key={flight?.id}
              departureDate={departureDate}
              arrivalDate={arrivalDate}
            />
          ))
        )}
      </HStack>

      {/* Pagination */}
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
    </Stack>
  );
};

export default FlightFav;

import { useState, useEffect } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, Container } from "@chakra-ui/react";
import { getFlights } from "../services/flights";
import SearchFlight from "../components/Buyer/LandingPage/SearchFlight";
import FlightFav from "../components/Buyer/LandingPage/FlightFav";

export const Route = createLazyFileRoute("/")({
  component: Beranda,
});

function Beranda() {
  const [isFocused, setIsFocused] = useState(false);

  const [flights, setFlights] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
  });

  // Use react query to fetch API
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["flights", pagination.currentPage, pagination.pageSize],
    queryFn: () => getFlights(pagination.currentPage, pagination.pageSize),
    enabled: pagination.pageSize > 0,
  });

  useEffect(() => {
    if (isSuccess) {
      setFlights(data?.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.pagination.totalPages,
      }));
    }
  }, [data, isSuccess]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const departureDate = "Iyo";
  const arrivalDate = "Jakarta";

  return (
    <Container maxWidth="container.lg" mx="auto" py={8}>
      {/* Overlay Box */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="blackAlpha.700"
        opacity={isFocused ? 1 : 0}
        pointerEvents="none"
        transition="opacity 0.3s ease"
        zIndex="5"
      ></Box>

      <SearchFlight
        flights={flights}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />

      <FlightFav
        loading={isPending}
        flights={flights}
        departureDate={departureDate}
        arrivalDate={arrivalDate}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

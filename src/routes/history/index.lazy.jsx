import React, { useEffect, useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  Box,
  Container,
  Grid,
  Heading,
  Spinner,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faFilter,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import HistoryCard from "../../components/History/HistoryCard";
import { useQuery } from "@tanstack/react-query";
import DetailCard from "../../components/History/DetailCard";
import DatePicker from "../../components/History/DatePicker";
import Search from "../../components/History/Search";
import { getHistory } from "../../services/history";
import { NoList } from "../../assets/img";

export const Route = createLazyFileRoute("/history/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  // State untuk kontrol munculkan input
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [tickets, setTickets] = useState([]);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["history"],
    queryFn: () => getHistory(),
    retry: 1,
  });

  useEffect(() => {
    if (isSuccess) {
      setTickets(data);
    }
  }, [data, isSuccess]);

  const filteredTickets = tickets.filter((ticket) => {
    const ticketDeparture = new Date(ticket.departure.time);
    const ticketArrival = new Date(ticket.arrival.time);
    const startDate = dateRange[0].startDate;
    let endDate = dateRange[0].endDate;

    // Perluas `endDate` ke akhir hari jika ada
    if (endDate) {
      endDate = new Date(endDate);
      endDate.setHours(23, 59, 59, 999);
    }

    if (startDate && endDate) {
      // Tiket valid jika:
      // 1. Berangkat dalam rentang waktu
      // 2. Tiba dalam rentang waktu
      // 3. Rentang waktu sepenuhnya mencakup tiket
      return (
        (ticketDeparture >= startDate && ticketDeparture <= endDate) ||
        (ticketArrival >= startDate && ticketArrival <= endDate) ||
        (ticketDeparture < startDate && ticketArrival > endDate)
      );
    }
    return true; // Show all tickets if date range is not selected.
  });

  const handleSelectTicket = (tickets) => {
    setSelectedTicket(tickets);
    setSelectedTicketId(tickets.id);

    const element = document.getElementById("history-detail");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  console.log("Selected Ticket ID in Route:", selectedTicketId);

  const toggleDatePicker = () => {
    setIsPickerOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  return (
    <Container maxW="10/12" py={6} px={0}>
      <Heading as="h1" size="lg" mb={4} color="black" fontWeight="bold">
        Pilih Penerbangan
      </Heading>
      <Grid
        templateColumns={["1fr", "14fr 2fr 1fr"]}
        gap={4}
        alignItems="center"
      >
        <Stack
          as={Link}
          to="/"
          py={3}
          px={8}
          bg="#44B3F8"
          borderRadius="lg"
          color="#FDFFFE"
          justifyContent="flex-start"
          alignItems="center"
          gap={4}
          display="flex"
          flexDirection={["column", "row"]}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <Text>Beranda</Text>
        </Stack>

        {/* Tombol Filter yang membuka DatePicker */}
        <Button
          py={6}
          px={8}
          borderRadius={"lg"}
          borderColor={"#44B3F8"}
          bg="#FDFFFE"
          color={"#44B3F8"}
          onClick={toggleDatePicker}
        >
          <FontAwesomeIcon
            icon={faFilter}
            color="#44B3F8"
            size="2xl"
            m={0}
            p={0}
          />{" "}
          Filter
        </Button>

        {/* Tombol yang membuka Search */}
        <Button
          py={6}
          borderRadius={"lg"}
          borderColor={"#44B3F8"}
          bg="#FDFFFE"
          color={"#44B3F8"}
          onClick={toggleSearch}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            color="#44B3F8"
            size="2xl"
          />
        </Button>
      </Grid>

      {/* Menampilkan Search ketika isSearchOpen true */}
      {isSearchOpen && <Search />}

      {/* Menampilkan DatePicker ketika isPickerOpen true */}
      {isPickerOpen && (
        <DatePicker
          setIsPickerOpen={setIsPickerOpen}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      )}

      {filteredTickets.length === 0 || isError ? (
        <Stack alignItems="center" mt={5} py={10}>
          <Image
            src={NoList}
            alt="No list Image"
            width="25%"
            objectFit="cover"
          />
          <Text color="#44b3f8">Oops! Riwayat pesanan kosong!</Text>
          <Text mt={-2}>Anda belum melakukan pemesanan penerbangan</Text>
          <Button
            as={Link}
            to="/"
            rounded="xl"
            width="29vw"
            mt={5}
            py={2}
            bgColor="#44b3f8"
            _hover={{ bgColor: "#2078b8" }}
          >
            Cari Penerbangan
          </Button>
        </Stack>
      ) : isLoading ? (
        <Box textAlign="center" py={10} height="100vh">
          <Spinner size="lg" color="#44B3F8" />
          <Text mt={4}>Memuat data penerbangan...</Text>
        </Box>
      ) : (
        <Grid
          templateColumns={["1fr", "6fr 5fr"]}
          gap={4}
          justifyContent={"space-between"}
          mt={8}
          mx={4}
        >
          <Box>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Maret 2023
            </Text>
            <Grid gap={4} pt={2}>
              <HistoryCard
                tickets={filteredTickets}
                onSelectTicket={handleSelectTicket}
                selectedTicketId={selectedTicketId}
              />
            </Grid>
          </Box>
          {selectedTicket && <DetailCard ticket={selectedTicket} />}
        </Grid>
      )}
    </Container>
  );
}

export default RouteComponent;

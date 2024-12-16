import React, { useEffect, useState } from "react";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
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
import NoList from "../../assets/img/no_list.png";

export const Route = createLazyFileRoute("/history/")({
  component: RouteComponent,
});

function RouteComponent() {
  // Ambil parameter URL
  const urlParams = new URLSearchParams(window.location.search);

  const [params, setParams] = useState({
    startDate: urlParams.get("search[startFlightDate]"),
    endDate: urlParams.get("search[endFlightDate]"),
    orderId: urlParams.get("search[orderId]"),
  });

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);

  // State untuk kontrol munculkan inputx
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["history", dateRange, params],
    queryFn: () => getHistory(params),
    retry: 1,
  });

  useEffect(() => {
    if (isSuccess) {
      setOrders(data);
      console.log("Fetched history:", data);
    }
  }, [data, isSuccess]);

  console.log("Order data:", orders);

  const filteredOrders = orders; // Tidak ada filter lagi, semua dilakukan di backend

  // Handle Simpan dari DatePicker
  const handleSaveDateRange = ({ startDate, endDate }) => {
    // Perbarui URL dengan parameter baru
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("search[startFlightDate]", startDate);
    newUrl.searchParams.set("search[endFlightDate]", endDate);
    window.history.pushState({}, "", newUrl);

    // Set params ke state untuk memastikan URL dan data sinkron
    setParams({ startDate, endDate });
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setSelectedOrderId(order.id);

    const element = document.getElementById("history-detail");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  console.log("Selected Order ID in Route:", selectedOrderId);

  const toggleDatePicker = () => {
    setIsPickerOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prevState) => !prevState);
  };

  const handleSearch = (orderId) => {
    const newParams = { ...params, orderId };
    setParams(newParams);

    // Tutup detail order saat pencarian dijalankan
    setSelectedOrder(null);
    setSelectedOrderId(null);

    // Update URL with new orderId parameter
    const newUrl = new URL(window.location);
    if (orderId) {
      newUrl.searchParams.set("search[orderId]", orderId);
    } else {
      newUrl.searchParams.delete("search[orderId]");
    }
    window.history.pushState({}, "", newUrl); // Update the browser history
  };

  return (
    <Container maxW="10/12" py={6}>
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
          _hover={{ bg: "#2078B8", color: "white" }}
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
      {isSearchOpen && (
        <Search setIsSearchOpen={setIsSearchOpen} onSearch={handleSearch} />
      )}

      {/* Menampilkan DatePicker ketika isPickerOpen true */}
      {isPickerOpen && (
        <DatePicker
          setIsPickerOpen={setIsPickerOpen}
          dateRange={dateRange}
          setDateRange={setDateRange}
          onSave={handleSaveDateRange}
        />
      )}

      {isLoading ? (
        <Box
          display="flex" // Mengaktifkan flexbox
          justifyContent="center" // Menjadikan konten rata tengah secara horizontal
          alignItems="center" // Menjadikan konten rata tengah secara vertikal
          textAlign="center"
          py={10}
          height="50vh"
        >
          <VStack spacing={4}>
            {" "}
            {/* Menggunakan VStack untuk memisahkan Spinner dan Text */}
            <Spinner size="lg" color="#44B3F8" />
            <Text>Memuat data penerbangan...</Text>
          </VStack>
        </Box>
      ) : filteredOrders.length === 0 || isError ? (
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
                orders={filteredOrders}
                onSelectOrder={handleSelectOrder}
                selectedOrderId={selectedOrderId}
              />
            </Grid>
          </Box>
          {/* Menampilkan DetailCard jika ada order yang dipilih */}
          {selectedOrder && <DetailCard order={selectedOrder} />}
        </Grid>
      )}
    </Container>
  );
}

export default RouteComponent;

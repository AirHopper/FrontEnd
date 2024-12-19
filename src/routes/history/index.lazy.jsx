import React, { useEffect, useState, useRef } from "react";
import {
  createLazyFileRoute,
  Link,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
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
  useBreakpointValue,
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
import { useSelector } from "react-redux";

export const Route = createLazyFileRoute("/history/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token && !user) {
      navigate({ to: "/" });
    }
  }, [navigate, token, user]);

  const [params, setParams] = useState({
    startDate: urlParams.get("search[startBookingDate]"),
    endDate: urlParams.get("search[endBookingDate]"),
    orderId: urlParams.get("search[orderId]"),
  });
  // Ambil tanggal dari query parameter
  const startBookingDate = urlParams.get("search[startBookingDate]");
  const endBookingDate = urlParams.get("search[endBookingDate]");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: startBookingDate ? new Date(startBookingDate) : new Date(),
      endDate: endBookingDate ? new Date(endBookingDate) : new Date(),
      key: "selection",
    },
  ]);
  // Pastikan state diperbarui jika query parameter berubah
  useEffect(() => {
    setDateRange([
      {
        startDate: startBookingDate ? new Date(startBookingDate) : new Date(),
        endDate: endBookingDate ? new Date(endBookingDate) : new Date(),
        key: "selection",
      },
    ]);
  }, [startBookingDate, endBookingDate]);

  // State untuk kontrol munculkan input
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
    }
  }, [data, isSuccess]);

  const filteredOrders = orders; // Tidak ada filter lagi, semua dilakukan di backend

  // Handle Simpan dari DatePicker
  const handleSaveDateRange = ({ startDate, endDate }) => {
    // Perbarui URL dengan parameter baru
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("search[startBookingDate]", startDate);
    newUrl.searchParams.set("search[endBookingDate]", endDate);
    window.history.pushState({}, "", newUrl);

    // Set params ke state untuk memastikan URL dan data sinkron
    setParams({ startDate, endDate });
  };

  const detailRef = useRef(null); // Referensi untuk elemen detail

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setSelectedOrderId(order.id);

    // Scroll ke elemen detail
    if (detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  // Menggunakan useBreakpointValue untuk menentukan urutan
  const orderDetail = useBreakpointValue({ base: 1, md: 2 }); // Detail di awal untuk layar kecil, di akhir untuk layar medium ke atas

  return (
    <Container maxW="10/12" py={6} minH="100vh">
      <Heading as="h1" size="lg" mb={4} color="black" fontWeight="bold">
        Pilih Penerbangan
      </Heading>
      <Grid
        templateColumns={["1fr", "1fr", "14fr 2fr 1fr"]}
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
          justifyContent={["center", "center", "flex-start"]}
          alignItems="center"
          gap={4}
          display="flex"
          flexDirection={["row"]}
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

        <Text fontSize={"xl"} fontWeight={"bold"}>
          {`${new Intl.DateTimeFormat("id-ID", {
            month: "long",
            year: "numeric",
          }).format(dateRange[0].startDate)}`}
        </Text>
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
            <Text>Memuat history penerbangan...</Text>
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
          templateColumns={["1fr", "1fr", "6fr 5fr"]} // Responsif: 1 kolom di layar kecil
          gap={4}
          justifyContent={"space-between"}
          mt={8}
        >
          {/* DetailCard dipindahkan ke atas saat 1fr */}
          {selectedOrder && (
            <Box ref={detailRef} order={orderDetail}>
              {/* Order = 1 saat layar kecil */}
              <DetailCard order={selectedOrder} />
            </Box>
          )}

          {/* HistoryCard di bawah saat 1fr */}
          <Box order={orderDetail === 1 ? 2 : 1}>
            <Grid gap={4} pt={2}>
              <HistoryCard
                orders={filteredOrders}
                onSelectOrder={handleSelectOrder}
                selectedOrderId={selectedOrderId}
              />
            </Grid>
          </Box>
        </Grid>
      )}
    </Container>
  );
}

export default RouteComponent;

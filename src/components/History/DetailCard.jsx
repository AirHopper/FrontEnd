import React from "react";
import {
  Box,
  Text,
  Button,
  HStack,
  VStack,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { cancelBooking } from "../../services/history";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const DetailCard = ({ order }) => {
  console.log("Selected Order:", order);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!order) {
    return <Text>No order selected.</Text>;
  }

  const handlePayment = () => {
    if (order?.id) {
      navigate({
        to: "/payment",
        state: { orderId: order.id },
      });
    } else {
      toast.error("Token pembayaran tidak tersedia.");
    }
  };

  const { mutate: executeCancelBooking } = useMutation({
    mutationFn: (orderId) => cancelBooking(orderId), // Ini adalah fungsi server
    onSuccess: () => {
      queryClient.invalidateQueries(["history"]);
      toast.success("Pemesanan berhasil dibatalkan.");
    },
    onError: (error) => {
      toast.error(
        error.message || "Terjadi kesalahan saat membatalkan pemesanan."
      );
    },
  });

  const handleCancelBooking = (order) => {
    if (!order?.id) {
      toast.error("ID pesanan tidak valid.");
      return;
    }

    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Pemesanan Akan Dibatalkan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        executeCancelBooking(order.id); // Pastikan ID pesanan dikirimkan dengan benar
        Swal.fire("Pemesanan Berhasil Dibatalkan!", "success");
      }
    });
  };

  const handlePrintPDF = (pdfUrl) => {
    // Open the PDF in a new tab for printing
    window.open(pdfUrl, "_blank");
  };

  return (
    <Box p={4} my={6}>
      {/* Header */}
      <HStack display="flex" justifyContent="space-between" mb={2}>
        <VStack gap={0} align={"start"}>
          <Text fontSize={["md", "lg"]} fontWeight="bold">
            Detail Pesanan
          </Text>
          <Text>
            {new Date(order.bookingDate).toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>
        </VStack>
        <Text
          bg={
            order.orderStatus === "Unpaid"
              ? "red.500"
              : order.orderStatus === "Issued"
                ? "green.400"
                : "gray.400"
          }
          color="white"
          borderRadius="2xl"
          px={4}
          py={1}
          fontSize={["xs", "sm", "md"]}
        >
          {order.orderStatus}
        </Text>
      </HStack>

      <Text fontSize="lg" fontWeight="bold" mb={2}>
        Detail Tiket Pergi
      </Text>
      {/* Booking Code */}
      <HStack mb={4}>
        <Text fontSize={["sm", "lg"]} fontWeight="normal">
          Booking Code:{" "}
        </Text>
        <Text
          as="span"
          fontSize={["sm", "lg"]}
          fontWeight="bold"
          color={"#2078B8"}
        >
          {order.id}
        </Text>
      </HStack>

      {/* Departure Flights Details */}
      {order.outboundTicket.flights.length > 0 &&
        order.outboundTicket.flights.map((flight, index) => (
          <VStack
            key={index}
            gap={4}
            mb={4}
            align="start"
            borderBottom="1px solid #A8B6B7"
            pb={4}
          >
            {/* Departure Details */}
            <HStack align="start" justify="space-between" width="100%">
              <Text fontSize={["sm", "md"]} fontWeight="bold">
                {new Date(flight.departure.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </Text>
              <Text
                fontSize={["xs", "md"]}
                fontWeight={"bold"}
                color={"#70CAFF"}
              >
                Keberangkatan
              </Text>
            </HStack>
            <VStack align="flex-start" gap={1}>
              <Text fontSize={["sm", "md"]}>
                {new Date(flight.departure.time).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </Text>
              <Text fontSize={["sm", "md"]} fontWeight="semibold">
                {flight.departure.airport.name}
              </Text>
              <Text fontSize={["sm", "md"]} fontWeight="semibold">
                {flight.departure.terminal.name} -{" "}
                {flight.departure.terminal.type}
              </Text>
            </VStack>

            {/* Airline Image and Flight Info */}
            <HStack gap={4} mt={2}>
              <Image
                src={flight.airline.logo}
                alt={flight.airline.name}
                boxSize="50px"
              />
              <VStack align={"start"} gap={1}>
                <Text fontSize={["sm", "md"]} fontWeight="bold">
                  {flight.airline.name}
                </Text>
                <Text fontSize={["sm", "md"]}>Pesawat: {flight.airplane}</Text>
              </VStack>
            </HStack>

            {/* Arrival Details */}
            <HStack align="start" justify="space-between" width="100%">
              <Text fontSize={["sm", "md"]} fontWeight="bold">
                {new Date(flight.arrival.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </Text>
              <Text
                fontSize={["xs", "md"]}
                fontWeight={"bold"}
                color={"#70CAFF"}
              >
                Kedatangan
              </Text>
            </HStack>
            <VStack align="flex-start" gap={1}>
              <Text fontSize={["sm", "md"]}>
                {new Date(flight.arrival.time).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </Text>
              <Text fontSize={["sm", "md"]} fontWeight="semibold">
                {flight.arrival.airport.name}
              </Text>
              <Text fontSize={["sm", "md"]} fontWeight="semibold">
                {flight.arrival.terminal.name} - {flight.arrival.terminal.type}
              </Text>
            </VStack>

            {/* Tampilkan teks jika ada transit dan bukan penerbangan terakhir */}
            {index < order.outboundTicket.flights.length - 1 && (
              <HStack
                fontSize="sm"
                fontWeight="semibold"
                textAlign="start"
                gap={3}
                p={3}
                pl={5}
                border="1px solid #A8B6B7"
                borderRadius="md"
                width={"full"}
              >
                <FontAwesomeIcon icon={faCircleInfo} color="#A8B6B7" />
                <Text color="#A8B6B7">
                  Transit di {flight.arrival.city.name}
                  {(() => {
                    // Ambil waktu transit berdasarkan arrival dan departure berikutnya
                    const currentArrivalTime = new Date(flight.arrival.time); // Waktu kedatangan saat ini
                    const nextDepartureTime = new Date(
                      order.outboundTicket.flights[index + 1].departure.time
                    ); // Waktu keberangkatan penerbangan berikutnya
                    const transitTime = nextDepartureTime - currentArrivalTime;

                    // Konversi waktu transit ke jam dan menit
                    const hours = Math.floor(transitTime / 3600000); // Konversi ms ke jam
                    const minutes = Math.floor((transitTime % 3600000) / 60000); // Sisa ms ke menit

                    return ` (${hours}h ${minutes}m)`;
                  })()}
                </Text>
              </HStack>
            )}
          </VStack>
        ))}

      {/* Return Flights Details */}
      {order.isRoundTrip &&
        order.returnTicket &&
        order.returnTicket.flights.length > 0 &&
        order.returnTicket.flights.map((flight, index) => (
          <VStack
            key={index}
            gap={4}
            mb={4}
            align="start"
            borderBottom="1px solid #A8B6B7"
            pb={4}
          >
            <Text fontSize={["md", "lg"]} fontWeight="bold" mb={0}>
              Detail Tiket Pulang
            </Text>
            {/* Departure Details */}
            <HStack align="start" justify="space-between" width="100%">
              <Text fontSize={["sm", "md"]} fontWeight="bold">
                {new Date(flight.departure.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </Text>
              <Text
                fontSize={["xs", "md"]}
                fontWeight={"bold"}
                color={"#70CAFF"}
              >
                Keberangkatan
              </Text>
            </HStack>
            <VStack align="flex-start" gap={1}>
              <Text fontSize={["sm", "md"]}>
                {new Date(flight.departure.time).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </Text>
              <Text fontSize={["sm", "md"]} fontWeight="semibold">
                {flight.departure.airport.name}
              </Text>
              <Text fontSize={["sm", "md"]} fontWeight="semibold">
                {flight.departure.terminal.name} -{" "}
                {flight.departure.terminal.type}
              </Text>
            </VStack>

            {/* Airline Image and Flight Info */}
            <HStack gap={4} mt={2}>
              <Image
                src={flight.airline.logo}
                alt={flight.airline.name}
                boxSize="50px"
              />
              <VStack align={"start"} gap={1}>
                <Text fontSize={["sm", "md"]} fontWeight="bold">
                  {flight.airline.name}
                </Text>
                <Text fontSize={["sm", "md"]}>Pesawat: {flight.airplane}</Text>
              </VStack>
            </HStack>

            {/* Arrival Details */}
            <HStack align="start" justify="space-between" width="100%">
              <Text fontSize={["sm", "md"]} fontWeight="bold">
                {new Date(flight.arrival.time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </Text>
              <Text
                fontSize={["xs", "md"]}
                fontWeight={"bold"}
                color={"#70CAFF"}
              >
                Kedatangan
              </Text>
            </HStack>
            <VStack align="flex-start" gap={1}>
              <Text fontSize={["sm", "md"]}>
                {new Date(flight.arrival.time).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour12: false,
                  timeZone: "UTC",
                })}
              </Text>
              <Text fontSize={["sm", "md"]} fontWeight="semibold">
                {flight.arrival.airport.name}
              </Text>
              <Text fontSize={["sm", "md"]} fontWeight="semibold">
                {flight.arrival.terminal.name} - {flight.arrival.terminal.type}
              </Text>
            </VStack>

            {/* Tampilkan teks jika ada transit dan bukan penerbangan terakhir */}
            {index < order.returnTicket.flights.length - 1 && (
              <HStack
                fontSize="sm"
                fontWeight="semibold"
                textAlign="start"
                gap={3}
                p={3}
                pl={5}
                border="1px solid #A8B6B7"
                borderRadius="md"
                width={"full"}
              >
                <FontAwesomeIcon icon={faCircleInfo} color="#A8B6B7" />
                <Text color="#A8B6B7">
                  Transit di {flight.arrival.city.name}
                  {(() => {
                    // Ambil waktu transit berdasarkan arrival dan departure berikutnya
                    const currentArrivalTime = new Date(flight.arrival.time); // Waktu kedatangan saat ini
                    const nextDepartureTime = new Date(
                      order.returnTicket.flights[index + 1].departure.time
                    ); // Waktu keberangkatan penerbangan berikutnya
                    const transitTime = nextDepartureTime - currentArrivalTime;

                    // Konversi waktu transit ke jam dan menit
                    const hours = Math.floor(transitTime / 3600000); // Konversi ms ke jam
                    const minutes = Math.floor((transitTime % 3600000) / 60000); // Sisa ms ke menit

                    return ` (${hours}h ${minutes}m)`;
                  })()}
                </Text>
              </HStack>
            )}
          </VStack>
        ))}

      {/* Price Breakdown */}
      <Flex
        mb={4}
        borderBottom="1px solid #A8B6B7"
        pb={4}
        gap={2}
        flexDirection="column"
      >
        <Text fontSize={["md", "lg"]} fontWeight={"bold"} mb={1}>
          Rincian Harga
        </Text>
        {order.detailPrice.map((item, index) => (
          <HStack key={index} align={"start"} justify={"space-between"}>
            <Text fontSize={["sm", "md"]} fontWeight="normal">
              ({item.amount}){" "}
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Text>
            <Text fontSize={["sm", "md"]}>
              IDR. {new Intl.NumberFormat("id-ID").format(item.totalPrice)}
            </Text>
          </HStack>
        ))}
        <HStack align={"start"} justify={"space-between"}>
          <Text fontSize={["sm", "md"]} fontWeight="normal">
            Tax
          </Text>
          <Text fontSize={["sm", "md"]}></Text>
        </HStack>
      </Flex>

      <HStack align={"start"} justify={"space-between"}>
        <Text fontSize={["md", "lg"]} fontWeight="bold">
          Total
        </Text>
        <Text fontSize={["md", "lg"]} fontWeight={"bold"} color={"#2078B8"}>
          IDR.{" "}
          {new Intl.NumberFormat("id-ID").format(
            parseFloat(order.payment.amount)
          )}
        </Text>
      </HStack>

      {/* Conditional Buttons */}
      {order.orderStatus === "Unpaid" && (
        <>
          <Button
            colorScheme="purple"
            mt={8}
            width="100%"
            bg="#44B3F8"
            _hover={{ bg: "#2078B8", color: "white" }}
            borderRadius={"lg"}
            py={6}
            onClick={handlePayment}
          >
            Lanjut Bayar
          </Button>

          <Button
            colorScheme="red"
            mt={4}
            width="100%"
            borderRadius={"lg"}
            py={6}
            bg="gray.400"
            _hover={{ bg: "red.500" }}
            onClick={() => handleCancelBooking(order)}
          >
            Batalkan Pemesanan
          </Button>
        </>
      )}
      {order.orderStatus === "Issued" ? (
        <Button
          colorScheme="green"
          mt={8}
          width="100%"
          bg="#44B3F8"
          _hover={{ bg: "#2078B8", color: "white" }}
          borderRadius={"lg"}
          py={6}
          onClick={() => handlePrintPDF(order.pdfUrl)}
        >
          Cetak Tiket
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default DetailCard;

import * as React from 'react';
import { createLazyFileRoute, useNavigate, useLocation } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Button,
} from '@chakra-ui/react';
import '../../components/Buyer/Calendar/Calendarcss.css';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb';
import imageSuccess from "../../assets/img/payment_success.png";
import { getDetailOrder } from '../../services/order';
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Overlay from '../../components/Overlay/index.jsx';
import Loading from "../../components/Overlay/loading.jsx";

export const Route = createLazyFileRoute('/payment/success')({
  component: PaymentSuccess,
});

function PaymentSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user, token } = useSelector((state) => state.auth);
  const [isOverlayVisible, setOverlayVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [tujuan, setTujuan] = useState('');
  const orderId = state.orderId;
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token && !user) {
      setOverlayVisible(true);
      setMessage('Anda harus login terlebih dahulu!');
      setTujuan('/login');
    }
  }, [navigate, token, user]);

  useEffect(() => {
    if (!orderId) {
      setOverlayVisible(true);
      setMessage('Order Id Tidak Ditemukan!');
      setTujuan('/');
    }
  }, [navigate, token, user]);

  useEffect(() => {
    if (isOverlayVisible) {
      const timer = setTimeout(() => {
        navigate({ to: tujuan });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isOverlayVisible, navigate, tujuan]);

  const { data, isSuccess } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const data = await getDetailOrder(orderId);
      return data;
    },
    enabled: !!orderId,
  });

  useEffect(() => {
    if (isSuccess) {
      const dataBaru = data.data;
      setOrderData(dataBaru);
      setIsLoading(false);
    }
  }, [data, isSuccess]);

  const handleClickCetak = () => {
    const url = orderData?.pdfUrl;
    window.open(url, "_blank");
  };

  const handleClick = () => {
    navigate({ to: '/' });
  };

  return (
    <>
      <Loading isVisible={isLoading} message="Memuat Halaman ...." />
      <Overlay isVisible={isOverlayVisible} message={message} />
      <Box bg="white" px={{ base: 2, md: 4 }}>
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          direction="column"
          borderBottom="2px solid"
          borderColor="gray.100"
        >
          <Flex w={{ base: "95%", md: "75%" }} direction="column" mb={5}>
            <Stack color="black" mt={10} ml={{ base: 0, md: 30 }} mb={5}>
              <BreadcrumbRoot size="lg">
                <BreadcrumbLink color="black" fontWeight="bold">
                  Isi Data Diri
                </BreadcrumbLink>
                <BreadcrumbLink color="black" fontWeight="bold">
                  Bayar
                </BreadcrumbLink>
                <BreadcrumbCurrentLink color="black" fontWeight="bold">
                  Selesai
                </BreadcrumbCurrentLink>
              </BreadcrumbRoot>
            </Stack>
            <Flex
              justifyContent="center"
              bg="#73CA5C"
              color="white"
              p={3}
              borderRadius="lg"
              w="100%"
            >
              <Text fontFamily="Inter, sans-serif" textAlign="center">
                Terimakasih atas pembayaran transaksi
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w="100%"
          alignItems="center"
          justifyContent="center"
          mb={{ base: 10, md: 20 }}
        >
          <Flex w={{ base: "90%", md: "70%" }} alignItems="center" direction="column">
            <Image src={imageSuccess} width={{ base: "50%", md: "17vw" }} mt={20} />
            <Text color="#094fa4" fontWeight="bold" mt={5} fontSize={{ base: "lg", md: "xl" }}>
              Selamat!
            </Text>
            <Text color="black" fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>
              Transaksi Pembayaran Tiket Sukses!
            </Text>
            <Button
              colorPalette="blue"
              w={{ base: "70%", md: "40%" }}
              h={{ base: "2.5rem", md: "3vw" }}
              fontSize={{ base: "md", md: "xl" }}
              borderRadius="lg"
              mt={12}
              onClick={handleClickCetak}
            >
              Terbitkan Tiket
            </Button>
            <Button
              colorPalette="blue"
              variant="surface"
              w={{ base: "70%", md: "40%" }}
              h={{ base: "2.5rem", md: "3vw" }}
              fontSize={{ base: "md", md: "xl" }}
              borderRadius="lg"
              mt={5}
              color="white"
              onClick={handleClick}
            >
              Cari Penerbangan Lain
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

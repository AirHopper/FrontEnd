import * as React from 'react'
import { createLazyFileRoute, useNavigate, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Stack,
  Text,
  Image,
  Button,
} from '@chakra-ui/react'
import '../../components/Buyer/Calendar/Calendarcss.css'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb'
import imageSuccess from "../../assets/img/payment_success.png"
import { getDetailOrder } from '../../services/order'
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Overlay from '../../components/Overlay/index.jsx';

export const Route = createLazyFileRoute('/payment/success')({
  component: PaymentSuccess,
})

function PaymentSuccess() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user, token } = useSelector((state) => state.auth);
    const [isOverlayVisible, setOverlayVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [tujuan, setTujuan] = useState('')
    const orderId = state.orderId;
    const [orderData, setOrderData] = useState([]);
    useEffect(() => {
    if (!token && !user) {
        setOverlayVisible(true)
        setMessage('Anda harus login terlebih dahulu!')
        setTujuan('/login')
    }
    }, [navigate, token, user])

    useEffect(() => {
        if (!orderId) {
            setOverlayVisible(true)
            setMessage('Order Id Tidak Ditemukan!')
            setTujuan('/')
        }
    }, [navigate, token, user])

    useEffect(() => {
    if (isOverlayVisible) {
        const timer = setTimeout(() => {
        navigate({ to: tujuan })
        }, 4000)

        return () => clearTimeout(timer)
    }
    }, [isOverlayVisible, navigate, tujuan])
    const { data, isSuccess} = useQuery({
        queryKey: ["order", orderId],
        queryFn: async()=>{
            const data = await getDetailOrder(orderId)
            return data
        },
        enabled: !!orderId,
    });
    useEffect(() => {
        if (isSuccess) {
            const dataBaru = data.data
            setOrderData(dataBaru);
        }   
    }, [data, isSuccess]);
    const handleClick = () => {
        navigate({ to: '/' })
    }
    return (
        <>
            <Overlay isVisible={isOverlayVisible} message={message} />
            <Box bg="white" px={4}>
                <Flex
                w="100%"
                alignItems="center"
                justifyContent="center"
                direction="column"
                borderBottom="2px solid"
                borderColor="gray.100"
                >
                <Flex w="75%" direction="column" marginBottom={5}>
                    <Stack color="black" marginTop={10} marginLeft={30} marginBottom={5}>
                    <BreadcrumbRoot size="lg">
                        <BreadcrumbLink
                        color="black"
                        fontWeight="bold"
                        >
                        Isi Data Diri
                        </BreadcrumbLink>
                        <BreadcrumbLink 
                        color="black" 
                        fontWeight="bold">
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
                    w="92%"
                    marginLeft={10}
                    >
                    <Text fontFamily="Inter, sans-serif">
                        Terimakasih atas pembayaran transaksi
                    </Text>
                    </Flex>
                </Flex>
                </Flex>
                <Flex 
                w="100%" 
                alignItems="center" 
                justifyContent="center"
                marginBottom={20}
                >
                    <Flex w="70%" alignItems="center" direction="column">
                        <Image src={imageSuccess} width="17vw" marginTop={20}/>
                        <Text color="#094fa4" fontWeight="bold" marginTop={5}>Selamat!</Text>
                        <Text color="black" fontWeight="bold">Transaksi Pembayaran Tiket Sukses!</Text>
                        <Button
                        colorPalette="blue"
                        width="40%"
                        height="3vw"
                        fontSize="xl"
                        borderRadius="lg"
                        marginTop={12}
                        >
                        Terbitkan Tiket
                        </Button>
                        <Button
                        colorPalette="blue"
                        variant="surface"
                        width="40%"
                        height="3vw"
                        fontSize="xl"
                        borderRadius="lg"
                        marginTop={5}
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

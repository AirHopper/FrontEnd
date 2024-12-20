import * as React from 'react'
import { createLazyFileRoute, useNavigate, useLocation} from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Stack,
  Text,
  Grid,
  Card,
} from '@chakra-ui/react'
import '../../components/Buyer/Calendar/Calendarcss.css'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb'
import { faSun} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from "react-toastify";
import { getDetailOrder } from '../../services/order'
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Overlay from '../../components/Overlay/index.jsx';
import Loading from "../../components/Overlay/loading.jsx";

export const Route = createLazyFileRoute('/payment/')({
  component: PaymentIndex,
})

function PaymentIndex() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { user, token } = useSelector((state) => state.auth);
    const [isOverlayVisible, setOverlayVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [tujuan, setTujuan] = useState('')
    const orderId = state.orderId;
    let tokenPayment = "";
    const [orderData, setOrderData] = useState([]);
    const [flightDetails, setFlightDetails] = useState([]);
    const [flightDetails2, setFlightDetails2] = useState([]);
    const [snapLoaded, setSnapLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { data, isSuccess} = useQuery({
        queryKey: ["order", orderId],
        queryFn: async()=>{
            const data = await getDetailOrder(orderId)
            return data
        },
        enabled: !!orderId,
    });
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
    useEffect(() => {
        if (isSuccess) {
            const dataBaru = data.data
            setOrderData(dataBaru);
            setIsLoading(false);
        }   
    }, [data, isSuccess]);
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const transactionStatus = query.get("transaction_status");
        const statusCode = query.get("status_code");
        const order_Id = query.get("order_id");
       
        if (transactionStatus) {
            if (transactionStatus === "pending" && statusCode === "201") {
                toast.info("Pembayaran sedang menunggu.", {
                    autoClose: 3000,
                });
                navigate({
                    to:"/"
                });
            } else if (transactionStatus === "settlement" && statusCode === "200") {
                toast.success("Pembayaran berhasil!", {
                    autoClose: 3000,
                });
                navigate({
                    to:"/payment/success",
                    state : {orderId : order_Id}
                });
            } else {
                toast.error("Terjadi kesalahan saat pembayaran.", {
                    autoClose: 3000,
                });
                navigate({to:"/"});
            }
        }
    }, [location, navigate]);
    
    const load_payment = () => {
        window.snap.embed(tokenPayment, {
            embedId: "snap-container",
        });
    };
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";	
        script.setAttribute("data-client-key", "SB-Mid-client-6xTm8UKill9p5ONm");
        script.async = true;
        script.onload = () => {
            setSnapLoaded(true);
        };      
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    useEffect(()=>{
        if(orderData?.id){
            tokenPayment = orderData?.payment.token
            if(snapLoaded){
                load_payment()
                setSnapLoaded(false)
            }
        }
    }, [snapLoaded, orderData, tokenPayment])
    const flights = orderData?.outboundTicket?.flights
    useEffect(() => {
        if(flights){
            setFlightDetails(flights);
        }
    }, [flights]);
    const flights2 = orderData?.isRoundTrip ? orderData?.returnTicket.flights : null;
    useEffect(() => {
        if (flights2) {
            setFlightDetails2(flights2);
        }
    }, [flights2]);
    const firstFlight = flightDetails[0];
    const secondFlight = flightDetails[1];
    let thirdFlight = null;
    if(flightDetails.length > 2){
        thirdFlight = flightDetails[2] 
    }
    let firtsReturnFlight = null;
    let secondReturnFlight = null;
    let thirdReturnFlight = null;
    if(flightDetails2.length > 0 ){
        firtsReturnFlight = flightDetails2[0];
        secondReturnFlight = flightDetails2[1]
        if(flightDetails2.length > 2){
        thirdReturnFlight = flightDetails2[2]
        }
    }
    let dewasa = 0;
    let anak = 0;
    let bayi = 0;
    let totalTicketDewasa = 0;
    let totalTicketAnak = 0;
    if(!!orderData){
        const detailPrice = orderData?.detailPrice    
        for (let i = 0; i < detailPrice?.length; i++) {
            const item = detailPrice[i]; 
            if (item.type === "adult") {
            dewasa += item.amount;
            totalTicketDewasa += item.totalPrice; 
            } else if (item.type === "children") {
            anak += item.amount;
            totalTicketAnak += item.totalPrice;
            } else if (item.type === "infant") {
            bayi += item.amount;
            }
        }    
    }
    return (
        <>
        <Loading isVisible={isLoading} message="Memuat Data Pembayaran...."/>  
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
                    <BreadcrumbCurrentLink color="black" fontWeight="bold">
                    Bayar
                    </BreadcrumbCurrentLink>
                    <BreadcrumbLink color="grey" fontWeight="bold">
                    Selesai
                    </BreadcrumbLink>
                </BreadcrumbRoot>
                </Stack>
            </Flex>
            </Flex>
            <Flex w="100%" alignItems="center" justifyContent="center">
            <Flex w="70%">
                <Grid
                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                gap={6}
                p={5}
                >
                <Box>
                    <Card.Root
                    maxW="sm"
                    bg="white"
                    color="black"
                    w="100%"
                    minWidth="33vw"
                    marginBottom={10}
                    >
                    <Card.Header>
                        <Card.Title fontWeight="bold">Isi Data Pembayaran</Card.Title>
                    </Card.Header>
                    <Card.Body marginBottom={5}>
                        <Flex
                        id="snap-container"
                        width="100%"
                        />
                    </Card.Body>
                    </Card.Root>
                </Box>
                <Box>
                    <Card.Root
                    maxW="sm"
                    bg="white"
                    color="black"
                    w="100%"
                    minWidth="30vw"
                    border="none"
                    >
                        <Card.Header>
                            <Card.Title fontWeight="bold" color="blue">
                                Detail Penerbangan
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(firstFlight?.departure.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                                </Text>
                            </Flex>
                            <Text>{new Date(firstFlight?.departure.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                            <Text fontWeight="bolder">
                                {firstFlight?.departure.airport.name} - {firstFlight?.departure.terminal.name} {firstFlight?.departure.terminal.type}
                            </Text>
                            <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                            />
                            <Flex direction="column" marginLeft={7} marginTop={3}>
                                <Text fontWeight="bold">{firstFlight?.airplane} - {orderData?.outboundTicket?.class}</Text>
                            </Flex>
                            <Flex align="center" marginTop={3}>
                                <FontAwesomeIcon
                                icon={faSun}
                                color="orange"
                                marginLeft={1}
                                />
                                <Text fontWeight="bold" marginLeft={3}>
                                Informasi :
                                </Text>
                            </Flex>
                            <Flex marginLeft={7} direction="column">
                                <Text>Baggage {firstFlight?.baggage} Kg</Text>
                                <Text>Cabin baggage {firstFlight?.cabinBaggage} Kg</Text>
                                {firstFlight?.entertainment === true && (<Text>In Flight Entertainment</Text>)}
                            </Flex>
                            <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={3}
                            />
                            <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(firstFlight?.arrival.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                Kedatangan
                                </Text>
                            </Flex>
                            <Text>{new Date(firstFlight?.arrival.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                            <Text fontWeight="bolder">
                                {firstFlight?.arrival.airport.name} - {firstFlight?.arrival.terminal.name} {firstFlight?.arrival.terminal.type} 
                            </Text>
                            {!!secondFlight && (
                                <>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={5}
                                />
                                <Text fontWeight="bold" marginBottom={5} color="blue" fontSize="lg">Detail Penerbangan Berangkat (Transit Pertama)</Text>
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(secondFlight?.departure.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                                </Text>
                                </Flex>
                                <Text>{new Date(secondFlight?.departure.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {secondFlight?.departure.airport.name} - {secondFlight?.departure.terminal.name} {secondFlight?.departure.terminal.type}
                                </Text>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                />
                                <Flex direction="column" marginLeft={7} marginTop={3}>
                                <Text fontWeight="bold">{secondFlight?.airplane} - {orderData?.outboundTicket?.class}</Text>
                                </Flex>
                                <Flex align="center" marginTop={3}>
                                <FontAwesomeIcon
                                    icon={faSun}
                                    color="orange"
                                    marginLeft={1}
                                />
                                <Text fontWeight="bold" marginLeft={3}>
                                    Informasi :
                                </Text>
                                </Flex>
                                <Flex marginLeft={7} direction="column">
                                <Text>Baggage {secondFlight?.baggage} Kg</Text>
                                <Text>Cabin baggage {secondFlight?.cabinBaggage} Kg</Text>
                                {secondFlight?.entertainment === true && (<Text>In Flight Entertainment</Text>)}
                                </Flex>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={3}
                                />
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(secondFlight?.arrival.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                    Kedatangan
                                </Text>
                                </Flex>
                                <Text>{new Date(secondFlight?.arrival.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {secondFlight?.arrival.airport.name} - {secondFlight?.arrival.terminal.name} {secondFlight?.arrival.terminal.type} 
                                </Text>
                                </>
                            )}
                            {!!thirdFlight && (
                                <>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={5}
                                />
                                <Text fontWeight="bold" marginBottom={5} color="blue" fontSize="lg">Detail Penerbangan Berangkat (Transit Kedua)</Text>
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(thirdFlight?.departure.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                                </Text>
                                </Flex>
                                <Text>{new Date(thirdFlight?.departure.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {thirdFlight?.departure.airport.name} - {thirdFlight?.departure.terminal.name} {thirdFlight?.departure.terminal.type}
                                </Text>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                />
                                <Flex direction="column" marginLeft={7} marginTop={3}>
                                <Text fontWeight="bold">{thirdFlight?.airplane} - {orderData?.outboundTicket?.class}</Text>
                                </Flex>
                                <Flex align="center" marginTop={3}>
                                <FontAwesomeIcon
                                    icon={faSun}
                                    color="orange"
                                    marginLeft={1}
                                />
                                <Text fontWeight="bold" marginLeft={3}>
                                    Informasi :
                                </Text>
                                </Flex>
                                <Flex marginLeft={7} direction="column">
                                <Text>Baggage {thirdFlight?.baggage} Kg</Text>
                                <Text>Cabin baggage {thirdFlight?.cabinBaggage} Kg</Text>
                                {thirdFlight?.entertainment === true && (<Text>In Flight Entertainment</Text>)}
                                </Flex>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={3}
                                />
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(thirdFlight?.arrival.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                    Kedatangan
                                </Text>
                                </Flex>
                                <Text>{new Date(thirdFlight?.arrival.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {thirdFlight?.arrival.airport.name} - {thirdFlight?.arrival.terminal.name} {thirdFlight?.arrival.terminal.type} 
                                </Text>
                                </>
                            )}
                            {flightDetails2.length > 0 && (
                                <>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={5}
                                />
                                <Text fontWeight="bold" marginBottom={5} color="blue" fontSize="lg">Detail Penerbangan Pulang</Text>
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(firtsReturnFlight?.departure.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                                </Text>
                                </Flex>
                                <Text>{new Date(firtsReturnFlight?.departure.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {firtsReturnFlight?.departure.airport.name} - {firtsReturnFlight?.departure.terminal.name} {firtsReturnFlight?.departure.terminal.type}
                                </Text>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                />
                                <Flex direction="column" marginLeft={7} marginTop={3}>
                                <Text fontWeight="bold">{firtsReturnFlight?.airplane} - {orderData?.returnTicket?.class}</Text>
                                </Flex>
                                <Flex align="center" marginTop={3}>
                                <FontAwesomeIcon
                                    icon={faSun}
                                    color="orange"
                                    marginLeft={1}
                                />
                                <Text fontWeight="bold" marginLeft={3}>
                                    Informasi :
                                </Text>
                                </Flex>
                                <Flex marginLeft={7} direction="column">
                                <Text>Baggage {firtsReturnFlight?.baggage} Kg</Text>
                                <Text>Cabin baggage {firtsReturnFlight?.cabinBaggage} Kg</Text>
                                {firtsReturnFlight?.entertainment === true && (<Text>In Flight Entertainment</Text>)}
                                </Flex>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={3}
                                />
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(firtsReturnFlight?.arrival.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                    Kedatangan
                                </Text>
                                </Flex>
                                <Text>{new Date(firtsReturnFlight?.arrival.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {firtsReturnFlight?.arrival.airport.name} - {firtsReturnFlight?.arrival.terminal.name} {firtsReturnFlight?.arrival.terminal.type} 
                                </Text>
                                </>
                            )}
                            {!!secondReturnFlight && (
                                <>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={5}
                                />
                                <Text fontWeight="bold" marginBottom={5} color="blue" fontSize="lg">Detail Penerbangan Pulang (Transit Pertama)</Text>
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(secondReturnFlight?.departure.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                                </Text>
                                </Flex>
                                <Text>{new Date(secondReturnFlight?.departure.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {secondReturnFlight?.departure.airport.name} - {secondReturnFlight?.departure.terminal.name} {secondReturnFlight?.departure.terminal.type}
                                </Text>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                />
                                <Flex direction="column" marginLeft={7} marginTop={3}>
                                <Text fontWeight="bold">{secondReturnFlight?.airplane} - {orderData?.returnTicket?.class}</Text>
                                </Flex>
                                <Flex align="center" marginTop={3}>
                                <FontAwesomeIcon
                                    icon={faSun}
                                    color="orange"
                                    marginLeft={1}
                                />
                                <Text fontWeight="bold" marginLeft={3}>
                                    Informasi :
                                </Text>
                                </Flex>
                                <Flex marginLeft={7} direction="column">
                                <Text>Baggage {secondReturnFlight?.baggage} Kg</Text>
                                <Text>Cabin baggage {secondReturnFlight?.cabinBaggage} Kg</Text>
                                {secondReturnFlight?.entertainment === true && (<Text>In Flight Entertainment</Text>)}
                                </Flex>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={3}
                                />
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(secondReturnFlight?.arrival.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                    Kedatangan
                                </Text>
                                </Flex>
                                <Text>{new Date(secondReturnFlight?.arrival.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {secondReturnFlight?.arrival.airport.name} - {secondReturnFlight?.arrival.terminal.name} {secondReturnFlight?.arrival.terminal.type} 
                                </Text>
                                </>
                            )}
                            {!!thirdReturnFlight && (
                                <>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={5}
                                />
                                <Text fontWeight="bold" marginBottom={5} color="blue" fontSize="lg">Detail Penerbangan Pulang (Transit Kedua)</Text>
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(thirdReturnFlight?.departure.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                                </Text>
                                </Flex>
                                <Text>{new Date(thirdReturnFlight?.departure.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {thirdReturnFlight?.departure.airport.name} - {thirdReturnFlight?.departure.terminal.name} {thirdReturnFlight?.departure.terminal.type}
                                </Text>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                />
                                <Flex direction="column" marginLeft={7} marginTop={3}>
                                <Text fontWeight="bold">{thirdReturnFlight?.airplane} - {orderData?.returnTicket?.class}</Text>
                                </Flex>
                                <Flex align="center" marginTop={3}>
                                <FontAwesomeIcon
                                    icon={faSun}
                                    color="orange"
                                    marginLeft={1}
                                />
                                <Text fontWeight="bold" marginLeft={3}>
                                    Informasi :
                                </Text>
                                </Flex>
                                <Flex marginLeft={7} direction="column">
                                <Text>Baggage {thirdReturnFlight?.baggage} Kg</Text>
                                <Text>Cabin baggage {thirdReturnFlight?.cabinBaggage} Kg</Text>
                                {thirdReturnFlight?.entertainment === true && (<Text>In Flight Entertainment</Text>)}
                                </Flex>
                                <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={3}
                                />
                                <Flex justifyContent="space-between">
                                <Text fontWeight="bold">{new Date(thirdReturnFlight?.arrival.time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone:'UTC' })}</Text>
                                <Text color="blue.400" fontWeight="bold">
                                    Kedatangan
                                </Text>
                                </Flex>
                                <Text>{new Date(thirdReturnFlight?.arrival.time).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</Text>
                                <Text fontWeight="bolder">
                                {thirdReturnFlight?.arrival.airport.name} - {thirdReturnFlight?.arrival.terminal.name} {thirdReturnFlight?.arrival.terminal.type} 
                                </Text>
                                </>
                            )}
                            <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={3}
                                marginBottom={3}
                            />
                            <Text fontWeight="bold">Rincian Harga</Text>
                            <Flex justifyContent="space-between" marginTop={1}>
                                <Text>{dewasa} Dewasa</Text>
                                <Text>
                                {new Intl.NumberFormat('id-ID', { 
                                    style: 'currency', 
                                    currency: 'IDR', 
                                    minimumFractionDigits: 0, 
                                    maximumFractionDigits: 0 
                                }).format(totalTicketDewasa).replace('Rp', 'IDR')}
                                </Text>
                            </Flex>
                            <Flex justifyContent="space-between" marginTop={1}>
                                <Text>{anak} Anak</Text>
                                <Text>
                                {new Intl.NumberFormat('id-ID', { 
                                    style: 'currency', 
                                    currency: 'IDR', 
                                    minimumFractionDigits: 0, 
                                    maximumFractionDigits: 0 
                                }).format(totalTicketAnak).replace('Rp', 'IDR')}
                                </Text>
                            </Flex>
                            <Flex justifyContent="space-between" marginTop={1}>
                                <Text>{bayi} Bayi</Text>
                                <Text>IDR 0</Text>
                            </Flex>
                            <Flex justifyContent="space-between" marginTop={1}>
                                <Text>Tax</Text>
                                <Text>IDR 0</Text>
                            </Flex>
                            <Box
                                borderBottom="2px solid"
                                borderColor="gray.200"
                                marginTop={2}
                                marginBottom={3}
                            />
                            <Flex justifyContent="space-between" marginTop={1}>
                                <Text fontWeight="bold" fontSize="larger">
                                Total
                                </Text>
                                <Text fontWeight="bold" fontSize="larger" color="blue">
                                {new Intl.NumberFormat('id-ID', { 
                                    style: 'currency', 
                                    currency: 'IDR', 
                                    minimumFractionDigits: 0, 
                                    maximumFractionDigits: 0 
                                }).format(totalTicketDewasa+totalTicketAnak).replace('Rp', 'IDR')}
                                </Text>
                            </Flex>
                        </Card.Body>  
                    </Card.Root>
                </Box>
                </Grid>
            </Flex>
            </Flex>
        </Box>
    </>
    );
}
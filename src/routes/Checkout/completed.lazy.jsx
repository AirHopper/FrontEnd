import * as React from 'react'
import { createLazyFileRoute, useNavigate, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import {
  Box,
  Flex,
  Button,
  Stack,
  Input,
  Text,
  Grid,
  Card,
  Spinner
} from '@chakra-ui/react'
import '../../components/Buyer/Calendar/Calendarcss.css'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb'
import { Field } from '@/components/ui/field'
import { faSun, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SeatPickerEkonomi from '../../components/Buyer/Seat/seatEkonomi.lazy.jsx'
import SeatPickerPremiunEkonomi from '../../components/Buyer/Seat/seatPremiumEkonomi.lazy.jsx'
import SeatPickerBisnis from '../../components/Buyer/Seat/seatBisnis.lazy.jsx'
import SeatPickerEksekutif from '../../components/Buyer/Seat/seatEksekutif.lazy.jsx'
import { getDetailOrder } from '../../services/order/index.js'
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Overlay from '../../components/Overlay/index.jsx';

export const Route = createLazyFileRoute('/checkout/completed')({
  component: CheckoutCompleted,
})

function CheckoutCompleted() {
  const navigate = useNavigate()
  const { state } = useLocation();
  const orderId = state.orderId;
  const { user, token } = useSelector((state) => state.auth);
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [tujuan, setTujuan] = useState('')
  const [selected, setSelected] = React.useState(null);
  const [orderData, setOrderData] = useState([]);
  const [flightDetails, setFlightDetails] = useState([]);
  const [flightDetails2, setFlightDetails2] = useState([]);
  const [kelas, setKelas] = useState("");
  const [selectedBerangkat, setSelectedBerangkat] = useState([])
  const [selectedTransit1Berangkat, setSelectedTransit1Berangkat] = useState([])
  const [selectedTransit2Berangkat, setSelectedTransit2Berangkat] = useState([])
  const [selectedPulang, setSelectedPulang] = useState([])
  const [selectedTransit1Pulang, setSelectedTransit1Pulang] = useState([])
  const [selectedTransit2Pulang, setSelectedTransit2Pulang] = useState([])
  const [seatBerangkat, setSeatBerangkat] = useState([]);
  const [seatTransit1Berangkat, setSeatTransit1Berangkat] = useState([]);
  const [seatTransit2Berangkat, setSeatTransit2Berangkat] = useState([]);
  const [seatPulang, setSeatPulang] = useState([]);
  const [seatTransit1Pulang, setSeatTransit1Pulang] = useState([]);
  const [seatTransit2Pulang, setSeatTransit2Pulang] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [passengersData, setPassengersData] = useState([]);
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
      setMessage('Order Id Tidak Ditemukan !')
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
    if(user){
        setFullName(user.user?.fullName)
        setPhoneNumber(user.user?.phoneNumber)
        setEmail(user?.email)
    }
  },[user])
  useEffect(() => {
    if (isSuccess) {
        const dataBaru = data.data
        setOrderData(dataBaru);
    }
  }, [data, isSuccess]);
  const passenger = orderData?.passengers
  useEffect(() => {
    if(passenger){
      setPassengersData(passenger);
    }
  }, [passenger]);
  useEffect(() => {
    if(orderData){
      setKelas(orderData?.outboundTicket?.class);
    }
  }, [orderData]);
  const flights = orderData?.outboundTicket?.flights
  useEffect(() => {
    if(flights){
      setFlightDetails(flights);
    }
  }, [flights]);
  useEffect(() => {
    if (flightDetails?.length > 0) {
      setSeatBerangkat(flightDetails[0]?.seat);
      if (flightDetails.length > 1) {
        setSeatTransit1Berangkat(flightDetails[1]?.seat);
      }
      if (flightDetails.length > 2) {
        setSeatTransit2Berangkat(flightDetails[2]?.seat);
      }
    }
  }, [flightDetails, seatBerangkat]); 

  const flights2 = orderData?.isRoundTrip ? orderData?.returnTicket.flights : null;
  useEffect(() => {
    if (flights2) {
      setFlightDetails2(flights2);
    }
  }, [flights2]);
  useEffect(() => {
    if (flightDetails2?.length > 0) {
      setSeatPulang(flightDetails2[0]?.seat);
      if (flightDetails2.length > 1) {
        setSeatTransit1Pulang(flightDetails2[1]?.seat);
      }
      if (flightDetails2.length > 2) {
        setSeatTransit2Pulang(flightDetails2[2]?.seat);
      }
    }
  }, [flightDetails2]);

  const handleClick = () => {
    navigate({ 
      to: '/payment',
      state : {
        orderId : orderId
      }
    })
  }
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
  const bookedSeatBerangkat = []
  seatBerangkat.forEach((seat) => {
    if (seat.isOccupied) {
      bookedSeatBerangkat.push(seat.id)
    }
  })
  const bookedSeatTransit1Berangkat = []
  seatTransit1Berangkat.forEach((seat) => {
    if (seat.isOccupied) {
      bookedSeatTransit1Berangkat.push(seat.id)
    }
  })
  const bookedSeatTransit2Berangkat = []
  seatTransit2Berangkat.forEach((seat) => {
    if (seat.isOccupied) {
      bookedSeatTransit2Berangkat.push(seat.id)
    }
  })
  const bookedSeatPulang = []
  seatPulang.forEach((seat) => {
    if (seat.isOccupied) {
      bookedSeatPulang.push(seat.id)
    }
  })
  const bookedSeatTransit1Pulang = []
  seatTransit1Pulang.forEach((seat) => {
    if (seat.isOccupied) {
      bookedSeatTransit1Pulang.push(seat.id)
    }
  })
  const bookedSeatTransit2Pulang = []
  seatTransit2Pulang.forEach((seat) => {
    if (seat.isOccupied) {
      bookedSeatTransit2Pulang.push(seat.id)
    }
  })
  const selectedSeatsBerangkat = []
  const selectedSeatsTransit1Berangkat = []
  const selectedSeatsTransit2Berangkat = []
  const selectedSeatsPulang = []
  const selectedSeatsTransit1Pulang = []
  const selectedSeatsTransit2Pulang = []
  let index = 0
  if(orderData?.outboundTicket?.flights[0]){
    for (let i = 0; i < orderData?.passengers?.length; i++){
      selectedSeatsBerangkat.push(orderData?.passengers[i]?.seat[index].id)
    }
    index += 1
  }
  if(orderData?.outboundTicket?.flights[1]){
    for (let i = 0; i < orderData?.passengers?.length; i++){
      selectedSeatsTransit1Berangkat.push(orderData?.passengers[i]?.seat[index].id)
    }
    index += 1
  }
  if(orderData?.outboundTicket?.flights[2]){
    for (let i = 0; i < orderData?.passengers?.length; i++){
      selectedSeatsTransit2Berangkat.push(orderData?.passengers[i]?.seat[index].id)
    }
    index += 1
  }
  if(orderData?.returnTicket?.flights[0]){
    for (let i = 0; i < orderData?.passengers?.length; i++){
      selectedSeatsPulang.push(orderData?.passengers[i]?.seat[index].id)
    }
    index += 1
  }
  if(orderData?.returnTicket?.flights[1]){
    for (let i = 0; i < orderData?.passengers?.length; i++){
      selectedSeatsTransit1Pulang.push(orderData?.passengers[i]?.seat[index].id)
    }
    index += 1
  }
  if(orderData?.returnTicket?.flights[2]){
    for (let i = 0; i < orderData?.passengers?.length; i++){
      selectedSeatsTransit2Pulang.push(orderData?.passengers[i]?.seat[index].id)
    }
    index += 1
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
            <Stack
              color="black"
              marginTop={10}
              marginLeft={30}
              marginBottom={5}
            >
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
                Data Anda berhasil tersimpan!
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" alignItems="center" justifyContent="center">
          <Flex w="70%">
            <Grid
              templateColumns={{ base: '1fr', md: '1fr 1fr' }}
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
                    <Card.Title fontWeight="bold">
                      Isi Data Pemesanan
                    </Card.Title>
                  </Card.Header>
                  <Card.Body marginBottom={5}>
                    <Flex
                      bg="#3C3C3C"
                      color="white"
                      borderTopRadius="lg"
                      h={10}
                      justifyContent="space-between"
                    >
                      <Text marginLeft={4} marginTop={2}>
                        Data Diri Pemesan
                      </Text>
                      <Box marginTop={2} marginRight={5}>
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          color="#73CA5C"
                          size="lg"
                        />
                      </Box>
                    </Flex>
                    <Stack gap="4" px={4} marginTop={2}>
                      <Field
                        color="#006ec1"
                        label="Nama Lengkap"
                        labelProps={{ fontWeight: 'bold' }}
                      >
                        <Input
                          value={fullName}
                          disabled
                          borderColor="gray.300"
                        />
                      </Field>
                      <Field
                        color="#006ec1"
                        label="Nomor Telepon"
                        labelProps={{ fontWeight: 'bold' }}
                      >
                        <Input
                          value={phoneNumber}
                          disabled
                          borderColor="gray.300"
                        />
                      </Field>
                      <Field
                        color="#006ec1"
                        label="Email"
                        labelProps={{ fontWeight: 'bold' }}
                      >
                        <Input
                          value={email}
                          disabled
                          borderColor="gray.300"
                        />
                      </Field>
                    </Stack>
                  </Card.Body>
                </Card.Root>
                <Card.Root
                  maxW="sm"
                  bg="white"
                  color="black"
                  w="100%"
                  minWidth="33vw"
                  marginBottom={10}
                >
                  <Card.Header>
                    <Card.Title fontWeight="bold">
                      Isi Data Penumpang
                    </Card.Title>
                  </Card.Header>
                  <Card.Body marginBottom={5}>
                    {!passengersData &&(
                      <Flex justifyContent="center" alignItems="center" height="100vh" bg="gray.100">
                        <Spinner size="xl" color="teal.500" />
                        <Text ml={4} fontSize="lg" color="gray.700" fontFamily="Inter, sans-serif">
                          Memuat Data Penumpang...
                        </Text>
                      </Flex>
                    )}
                    {!!passengersData &&(
                      <Box>
                      {[...Array(passengersData.length)].map((_, index) => (
                          <Box key={index} mb={6} color="black">
                            <Flex bg="#3C3C3C" color="white" borderTopRadius="lg" h={10} mb={2} justifyContent="space-between">
                              <Text ml={4} pt={2}>Data Diri Penumpang {index + 1} - {passengersData[index]?.type}</Text>
                              <Box marginTop={2} marginRight={5}>
                                <FontAwesomeIcon
                                  icon={faCircleCheck}
                                  color="#73CA5C"
                                  size="lg"
                                />
                              </Box>
                            </Flex>
                            <Stack gap="4" px={4}>
                              <Field
                                color="#006ec1"
                                label="Title"
                                labelProps={{ fontWeight: 'bold' }}
                              >
                                <Input
                                  value={passengersData[index]?.title}
                                  disabled
                                  borderColor="gray.300"
                                />
                              </Field>
                              <Field
                                color="#006ec1"
                                label="Nama Lengkap"
                                labelProps={{ fontWeight: 'bold' }}
                              >
                                <Input
                                  value={passengersData[index]?.name}
                                  disabled
                                  borderColor="gray.300"
                                />
                              </Field>
                              {passengersData[index]?.familyName && (
                                <Field
                                  color="#006ec1"
                                  label="Nama Keluarga"
                                  labelProps={{ fontWeight: 'bold' }}
                                >
                                  <Input
                                    value={passengersData[index]?.familyName}
                                    disabled
                                    borderColor="gray.300"
                                  />
                                </Field>
                              )}
                              <Field
                                color="#006ec1"
                                label="Tanggal Lahir"
                                labelProps={{ fontWeight: 'bold' }}
                              >
                                <Input
                                  value={
                                    passengersData[index]?.dateOfBirth
                                      ? new Date(passengersData[index]?.dateOfBirth).toLocaleDateString('id-ID', {
                                          day: '2-digit',
                                          month: 'long',
                                          year: 'numeric',
                                        })
                                      : ''
                                  }
                                  disabled
                                  borderColor="gray.300"
                                />
                              </Field>
                              <Field
                                color="#006ec1"
                                label="Kewarganegaraan"
                                labelProps={{ fontWeight: 'bold' }}
                              >
                                <Input
                                  value={passengersData[index]?.nationality}
                                  disabled
                                  borderColor="gray.300"
                                />
                              </Field>
                              <Field
                                color="#006ec1"
                                label="KTP/Paspor"
                                labelProps={{ fontWeight: 'bold' }}
                              >
                                <Input
                                  value={passengersData[index]?.identifierNumber}
                                  disabled
                                  borderColor="gray.300"
                                />
                              </Field>
                              <Field
                                color="#006ec1"
                                label="Negara Penerbit"
                                labelProps={{ fontWeight: 'bold' }}
                              >
                                <Input
                                  value={passengersData[index]?.issuedCountry}
                                  disabled
                                  borderColor="gray.300"
                                />
                              </Field>
                              <Field
                                color="#006ec1"
                                label="Berlaku Sampai"
                                labelProps={{ fontWeight: 'bold' }}
                              >
                                <Input
                                  value={
                                    passengersData[index]?.idValidUntil
                                      ? new Date(passengersData[index]?.idValidUntil).toLocaleDateString('id-ID', {
                                          day: '2-digit',
                                          month: 'long',
                                          year: 'numeric',
                                        })
                                      : ''
                                  }
                                  disabled
                                  borderColor="gray.300"
                                />
                              </Field>
                            </Stack>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Card.Body>
                </Card.Root>
                <Card.Root
                  maxW="sm"
                  bg="white"
                  color="black"
                  w="100%"
                  minWidth="33vw"
                  marginBottom={8}
                  minHeight="20vw"
                >
                  <Text
                    fontWeight="bold"
                    marginLeft={5}
                    marginTop={5}
                    marginBottom={5}
                  >
                    Pilih Kursi Berangkat
                  </Text>
                  {kelas === "Economy" && (
                    <SeatPickerEkonomi setSelected={setSelectedBerangkat} seat={seatBerangkat} bookedSeats={bookedSeatBerangkat} selectedSeats={selectedSeatsBerangkat}/>
                  )}
                  {kelas === "Premium+Economy" && (
                    <SeatPickerPremiunEkonomi setSelected={setSelectedBerangkat} seat={seatBerangkat} bookedSeats={bookedSeatBerangkat} selectedSeats={selectedSeatsBerangkat}/>
                  )}
                  {kelas === "Business" &&(
                    <SeatPickerBisnis setSelected={setSelectedBerangkat} seat={seatBerangkat} bookedSeats={bookedSeatBerangkat} selectedSeats={selectedSeatsBerangkat}/>
                  )}
                  {kelas == "First+Class" && (
                    <SeatPickerEksekutif setSelected={setSelectedBerangkat} seat={seatBerangkat} bookedSeats={bookedSeatBerangkat} selectedSeats={selectedSeatsBerangkat}/>
                  )}
                  {orderData?.outboundTicket?.isTransits === true && (
                    <>
                    <Box height={5} />
                    <Text
                      fontWeight="bold"
                      marginLeft={5}
                      marginTop={5}
                      marginBottom={5}
                    >
                      Pilih Kursi Transit 1 Berangkat
                    </Text>
                    {kelas === "Economy" && (
                      <SeatPickerEkonomi setSelected={setSelectedTransit1Berangkat} seat={seatTransit1Berangkat} bookedSeats={bookedSeatTransit1Berangkat} selectedSeats={selectedSeatsTransit1Berangkat}/>
                    )}
                    {kelas === "Premium+Economy" && (
                      <SeatPickerPremiunEkonomi setSelected={setSelectedTransit1Berangkat} seat={seatTransit1Berangkat} bookedSeats={bookedSeatTransit1Berangkat} selectedSeats={selectedSeatsTransit1Berangkat}/>
                    )}
                    {kelas === "Business" &&(
                      <SeatPickerBisnis setSelected={setSelectedTransit1Berangkat} seat={seatTransit1Berangkat} bookedSeats={bookedSeatTransit1Berangkat} selectedSeats={selectedSeatsTransit1Berangkat}/>
                    )}
                    {kelas == "First+Class" && (
                      <SeatPickerEksekutif setSelected={setSelectedTransit1Berangkat} seat={seatTransit1Berangkat} bookedSeats={bookedSeatTransit1Berangkat} selectedSeats={selectedSeatsTransit1Berangkat}/>
                    )}
                    </>
                  )}
                  {seatTransit2Berangkat.length > 0 && (
                    <>
                    <Box height={5} />
                    <Text
                      fontWeight="bold"
                      marginLeft={5}
                      marginTop={5}
                      marginBottom={5}
                    >
                      Pilih Kursi Transit 2 Berangkat
                    </Text>
                    {kelas === "Economy" && (
                      <SeatPickerEkonomi setSelected={setSelectedTransit2Berangkat} seat={seatTransit2Berangkat} bookedSeats={bookedSeatTransit2Berangkat} selectedSeats={selectedSeatsTransit2Berangkat}/>
                    )}
                    {kelas === "Premium+Economy" && (
                      <SeatPickerPremiunEkonomi setSelected={setSelectedTransit2Berangkat} seat={seatTransit2Berangkat} bookedSeats={bookedSeatTransit2Berangkat} selectedSeats={selectedSeatsTransit2Berangkat}/>
                    )}
                    {kelas === "Business" &&(
                      <SeatPickerBisnis setSelected={setSelectedTransit2Berangkat} seat={seatTransit2Berangkat} bookedSeats={bookedSeatTransit2Berangkat} selectedSeats={selectedSeatsTransit2Berangkat}/>
                    )}
                    {kelas == "First+Class" && (
                      <SeatPickerEksekutif setSelected={setSelectedTransit2Berangkat} seat={seatTransit2Berangkat} bookedSeats={bookedSeatTransit2Berangkat} selectedSeats={selectedSeatsTransit2Berangkat}/>
                    )}
                    </>
                  )}
                  {flightDetails2.length > 0 && (
                    <>
                    <Box height={5} />
                    <Text
                      fontWeight="bold"
                      marginLeft={5}
                      marginTop={5}
                      marginBottom={5}
                    >
                      Pilih Kursi Pulang
                    </Text>
                    {kelas === "Economy" && (
                      <SeatPickerEkonomi setSelected={setSelectedPulang} seat={seatPulang} bookedSeats={bookedSeatPulang} selectedSeats={selectedSeatsPulang}/>
                    )}
                    {kelas === "Premium+Economy" && (
                      <SeatPickerPremiunEkonomi setSelected={setSelectedPulang} seat={seatPulang} bookedSeats={bookedSeatPulang} selectedSeats={selectedSeatsPulang}/>
                    )}
                    {kelas === "Business" &&(
                      <SeatPickerBisnis setSelected={setSelectedPulang} seat={seatPulang} bookedSeats={bookedSeatPulang} selectedSeats={selectedSeatsPulang}/>
                    )}
                    {kelas == "First+Class" && (
                      <SeatPickerEksekutif setSelected={setSelectedPulang} seat={seatPulang} bookedSeats={bookedSeatPulang} selectedSeats={selectedSeatsPulang}/>
                    )}
                    </>
                  )}
                  {orderData?.returnTicket?.isTransits === true && (
                    <>
                    <Box height={5} />
                    <Text
                      fontWeight="bold"
                      marginLeft={5}
                      marginTop={5}
                      marginBottom={5}
                    >
                      Pilih Kursi Transit 1 Pulang
                    </Text>
                    {kelas === "Economy" && (
                      <SeatPickerEkonomi setSelected={setSelectedTransit1Pulang} seat={seatTransit1Pulang} bookedSeats={bookedSeatTransit1Pulang} selectedSeats={selectedSeatsTransit1Pulang}/>
                    )}
                    {kelas === "Premium+Economy" && (
                      <SeatPickerPremiunEkonomi setSelected={setSelectedTransit1Pulang} seat={seatTransit1Pulang} bookedSeats={bookedSeatTransit1Pulang} selectedSeats={selectedSeatsTransit1Pulang}/>
                    )}
                    {kelas === "Business" &&(
                      <SeatPickerBisnis setSelected={setSelectedTransit1Pulang} seat={seatTransit1Pulang} bookedSeats={bookedSeatTransit1Pulang} selectedSeats={selectedSeatsTransit1Pulang}/>
                    )}
                    {kelas == "First+Class" && (
                      <SeatPickerEksekutif setSelected={setSelectedTransit1Pulang} seat={seatTransit1Pulang} bookedSeats={bookedSeatTransit1Pulang} selectedSeats={selectedSeatsTransit1Pulang}/>
                    )}
                    </>
                  )}
                  {seatTransit2Pulang.length > 0 && (
                    <>
                    <Box height={5} />
                    <Text
                      fontWeight="bold"
                      marginLeft={5}
                      marginTop={5}
                      marginBottom={5}
                    >
                      Pilih Kursi Transit 2 Pulang
                    </Text>
                    {kelas === "Economy" && (
                      <SeatPickerEkonomi setSelected={setSelectedTransit2Pulang} seat={seatTransit2Pulang} bookedSeats={bookedSeatTransit2Pulang} selectedSeats={selectedSeatsTransit2Pulang}/>
                    )}
                    {kelas === "Premium+Economy" && (
                      <SeatPickerPremiunEkonomi setSelected={setSelectedTransit2Pulang} seat={seatTransit2Pulang} bookedSeats={bookedSeatTransit2Pulang} selectedSeats={selectedSeatsTransit2Pulang}/>
                    )}
                    {kelas === "Business" &&(
                      <SeatPickerBisnis setSelected={setSelectedTransit2Pulang} seat={seatTransit2Pulang} bookedSeats={bookedSeatTransit2Pulang} selectedSeats={selectedSeatsTransit2Pulang}/>
                    )}
                    {kelas == "First+Class" && (
                      <SeatPickerEksekutif setSelected={setSelectedTransit2Pulang} seat={seatTransit2Pulang} bookedSeats={bookedSeatTransit2Pulang} selectedSeats={selectedSeatsTransit2Pulang}/>
                    )}
                    </>
                  )}
                  <Box height={5} />
                </Card.Root>
                <Flex
                  justifyContent="center"
                  bg="gray.300"
                  color="white"
                  p={2}
                  borderRadius="md"
                  w="100%"
                >
                  <Text fontFamily="Inter, sans-serif">Simpan</Text>
                </Flex>
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
                  <Button
                    colorPalette="red"
                    width="92%"
                    borderRadius="lg"
                    size="xl"
                    marginLeft={5}
                    onClick={handleClick}
                  >
                    Lanjut Bayar
                  </Button>
                </Card.Root>
              </Box>
            </Grid>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

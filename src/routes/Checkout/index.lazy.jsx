import * as React from 'react'
import {
  createLazyFileRoute,
  useNavigate,
  useLocation,
} from '@tanstack/react-router'
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
  createListCollection,
  Spinner,
} from '@chakra-ui/react'
import CalendarComponent from '../../components/Buyer/Calendar/CalendarComponent.jsx'
import '../../components/Buyer/Calendar/Calendarcss.css'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '@/components/ui/breadcrumb'
import { Field } from '@/components/ui/field'
import { Switch } from '@/components/ui/switch'
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import SeatPickerEkonomi from '../../components/Buyer/Seat/seatEkonomi.lazy.jsx'
import SeatPickerPremiumEkonomi from '../../components/Buyer/Seat/seatPremiumEkonomi.lazy.jsx'
import SeatPickerBisnis from '../../components/Buyer/Seat/seatBisnis.lazy.jsx'
import SeatPickerEksekutif from '../../components/Buyer/Seat/seatEksekutif.lazy.jsx'
import { getDetailTickets } from '../../services/tickets/index.js'
import Overlay from '../../components/Overlay/index.jsx'
import { createOrder } from '../../services/order/index.js'
import Loading from '../../components/Overlay/loading.jsx'

export const Route = createLazyFileRoute('/Checkout/')({
  component: CheckoutIndex,
})

function CheckoutIndex() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const { user, token } = useSelector((state) => state.auth)
  const [message, setMessage] = useState('')
  const [tujuan, setTujuan] = useState('')
  const [ticketData, setTicketData] = useState(null)
  const [flightDetails, setFlightDetails] = useState([])
  const [ticketData2, setTicketData2] = useState(null)
  const [flightDetails2, setFlightDetails2] = useState([])
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [selectedBerangkat, setSelectedBerangkat] = useState([])
  const [selectedTransit1Berangkat, setSelectedTransit1Berangkat] = useState([])
  const [selectedTransit2Berangkat, setSelectedTransit2Berangkat] = useState([])
  const [selectedPulang, setSelectedPulang] = useState([])
  const [selectedTransit1Pulang, setSelectedTransit1Pulang] = useState([])
  const [selectedTransit2Pulang, setSelectedTransit2Pulang] = useState([])
  const [seatBerangkat, setSeatBerangkat] = useState([])
  const [seatTransit1Berangkat, setSeatTransit1Berangkat] = useState([])
  const [seatTransit2Berangkat, setSeatTransit2Berangkat] = useState([])
  const [seatPulang, setSeatPulang] = useState([])
  const [seatTransit1Pulang, setSeatTransit1Pulang] = useState([])
  const [seatTransit2Pulang, setSeatTransit2Pulang] = useState([])
  const [isOverlayVisible, setOverlayVisible] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [messageLoading, setMessageLoading] = useState('Memuat Data Ticket...')
  const [email, setEmail] = useState('')
  const dewasa = parseInt(params.get('adult'), 10) || 0
  const anak = parseInt(params.get('child'), 10) || 0
  const bayi = parseInt(params.get('infant'), 10) || 0
  const kelas = params.get('classType') || ''
  const ticketId1 = parseInt(params.get('ticketId1'), 10) || 0
  const ticketId2 = parseInt(params.get('ticketId2'), 10) || 0
  const passengerCount = dewasa + anak
  const totalTicketDewasaPergi = parseInt(ticketData?.totalPrice || 0) * dewasa
  const totalTicketDewasaPulang =
    parseInt(ticketData2?.totalPrice || 0) * dewasa
  const totalTicketDewasa = totalTicketDewasaPergi + totalTicketDewasaPulang
  const totalTicketAnakPergi =
    Math.ceil((parseInt(ticketData?.totalPrice || 0) * 80) / 100) * anak
  const totalTicketAnakPulang =
    Math.ceil((parseInt(ticketData2?.totalPrice || 0) * 80) / 100) * anak
  const totalTicketAnak = totalTicketAnakPergi + totalTicketAnakPulang
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
  const someData = { totalPassengers: passengerCount }

  useEffect(() => {
    if (!token && !user) {
      setOverlayVisible(true)
      setMessage('Anda harus login terlebih dahulu!')
      setTujuan('/login')
    }
  }, [navigate, token, user])

  useEffect(() => {
    if (!ticketId1 || !kelas) {
      setOverlayVisible(true)
      setMessage('Parameter Tidak Sesuai Harap Ulangi')
      setTujuan('/')
    }
  }, [navigate, token, user])

  useEffect(() => {
    if (user) {
      setFullName(user.user?.fullName)
      setPhoneNumber(user.user?.phoneNumber)
      setEmail(user?.email)
    }
  }, [user])

  useEffect(() => {
    if (isOverlayVisible) {
      const timer = setTimeout(() => {
        navigate({ to: tujuan })
      }, 4000)

      return () => clearTimeout(timer)
    }
  }, [isOverlayVisible, navigate, tujuan])

  const { data, isSuccess } = useQuery({
    queryKey: ['tickets1', ticketId1],
    queryFn: async () => {
      const data = getDetailTickets(ticketId1)
      return data
    },
    enabled: !!ticketId1,
  })

  useEffect(() => {
    if (isSuccess) {
      const dataBaru = data.data
      setTicketData(dataBaru)
      setIsLoading(false)
    }
  }, [data, isSuccess])

  const flights = ticketData?.flights
  useEffect(() => {
    if (flights) {
      setFlightDetails(flights)
    }
  }, [flights])
  useEffect(() => {
    if (flightDetails?.length > 0) {
      setSeatBerangkat(flightDetails[0]?.seats)
      if (flightDetails.length > 1) {
        setSeatTransit1Berangkat(flightDetails[1]?.seats)
      }
      if (flightDetails.length > 2) {
        setSeatTransit2Berangkat(flightDetails[2]?.seats)
      }
    }
  }, [flightDetails, seatBerangkat])

  if (ticketId2 !== 0) {
    const { data, isSuccess } = useQuery({
      queryKey: ['tickets2', ticketId2],
      queryFn: async () => {
        const data = getDetailTickets(ticketId2)
        return data
      },
      enabled: !!ticketId2,
    })

    useEffect(() => {
      if (isSuccess) {
        const dataBaru2 = data.data
        setTicketData2(dataBaru2)
      }
    }, [data, isSuccess])
    const flights = ticketData2?.flights
    useEffect(() => {
      if (flights) {
        setFlightDetails2(flights)
      }
    }, [flights])

    useEffect(() => {
      if (flightDetails2?.length > 0) {
        setSeatPulang(flightDetails2[0]?.seats)
        if (flightDetails2.length > 1) {
          setSeatTransit1Pulang(flightDetails2[1]?.seats)
        }
        if (flightDetails2.length > 2) {
          setSeatTransit2Pulang(flightDetails2[2]?.seats)
        }
      }
    }, [flightDetails2])
  }
  const [dataPenumpangDewasa, setDataPenumpangDewasa] = useState(
    Array.from({ length: dewasa }, () => ({
      title: '',
      type: 'Dewasa',
      namaLengkap: '',
      isSwitchOn: false,
      namaKeluarga: '',
      tanggalLahir: '',
      kewarganegaraan: '',
      ktpPas: '',
      negaraPenerbit: '',
      berlakuSampai: '',
    })),
  )

  const [dataPenumpangAnak, setDataPenumpangAnak] = useState(
    Array.from({ length: anak }, () => ({
      title: '',
      type: 'Anak',
      namaLengkap: '',
      isSwitchOn: false,
      namaKeluarga: '',
      tanggalLahir: '',
      kewarganegaraan: '',
      ktpPas: '',
      negaraPenerbit: '',
      berlakuSampai: '',
    })),
  )
  const [passengerData, setPassengerData] = useState([
    ...dataPenumpangDewasa,
    ...dataPenumpangAnak,
  ])
  const [order, setOrder] = useState(
    Array.from({ length: passengerData.length }, (_, index) => ({
      seatId: [],
      type: '',
      title: '',
      name: '',
      familyName: '',
      dateOfBirth: '',
      nationality: '',
      identifierNumber: '',
      issuedCountry: '',
      idValidUntil: '',
    })),
  )
  const handleInputChange = (index, field, value) => {
    const updatedData = [...passengerData]
    updatedData[index][field] = value
    setPassengerData(updatedData)
  }

  const handleSwitchChange = (index, value) => {
    const updatedData = [...passengerData]
    updatedData[index].isSwitchOn = value
    if (!value) updatedData[index].namaKeluarga = ''
    setPassengerData(updatedData)
  }

  const mutation = useMutation({
    mutationFn: (newData) => createOrder(newData),
    onSuccess: (result) => {
      navigate({
        to: '/checkout/completed',
        state: {
          orderId: result.data.id,
        },
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const handleClick = () => {
    setMessageLoading('Menyimpan Data Order....')
    setIsLoading(true)
    const updatedOrder = order?.map((item, index) => ({
      ...item,
      type: passengerData[index]?.type,
      title: passengerData[index]?.title[0],
      name: passengerData[index]?.namaLengkap,
      familyName: passengerData[index]?.namaKeluarga,
      dateOfBirth: passengerData[index]?.tanggalLahir,
      nationality: passengerData[index]?.kewarganegaraan,
      identifierNumber: passengerData[index]?.ktpPas,
      issuedCountry: passengerData[index]?.negaraPenerbit[0],
      idValidUntil: passengerData[index]?.berlakuSampai,
      ...(selectedBerangkat.length > 0 && selectedBerangkat[index]?.id
        ? {
            seatId: [
              selectedBerangkat[index]?.id,
              ...(selectedTransit1Berangkat?.[index]?.id
                ? [selectedTransit1Berangkat[index]?.id]
                : []),
              ...(selectedTransit2Berangkat?.[index]?.id
                ? [selectedTransit2Berangkat[index]?.id]
                : []),
              ...(selectedPulang?.[index]?.id
                ? [selectedPulang[index]?.id]
                : []),
              ...(selectedTransit1Pulang?.[index?.id]
                ? [selectedTransit1Pulang[index]?.id]
                : []),
              ...(selectedTransit2Pulang?.[index?.id]
                ? [selectedTransit2Pulang[index]?.id]
                : []),
            ],
          }
        : {}),
    }))
    const dataOrder = {
      outboundTicketId: ticketId1,
      returnTicketId: ticketId2,
      finalPrice: totalTicketDewasa + totalTicketAnak,
      detailPrice: [
        ...(dewasa > 0
          ? [{ type: 'adult', amount: dewasa, totalPrice: totalTicketDewasa }]
          : []),
        ...(anak > 0
          ? [{ type: 'children', amount: anak, totalPrice: totalTicketAnak }]
          : []),
        ...(bayi > 0 ? [{ type: 'infant', amount: bayi, totalPrice: 0 }] : []),
      ],
      passengers: updatedOrder,
    }
    mutation.mutate(dataOrder)
  }

  const listTitle = createListCollection({
    items: [
      { label: 'Mr', value: 'Mr' },
      { label: 'Ms', value: 'Ms' },
    ],
  })
  const listCountry = createListCollection({
    items: [
      { label: 'Indonesia', value: 'Indonesia' },
      { label: 'Germany', value: 'Germany' },
      { label: 'Singapore', value: 'Singapore' },
      { label: 'USA', value: 'USA' },
      { label: 'Malaysia', value: 'Malaysia' },
      { label: 'Russia', value: 'Russia' },
      { label: 'Brazil', value: 'Brazil' },
      { label: 'Japan', value: 'Japan' },
      { label: 'China', value: 'China' },
      { label: 'Cambodia', value: 'Cambodia' },
      { label: 'Australia', value: 'Australia' },
      { label: 'India', value: 'India' },
      { label: 'United Kingdom', value: 'United Kingdom' },
      { label: 'France', value: 'France' },
      { label: 'Italy', value: 'Italy' },
      { label: 'Spain', value: 'Spain' },
      { label: 'South Korea', value: 'South Korea' },
      { label: 'Canada', value: 'Canada' },
      { label: 'Mexico', value: 'Mexico' },
      { label: 'Netherlands', value: 'Netherlands' },
      { label: 'Thailand', value: 'Thailand' },
      { label: 'Vietnam', value: 'Vietnam' },
      { label: 'Switzerland', value: 'Switzerland' },
      { label: 'Sweden', value: 'Sweden' },
      { label: 'Norway', value: 'Norway' },
      { label: 'Finland', value: 'Finland' },
      { label: 'Philippines', value: 'Philippines' },
      { label: 'New Zealand', value: 'New Zealand' },
      { label: 'South Africa', value: 'South Africa' },
      { label: 'Egypt', value: 'Egypt' },
      { label: 'Turkey', value: 'Turkey' },
      { label: 'Argentina', value: 'Argentina' },
      { label: 'Chile', value: 'Chile' },
      { label: 'Colombia', value: 'Colombia' },
      { label: 'Saudi Arabia', value: 'Saudi Arabia' },
      { label: 'United Arab Emirates', value: 'United Arab Emirates' },
      { label: 'Israel', value: 'Israel' },
      { label: 'Greece', value: 'Greece' },
      { label: 'Portugal', value: 'Portugal' },
    ],
  })

  useEffect(() => {
    if (timeLeft <= 0) {
      setOverlayVisible(true)
      setMessage('Waktu anda telah habis. Mohon untuk mencoba lagi!')
      setTujuan('/')
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setOverlayVisible(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const firstFlight = flightDetails[0]
  const secondFlight = flightDetails[1]
  let thirdFlight = null
  if (flightDetails.length > 2) {
    thirdFlight = flightDetails[2]
  }
  let firtsReturnFlight = null
  let secondReturnFlight = null
  let thirdReturnFlight = null
  if (flightDetails2.length > 0) {
    firtsReturnFlight = flightDetails2[0]
    secondReturnFlight = flightDetails2[1]
    if (flightDetails2.length > 2) {
      thirdReturnFlight = flightDetails2[2]
    }
  }
  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const checkDataCompleteness = () => {
    const hasIncompleteData = passengerData.some(
      (data) =>
        !data.namaLengkap ||
        !data.title ||
        !data.tanggalLahir ||
        !data.kewarganegaraan ||
        !data.negaraPenerbit ||
        !data.berlakuSampai,
    )

    if (hasIncompleteData) {
      setErrorMessage('Data Belum Lengkap, Harap Lengkapi Data Anda !!')
      setIsSaveDisabled(true)
    } else {
      setErrorMessage('')
      setIsSaveDisabled(false)
    }
  }

  useEffect(() => {
    checkDataCompleteness()
  }, [passengerData])
  return (
    <>
      <Loading isVisible={isLoading} message={messageLoading} />
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
                <BreadcrumbCurrentLink color="black" fontWeight="bold">
                  Isi Data Diri
                </BreadcrumbCurrentLink>
                <BreadcrumbLink color="grey" fontWeight="bold">
                  Bayar
                </BreadcrumbLink>
                <BreadcrumbLink color="grey" fontWeight="bold">
                  Selesai
                </BreadcrumbLink>
              </BreadcrumbRoot>
            </Stack>
            <Flex
              justifyContent="center"
              bg="red"
              color="white"
              p={3}
              borderRadius="lg"
              w={{ base: '100%', md: '92%' }}
              marginLeft={{ base: 0, md: 10 }}
            >
              <Text fontFamily="Inter, sans-serif">Selesaikan dalam </Text>
              <Text marginLeft={2}>{formattedTime}</Text>
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
                  minWidth={{ base: '100%', md: '33vw' }}
                  marginBottom={10}
                >
                  <Card.Header>
                    <Card.Title fontWeight="bold">
                      Isi Data Pemesanan
                    </Card.Title>
                  </Card.Header>
                  <Card.Body marginBottom={5}>
                    <Box bg="#3C3C3C" color="white" borderTopRadius="lg" h={10}>
                      <Text marginLeft={4} marginTop={2}>
                        Data Diri Pemesan
                      </Text>
                    </Box>
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
                        <Input value={email} disabled borderColor="gray.300" />
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
                    <Box>
                      {[...Array(passengerCount)].map((_, index) => (
                        <Box key={index} mb={6}>
                          <Box
                            bg="#3C3C3C"
                            color="white"
                            borderTopRadius="lg"
                            h={10}
                            mb={2}
                          >
                            <Text ml={4} pt={2}>
                              Data Diri Penumpang {index + 1} -{' '}
                              {passengerData[index].type}
                            </Text>
                          </Box>
                          <Stack gap="4" px={4} spacing={{ base: 2, md: 4 }}>
                            <SelectRoot
                              collection={listTitle}
                              value={passengerData[index].title}
                              onValueChange={(e) =>
                                handleInputChange(index, 'title', e.value)
                              }
                            >
                              <SelectLabel color="#006ec1">Title</SelectLabel>
                              <SelectTrigger>
                                <SelectValueText placeholder="Pilih Title" />
                              </SelectTrigger>
                              <SelectContent>
                                {listTitle.items.map((title) => (
                                  <SelectItem item={title} key={title.value}>
                                    {title.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectRoot>
                            <Field
                              color="#006ec1"
                              label="Nama Lengkap"
                              labelProps={{ fontWeight: 'bold' }}
                            >
                              <Input
                                placeholder="Masukkan Nama Lengkap"
                                value={passengerData[index].namaLengkap}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    'namaLengkap',
                                    e.target.value,
                                  )
                                }
                                borderColor="gray.300"
                              />
                            </Field>
                            <Stack
                              align="center"
                              justifyContent="space-between"
                              direction={{ base: 'column', sm: 'row' }}
                            >
                              <Text>Punya Nama Keluarga?</Text>
                              <Switch
                                colorPalette="blue"
                                isChecked={passengerData[index].isSwitchOn}
                                onChange={(e) =>
                                  handleSwitchChange(index, e.target.checked)
                                }
                              />
                            </Stack>
                            {passengerData[index].isSwitchOn && (
                              <Field
                                color="#006ec1"
                                label="Nama Keluarga"
                                labelProps={{ fontWeight: 'bold' }}
                              >
                                <Input
                                  placeholder="Masukkan Nama Keluarga"
                                  value={passengerData[index].namaKeluarga}
                                  onChange={(e) =>
                                    handleInputChange(
                                      index,
                                      'namaKeluarga',
                                      e.target.value,
                                    )
                                  }
                                  borderColor="gray.300"
                                />
                              </Field>
                            )}
                            <Field
                              color="#006ec1"
                              label="Tanggal Lahir"
                              labelProps={{ fontWeight: 'bold' }}
                            >
                              <CalendarComponent
                                value={passengerData[index].tanggalLahir}
                                onChange={(value) =>
                                  handleInputChange(
                                    index,
                                    'tanggalLahir',
                                    new Date(value).toISOString(),
                                  )
                                }
                              />
                            </Field>
                            <SelectRoot
                              collection={listCountry}
                              value={passengerData[index].kewarganegaraan}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  'kewarganegaraan',
                                  e.target.value,
                                )
                              }
                            >
                              <SelectLabel color="#006ec1">
                                Kewarganegaraan
                              </SelectLabel>
                              <SelectTrigger>
                                <SelectValueText placeholder="Pilih Negara" />
                              </SelectTrigger>
                              <SelectContent>
                                {listCountry.items.map((country) => (
                                  <SelectItem
                                    item={country}
                                    key={country.value}
                                  >
                                    {country.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectRoot>
                            <Field
                              color="#006ec1"
                              label="KTP/Paspor"
                              labelProps={{ fontWeight: 'bold' }}
                            >
                              <Input
                                placeholder="Masukkan Nomor KTP/Paspor"
                                value={passengerData[index].ktpPas}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    'ktpPas',
                                    e.target.value,
                                  )
                                }
                                borderColor="gray.300"
                                isInvalid={
                                  passengerData[index].ktpPas &&
                                  !/^\d{16}$/.test(passengerData[index].ktpPas)
                                }
                              />
                              {!/^\d{16}$/.test(
                                passengerData[index].ktpPas || '',
                              ) && (
                                <Text color="red.500" fontSize="sm" mt={1}>
                                  Nomor KTP/Paspor harus berupa angka dan
                                  terdiri dari 16 digit.
                                </Text>
                              )}
                            </Field>
                            <SelectRoot
                              collection={listCountry}
                              value={passengerData[index].negaraPenerbit}
                              onValueChange={(e) =>
                                handleInputChange(
                                  index,
                                  'negaraPenerbit',
                                  e.value,
                                )
                              }
                            >
                              <SelectLabel color="#006ec1">
                                Negara Penerbit
                              </SelectLabel>
                              <SelectTrigger>
                                <SelectValueText placeholder="Pilih Negara" />
                              </SelectTrigger>
                              <SelectContent>
                                {listCountry.items.map((country) => (
                                  <SelectItem
                                    item={country}
                                    key={country.value}
                                  >
                                    {country.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectRoot>
                            <Field
                              color="#006ec1"
                              label="Berlaku Sampai"
                              labelProps={{ fontWeight: 'bold' }}
                            >
                              <CalendarComponent
                                value={passengerData[index].berlakuSampai}
                                onChange={(date) =>
                                  handleInputChange(
                                    index,
                                    'berlakuSampai',
                                    new Date(date).toISOString(),
                                  )
                                }
                              />
                            </Field>
                          </Stack>
                        </Box>
                      ))}
                    </Box>
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
                  {kelas === 'Economy' && (
                    <SeatPickerEkonomi
                      setSelected={setSelectedBerangkat}
                      data={someData}
                      seat={seatBerangkat}
                      bookedSeats={bookedSeatBerangkat}
                      selectedSeats={[]}
                    />
                  )}
                  {kelas === 'Premium+Economy' && (
                    <SeatPickerPremiumEkonomi
                      setSelected={setSelectedBerangkat}
                      data={someData}
                      seat={seatBerangkat}
                      bookedSeats={bookedSeatBerangkat}
                      selectedSeats={[]}
                    />
                  )}
                  {kelas === 'Business' && (
                    <SeatPickerBisnis
                      setSelected={setSelectedBerangkat}
                      data={someData}
                      seat={seatBerangkat}
                      bookedSeats={bookedSeatBerangkat}
                      selectedSeats={[]}
                    />
                  )}
                  {kelas == 'First+Class' && (
                    <SeatPickerEksekutif
                      setSelected={setSelectedBerangkat}
                      data={someData}
                      seat={seatBerangkat}
                      bookedSeats={bookedSeatBerangkat}
                      selectedSeats={[]}
                    />
                  )}
                  {ticketData?.isTransits === true && (
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
                      {kelas === 'Economy' && (
                        <SeatPickerEkonomi
                          setSelected={setSelectedTransit1Berangkat}
                          data={someData}
                          seat={seatTransit1Berangkat}
                          bookedSeats={bookedSeatTransit1Berangkat}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Premium+Economy' && (
                        <SeatPickerPremiumEkonomi
                          setSelected={setSelectedTransit1Berangkat}
                          data={someData}
                          seat={seatTransit1Berangkat}
                          bookedSeats={bookedSeatTransit1Berangkat}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Business' && (
                        <SeatPickerBisnis
                          setSelected={setSelectedTransit1Berangkat}
                          data={someData}
                          seat={seatTransit1Berangkat}
                          bookedSeats={bookedSeatTransit1Berangkat}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas == 'First+Class' && (
                        <SeatPickerEksekutif
                          setSelected={setSelectedTransit1Berangkat}
                          data={someData}
                          seat={seatTransit1Berangkat}
                          bookedSeats={bookedSeatTransit1Berangkat}
                          selectedSeats={[]}
                        />
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
                      {kelas === 'Economy' && (
                        <SeatPickerEkonomi
                          setSelected={setSelectedTransit2Berangkat}
                          data={someData}
                          seat={seatTransit2Berangkat}
                          bookedSeats={bookedSeatTransit2Berangkat}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Premium+Economy' && (
                        <SeatPickerPremiumEkonomi
                          setSelected={setSelectedTransit2Berangkat}
                          data={someData}
                          seat={seatTransit2Berangkat}
                          bookedSeats={bookedSeatTransit2Berangkat}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Business' && (
                        <SeatPickerBisnis
                          setSelected={setSelectedTransit2Berangkat}
                          data={someData}
                          seat={seatTransit2Berangkat}
                          bookedSeats={bookedSeatTransit2Berangkat}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas == 'First+Class' && (
                        <SeatPickerEksekutif
                          setSelected={setSelectedTransit2Berangkat}
                          data={someData}
                          seat={seatTransit2Berangkat}
                          bookedSeats={bookedSeatTransit2Berangkat}
                          selectedSeats={[]}
                        />
                      )}
                    </>
                  )}
                  {ticketData2 && (
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
                      {kelas === 'Economy' && (
                        <SeatPickerEkonomi
                          setSelected={setSelectedPulang}
                          data={someData}
                          seat={seatPulang}
                          bookedSeats={bookedSeatPulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Premium+Economy' && (
                        <SeatPickerPremiumEkonomi
                          setSelected={setSelectedPulang}
                          data={someData}
                          seat={seatPulang}
                          bookedSeats={bookedSeatPulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Business' && (
                        <SeatPickerBisnis
                          setSelected={setSelectedPulang}
                          data={someData}
                          seat={seatPulang}
                          bookedSeats={bookedSeatPulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas == 'First+Class' && (
                        <SeatPickerEksekutif
                          setSelected={setSelectedPulang}
                          data={someData}
                          seat={seatPulang}
                          bookedSeats={bookedSeatPulang}
                          selectedSeats={[]}
                        />
                      )}
                    </>
                  )}
                  {ticketData2?.isTransits === true && (
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
                      {kelas === 'Economy' && (
                        <SeatPickerEkonomi
                          setSelected={setSelectedTransit1Pulang}
                          data={someData}
                          seat={seatTransit1Pulang}
                          bookedSeats={bookedSeatTransit1Pulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Premium+Economy' && (
                        <SeatPickerPremiumEkonomi
                          setSelected={setSelectedTransit1Pulang}
                          data={someData}
                          seat={seatTransit1Pulang}
                          bookedSeats={bookedSeatTransit1Pulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Business' && (
                        <SeatPickerBisnis
                          setSelected={setSelectedTransit1Pulang}
                          data={someData}
                          seat={seatTransit1Pulang}
                          bookedSeats={bookedSeatTransit1Pulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas == 'First+Class' && (
                        <SeatPickerEksekutif
                          setSelected={setSelectedTransit1Pulang}
                          data={someData}
                          seat={seatTransit1Pulang}
                          bookedSeats={bookedSeatTransit1Pulang}
                          selectedSeats={[]}
                        />
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
                      {kelas === 'Economy' && (
                        <SeatPickerEkonomi
                          setSelected={setSelectedTransit2Pulang}
                          data={someData}
                          seat={seatTransit2Pulang}
                          bookedSeats={bookedSeatTransit2Pulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Premium+Economy' && (
                        <SeatPickerPremiumEkonomi
                          setSelected={setSelectedTransit2Pulang}
                          data={someData}
                          seat={seatTransit2Pulang}
                          bookedSeats={bookedSeatTransit2Pulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas === 'Business' && (
                        <SeatPickerBisnis
                          setSelected={setSelectedTransit2Pulang}
                          data={someData}
                          seat={seatTransit2Pulang}
                          bookedSeats={bookedSeatTransit2Pulang}
                          selectedSeats={[]}
                        />
                      )}
                      {kelas == 'First+Class' && (
                        <SeatPickerEksekutif
                          setSelected={setSelectedTransit2Pulang}
                          data={someData}
                          seat={seatTransit2Pulang}
                          bookedSeats={bookedSeatTransit2Pulang}
                          selectedSeats={[]}
                        />
                      )}
                    </>
                  )}
                  <Box height={5} />
                </Card.Root>
                {}
                <Button
                  colorPalette={'blue'}
                  width="100%"
                  borderRadius="lg"
                  onClick={handleClick}
                  disabled={isSaveDisabled}
                >
                  Simpan
                </Button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              </Box>
              <Box>
                <Card.Root
                  maxW="sm"
                  bg="white"
                  color="black"
                  w="100%"
                  minWidth="30vw"
                  marginBottom={10}
                  border="none"
                >
                  <Card.Header>
                    <Card.Title fontWeight="bold" color="blue">
                      Detail Penerbangan Berangkat
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    {!flightDetails && (
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        height="100vh"
                        bg="gray.100"
                      >
                        <Spinner size="xl" color="teal.500" />
                        <Text
                          ml={4}
                          fontSize="lg"
                          color="gray.700"
                          fontFamily="Inter, sans-serif"
                        >
                          Memuat Data Penerbangan...
                        </Text>
                      </Flex>
                    )}
                    {!!flightDetails && (
                      <>
                        <Flex justifyContent="space-between">
                          <Text fontWeight="bold">
                            {new Date(
                              firstFlight?.departure.time,
                            ).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZone: 'UTC',
                            })}
                          </Text>
                          <Text color="blue.400" fontWeight="bold">
                            Keberangkatan
                          </Text>
                        </Flex>
                        <Text>
                          {new Date(
                            firstFlight?.departure.time,
                          ).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </Text>
                        <Text fontWeight="bolder">
                          {firstFlight?.departure.airport.name} -{' '}
                          {firstFlight?.departure.terminal.name}{' '}
                          {firstFlight?.departure.terminal.type}
                        </Text>
                        <Box
                          borderBottom="2px solid"
                          borderColor="gray.200"
                          marginTop={3}
                        />
                        <Flex direction="column" marginLeft={7} marginTop={3}>
                          <Text fontWeight="bold">
                            {firstFlight?.airplane} - {ticketData?.class}
                          </Text>
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
                          <Text>
                            Cabin baggage {firstFlight?.cabinBaggage} Kg
                          </Text>
                          {firstFlight?.entertainment === true && (
                            <Text>In Flight Entertainment</Text>
                          )}
                        </Flex>
                        <Box
                          borderBottom="2px solid"
                          borderColor="gray.200"
                          marginTop={3}
                          marginBottom={3}
                        />
                        <Flex justifyContent="space-between">
                          <Text fontWeight="bold">
                            {new Date(
                              firstFlight?.arrival.time,
                            ).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZone: 'UTC',
                            })}
                          </Text>
                          <Text color="blue.400" fontWeight="bold">
                            Kedatangan
                          </Text>
                        </Flex>
                        <Text>
                          {new Date(
                            firstFlight?.arrival.time,
                          ).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </Text>
                        <Text fontWeight="bolder">
                          {firstFlight?.arrival.airport.name} -{' '}
                          {firstFlight?.arrival.terminal.name}{' '}
                          {firstFlight?.arrival.terminal.type}
                        </Text>
                        {!!secondFlight && (
                          <>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                              marginBottom={5}
                            />
                            <Text
                              fontWeight="bold"
                              marginBottom={5}
                              color="blue"
                              fontSize="lg"
                            >
                              Detail Penerbangan Berangkat (Transit Pertama)
                            </Text>
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  secondFlight?.departure.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                secondFlight?.departure.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {secondFlight?.departure.airport.name} -{' '}
                              {secondFlight?.departure.terminal.name}{' '}
                              {secondFlight?.departure.terminal.type}
                            </Text>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                            />
                            <Flex
                              direction="column"
                              marginLeft={7}
                              marginTop={3}
                            >
                              <Text fontWeight="bold">
                                {secondFlight?.airplane} - {ticketData?.class}
                              </Text>
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
                              <Text>
                                Cabin baggage {secondFlight?.cabinBaggage} Kg
                              </Text>
                              {secondFlight?.entertainment === true && (
                                <Text>In Flight Entertainment</Text>
                              )}
                            </Flex>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                              marginBottom={3}
                            />
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  secondFlight?.arrival.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Kedatangan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                secondFlight?.arrival.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {secondFlight?.arrival.airport.name} -{' '}
                              {secondFlight?.arrival.terminal.name}{' '}
                              {secondFlight?.arrival.terminal.type}
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
                            <Text
                              fontWeight="bold"
                              marginBottom={5}
                              color="blue"
                              fontSize="lg"
                            >
                              Detail Penerbangan Berangkat (Transit Kedua)
                            </Text>
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  thirdFlight?.departure.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                thirdFlight?.departure.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {thirdFlight?.departure.airport.name} -{' '}
                              {thirdFlight?.departure.terminal.name}{' '}
                              {thirdFlight?.departure.terminal.type}
                            </Text>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                            />
                            <Flex
                              direction="column"
                              marginLeft={7}
                              marginTop={3}
                            >
                              <Text fontWeight="bold">
                                {thirdFlight?.airplane} - {ticketData?.class}
                              </Text>
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
                              <Text>
                                Cabin baggage {thirdFlight?.cabinBaggage} Kg
                              </Text>
                              {thirdFlight?.entertainment === true && (
                                <Text>In Flight Entertainment</Text>
                              )}
                            </Flex>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                              marginBottom={3}
                            />
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  thirdFlight?.arrival.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Kedatangan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                thirdFlight?.arrival.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {thirdFlight?.arrival.airport.name} -{' '}
                              {thirdFlight?.arrival.terminal.name}{' '}
                              {thirdFlight?.arrival.terminal.type}
                            </Text>
                          </>
                        )}
                        {ticketData2 && (
                          <>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                              marginBottom={5}
                            />
                            <Text
                              fontWeight="bold"
                              marginBottom={5}
                              color="blue"
                              fontSize="lg"
                            >
                              Detail Penerbangan Pulang
                            </Text>
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  firtsReturnFlight?.departure.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                firtsReturnFlight?.departure.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {firtsReturnFlight?.departure.airport.name} -{' '}
                              {firtsReturnFlight?.departure.terminal.name}{' '}
                              {firtsReturnFlight?.departure.terminal.type}
                            </Text>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                            />
                            <Flex
                              direction="column"
                              marginLeft={7}
                              marginTop={3}
                            >
                              <Text fontWeight="bold">
                                {firtsReturnFlight?.airplane} -{' '}
                                {ticketData?.class}
                              </Text>
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
                              <Text>
                                Baggage {firtsReturnFlight?.baggage} Kg
                              </Text>
                              <Text>
                                Cabin baggage {firtsReturnFlight?.cabinBaggage}{' '}
                                Kg
                              </Text>
                              {firtsReturnFlight?.entertainment === true && (
                                <Text>In Flight Entertainment</Text>
                              )}
                            </Flex>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                              marginBottom={3}
                            />
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  firtsReturnFlight?.arrival.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Kedatangan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                firtsReturnFlight?.arrival.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {firtsReturnFlight?.arrival.airport.name} -{' '}
                              {firtsReturnFlight?.arrival.terminal.name}{' '}
                              {firtsReturnFlight?.arrival.terminal.type}
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
                            <Text
                              fontWeight="bold"
                              marginBottom={5}
                              color="blue"
                              fontSize="lg"
                            >
                              Detail Penerbangan Pulang (Transit Pertama)
                            </Text>
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  secondReturnFlight?.departure.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                secondReturnFlight?.departure.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {secondReturnFlight?.departure.airport.name} -{' '}
                              {secondReturnFlight?.departure.terminal.name}{' '}
                              {secondReturnFlight?.departure.terminal.type}
                            </Text>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                            />
                            <Flex
                              direction="column"
                              marginLeft={7}
                              marginTop={3}
                            >
                              <Text fontWeight="bold">
                                {secondReturnFlight?.airplane} -{' '}
                                {ticketData?.class}
                              </Text>
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
                              <Text>
                                Baggage {secondReturnFlight?.baggage} Kg
                              </Text>
                              <Text>
                                Cabin baggage {secondReturnFlight?.cabinBaggage}{' '}
                                Kg
                              </Text>
                              {secondReturnFlight?.entertainment === true && (
                                <Text>In Flight Entertainment</Text>
                              )}
                            </Flex>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                              marginBottom={3}
                            />
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  secondReturnFlight?.arrival.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Kedatangan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                secondReturnFlight?.arrival.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {secondReturnFlight?.arrival.airport.name} -{' '}
                              {secondReturnFlight?.arrival.terminal.name}{' '}
                              {secondReturnFlight?.arrival.terminal.type}
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
                            <Text
                              fontWeight="bold"
                              marginBottom={5}
                              color="blue"
                              fontSize="lg"
                            >
                              Detail Penerbangan Pulang (Transit Kedua)
                            </Text>
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  thirdReturnFlight?.departure.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Keberangkatan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                thirdReturnFlight?.departure.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {thirdReturnFlight?.departure.airport.name} -{' '}
                              {thirdReturnFlight?.departure.terminal.name}{' '}
                              {thirdReturnFlight?.departure.terminal.type}
                            </Text>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                            />
                            <Flex
                              direction="column"
                              marginLeft={7}
                              marginTop={3}
                            >
                              <Text fontWeight="bold">
                                {thirdReturnFlight?.airplane} -{' '}
                                {ticketData?.class}
                              </Text>
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
                              <Text>
                                Baggage {thirdReturnFlight?.baggage} Kg
                              </Text>
                              <Text>
                                Cabin baggage {thirdReturnFlight?.cabinBaggage}{' '}
                                Kg
                              </Text>
                              {thirdReturnFlight?.entertainment === true && (
                                <Text>In Flight Entertainment</Text>
                              )}
                            </Flex>
                            <Box
                              borderBottom="2px solid"
                              borderColor="gray.200"
                              marginTop={3}
                              marginBottom={3}
                            />
                            <Flex justifyContent="space-between">
                              <Text fontWeight="bold">
                                {new Date(
                                  thirdReturnFlight?.arrival.time,
                                ).toLocaleTimeString('id-ID', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  timeZone: 'UTC',
                                })}
                              </Text>
                              <Text color="blue.400" fontWeight="bold">
                                Kedatangan
                              </Text>
                            </Flex>
                            <Text>
                              {new Date(
                                thirdReturnFlight?.arrival.time,
                              ).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </Text>
                            <Text fontWeight="bolder">
                              {thirdReturnFlight?.arrival.airport.name} -{' '}
                              {thirdReturnFlight?.arrival.terminal.name}{' '}
                              {thirdReturnFlight?.arrival.terminal.type}
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
                              maximumFractionDigits: 0,
                            })
                              .format(totalTicketDewasa)
                              .replace('Rp', 'IDR')}
                          </Text>
                        </Flex>
                        <Flex justifyContent="space-between" marginTop={1}>
                          <Text>{anak} Anak</Text>
                          <Text>
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                              .format(totalTicketAnak)
                              .replace('Rp', 'IDR')}
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
                          <Text
                            fontWeight="bold"
                            fontSize="larger"
                            color="blue"
                          >
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: 'IDR',
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })
                              .format(totalTicketDewasa + totalTicketAnak)
                              .replace('Rp', 'IDR')}
                          </Text>
                        </Flex>
                      </>
                    )}
                  </Card.Body>
                </Card.Root>
              </Box>
            </Grid>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

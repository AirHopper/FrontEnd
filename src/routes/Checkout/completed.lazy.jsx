import * as React from 'react'
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from "react";
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
} from '@chakra-ui/react';
import Navbar from '../../components/Buyer/NavBar/checkout.lazy'
import CalendarComponent from '../../components/Buyer/Calendar/CalendarComponent.jsx';
import '../../components/Buyer/Calendar/Calendarcss.css'
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb"
import { Field } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"
import {
  faSun,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SeatPicker from "../../components/Buyer/Seat/seatEkonomi.lazy.jsx"

export const Route = createLazyFileRoute('/Checkout/completed')({
  component: CheckoutCompleted,
})

function CheckoutCompleted() {
  const navigate = useNavigate();
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isSwitchOnPerson1, setIsSwitchOnPerson1] = useState(false);
  const [isSwitchOnPerson2, setIsSwitchOnPerson2] = useState(false);
  const [namaLengkap, setNamaLengkap] = useState("");
  const [namaKeluarga, setNamaKeluarga] = useState("");
  const [nomorTelepon, setNomorTelepon] = useState(""); 
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [KtpPas, setKtpPas] = useState("");
  const [country, setCountry] = useState("");
  const [selected, setSelected] = React.useState(null);

  const handleClick = () => {
    navigate({to:'/checkout/completed'});
  };
  const listTitle = createListCollection({
    items: [
      { label: "Mr.", value: "Mr." },
      { label: "Mrs.", value: "Mrs." },
      { label: "Dr.", value: "Dr." },
      { label: "Prof.", value: "Prof." },
    ],
  })
  const listCountry = createListCollection({
    items: [
      { label: "Indonesia", value: "Indonesia" },
      { label: "Germany", value: "Germany" },
      { label: "Singapore", value: "Singapore" },
      { label: "USA", value: "USA" },
    ],
  })

  return (
    <>
      <Navbar/>
      <Box bg="white" px={4}>
        <Flex w="100%" alignItems="center" justifyContent="center" direction="column" borderBottom="2px solid" borderColor="gray.100">
          <Flex w="75%" direction="column" marginBottom={5}>
            <Stack color="black" marginTop={10} marginLeft={30} marginBottom={5}>
              <BreadcrumbRoot size="lg">
                <BreadcrumbLink href="/checkout" color="black" fontWeight="bold">Isi Data Diri</BreadcrumbLink>
                <BreadcrumbCurrentLink color="black" fontWeight="bold">Bayar</BreadcrumbCurrentLink>
                <BreadcrumbLink href="#" color="grey" fontWeight="bold">Selesai</BreadcrumbLink>
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
              <Text fontFamily="Inter, sans-serif">Data Anda berhasil tersimpan!</Text>
            </Flex>
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
                <Card.Root maxW="sm" bg="white" color="black" w="100%" minWidth="33vw" marginBottom={10}>
                  <Card.Header>
                    <Card.Title fontWeight="bold">Isi Data Pemesanan</Card.Title>
                  </Card.Header>
                  <Card.Body marginBottom={5}>
                    <Flex bg="#3C3C3C" color="white" borderTopRadius="lg" h={10} justifyContent="space-between">
                      <Text marginLeft={4} marginTop={2}>Data Diri Pemesan</Text>                  
                      <Box marginTop={2} marginRight={5}>
                        <FontAwesomeIcon icon={faCircleCheck} color='#73CA5C' size='lg'/>
                      </Box>
                    </Flex>
                    <Stack gap="4" px={4} marginTop={2}>
                      <Field color="#4B1979" label="Nama Lengkap" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          placeholder="Masukkan Nama Lengkap Anda"
                          value={namaLengkap}
                          onChange={(e) => setNamaLengkap(e.target.value)}
                          borderColor="gray.300"
                        />
                      </Field>
                      <Stack
                        align="center"
                        justifyContent="space-between"
                        direction="row"
                      >
                        <Text minW="8ch">Punya Nama Keluarga?</Text>
                        <Switch 
                        colorPalette="purple"
                        onChange={(e)=>setIsSwitchOn(e.target.checked)}
                        />
                      </Stack>
                      {isSwitchOn && (  
                        <Field color="#4B1979" label="Nama Keluarga" labelProps={{ fontWeight: "bold" }}>
                          <Input 
                            placeholder="Masukkan Nama Keluarga Anda"
                            value={namaKeluarga}
                            onChange={(e) => setNamaKeluarga(e.target.value)}
                            borderColor="gray.300"
                          />
                        </Field>
                      )}
                      <Field color="#4B1979" label="Nomor Telepon" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          placeholder="Masukkan Nomor Telepon Anda"
                          value={nomorTelepon}
                          onChange={(e) => setNomorTelepon(e.target.value)}
                          borderColor="gray.300"
                        />
                      </Field>
                      <Field color="#4B1979" label="Email" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          placeholder="Contoh: joeferdinan@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          borderColor="gray.300"
                        />
                      </Field>
                    </Stack>
                  </Card.Body>
                </Card.Root>
                <Card.Root maxW="sm" bg="white" color="black" w="100%" minWidth="33vw" marginBottom={10}>
                  <Card.Header>
                    <Card.Title fontWeight="bold">Isi Data Penumpang</Card.Title>
                  </Card.Header>
                  <Card.Body marginBottom={5}>
                    <Flex bg="#3C3C3C" color="white" borderTopRadius="lg" h={10} justifyContent="space-between">
                      <Text marginLeft={4} marginTop={2}>Data Diri Penumpang 1 - Adult</Text>
                      <Box marginTop={2} marginRight={5}>
                        <FontAwesomeIcon icon={faCircleCheck} color='#73CA5C' size='lg'/>
                      </Box>
                    </Flex>
                    <Stack gap="4" px={4} marginTop={2}>
                      <SelectRoot
                        collection={listTitle}
                        value={title}
                        onValueChange={(e) => setTitle(e.value)}
                      >
                        <SelectLabel color="#4B1979">Title</SelectLabel>
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
                      <Field color="#4B1979" label="Nama Lengkap" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          placeholder="Masukkan Nama Lengkap Anda"
                          value={namaLengkap}
                          onChange={(e) => setNamaLengkap(e.target.value)}
                          borderColor="gray.300"
                        />
                      </Field>
                      <Stack
                        align="center"
                        justifyContent="space-between"
                        direction="row"
                      >
                        <Text minW="8ch">Punya Nama Keluarga?</Text>
                        <Switch 
                        colorPalette="purple"
                        onChange={(e)=>setIsSwitchOnPerson1(e.target.checked)}
                        />
                      </Stack>
                      {isSwitchOnPerson1 && (  
                        <Field color="#4B1979" label="Nama Keluarga" labelProps={{ fontWeight: "bold" }}>
                          <Input 
                            placeholder="Masukkan Nama Keluarga Anda"
                            value={namaKeluarga}
                            onChange={(e) => setNamaKeluarga(e.target.value)}
                            borderColor="gray.300"
                          />
                        </Field>
                      )}
                      <Field color="#4B1979" label="Tanggal Lahir" labelProps={{ fontWeight: "bold" }}>
                        <CalendarComponent/>
                      </Field>
                      <Field color="#4B1979" label="Kewarganegaraan" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          color="black"
                          value="Indonesia"
                          borderColor="gray.300"
                        />
                      </Field>
                      <Field color="#4B1979" label="KTP/Paspor" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          placeholder='Masukkan Nomor KTP/Paspor'
                          value={KtpPas}
                          onChange={(e)=>setKtpPas(e.target.value)}
                          borderColor="gray.300"
                        />
                      </Field>
                      <SelectRoot
                        collection={listCountry}
                        value={country}
                        onValueChange={(e) => setCountry(e.value)}
                      >
                        <SelectLabel color="#4B1979">Negara Penerbit</SelectLabel>
                        <SelectTrigger>
                          <SelectValueText placeholder="Pilih Negara" />
                        </SelectTrigger>
                        <SelectContent>
                          {listCountry.items.map((country) => (
                            <SelectItem item={country} key={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                      <Field color="#4B1979" label="Berlaku Sampai" labelProps={{ fontWeight: "bold" }}>
                        <CalendarComponent/>
                      </Field>
                    </Stack>
                    <Flex bg="#3C3C3C" color="white" borderTopRadius="lg" h={10} marginTop={5} justifyContent="space-between">
                      <Text marginLeft={4} marginTop={2}>Data Diri Penumpang 2 - Adult</Text>
                      <Box marginTop={2} marginRight={5}>
                        <FontAwesomeIcon icon={faCircleCheck} color='#73CA5C' size='lg'/>
                      </Box>
                    </Flex>
                    <Stack gap="4" px={4} marginTop={2}>
                      <SelectRoot
                        collection={listTitle}
                        value={title}
                        onValueChange={(e) => setTitle(e.value)}
                      >
                        <SelectLabel color="#4B1979">Title</SelectLabel>
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
                      <Field color="#4B1979" label="Nama Lengkap" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          placeholder="Masukkan Nama Lengkap Anda"
                          value={namaLengkap}
                          onChange={(e) => setNamaLengkap(e.target.value)}
                          borderColor="gray.300"
                        />
                      </Field>
                      <Stack
                        align="center"
                        justifyContent="space-between"
                        direction="row"
                      >
                        <Text minW="8ch">Punya Nama Keluarga?</Text>
                        <Switch 
                        colorPalette="purple"
                        onChange={(e)=>setIsSwitchOnPerson2(e.target.checked)}
                        />
                      </Stack>
                      {isSwitchOnPerson2 && (  
                        <Field color="#4B1979" label="Nama Keluarga" labelProps={{ fontWeight: "bold" }}>
                          <Input 
                            placeholder="Masukkan Nama Keluarga Anda"
                            value={namaKeluarga}
                            onChange={(e) => setNamaKeluarga(e.target.value)}
                            borderColor="gray.300"
                          />
                        </Field>
                      )}
                      <Field color="#4B1979" label="Tanggal Lahir" labelProps={{ fontWeight: "bold" }}>
                        <CalendarComponent/>
                      </Field>
                      <Field color="#4B1979" label="Kewarganegaraan" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          color="black"
                          value="Indonesia"
                          borderColor="gray.300"
                        />
                      </Field>
                      <Field color="#4B1979" label="KTP/Paspor" labelProps={{ fontWeight: "bold" }}>
                        <Input 
                          placeholder='Masukkan Nomor KTP/Paspor'
                          value={KtpPas}
                          onChange={(e)=>setKtpPas(e.target.value)}
                          borderColor="gray.300"
                        />
                      </Field>
                      <SelectRoot
                        collection={listCountry}
                        value={country}
                        onValueChange={(e) => setCountry(e.value)}
                      >
                        <SelectLabel color="#4B1979">Negara Penerbit</SelectLabel>
                        <SelectTrigger>
                          <SelectValueText placeholder="Pilih Negara" />
                        </SelectTrigger>
                        <SelectContent>
                          {listCountry.items.map((country) => (
                            <SelectItem item={country} key={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                      <Field color="#4B1979" label="Berlaku Sampai" labelProps={{ fontWeight: "bold" }}>
                        <CalendarComponent/>
                      </Field>
                    </Stack>
                  </Card.Body>
                </Card.Root>
                <Card.Root maxW="sm" bg="white" color="black" w="100%" minWidth="33vw" marginBottom={8} minHeight="20vw">
                  <Text fontWeight="bold" marginLeft={5} marginTop={5} marginBottom={5}>Pilih Kursi Berangkat</Text>
                  <Flex justifyContent="space-between" bg="#3C3C3C" color="white" p={2} borderRadius="md" w="92%" marginLeft={5}>
                    <Text fontFamily="Inter, sans-serif" marginLeft={3}>Economy - 2 Seats Chosen</Text>
                    <Box marginRight={5}>
                      <FontAwesomeIcon icon={faCircleCheck} color='#73CA5C' size='lg'/>
                    </Box>
                  </Flex>
                  <SeatPicker setSelected={setSelected}/>
                  <Box height={5}/>
                  <Text fontWeight="bold" marginLeft={5} marginTop={5} marginBottom={5}>Pilih Kursi Pulang</Text>
                  <Flex justifyContent="space-between" bg="#3C3C3C" color="white" p={2} borderRadius="md" w="92%" marginLeft={5}>
                    <Text fontFamily="Inter, sans-serif" marginLeft={3}>Economy - 2 Seats Chosen</Text>
                    <Box marginRight={5}>
                      <FontAwesomeIcon icon={faCircleCheck} color='#73CA5C' size='lg'/>
                    </Box>
                  </Flex>
                  <SeatPicker setSelected={setSelected}/>
                  <Box height={5}/>
                </Card.Root>
                <Flex justifyContent="center" bg="gray.300" color="white" p={2} borderRadius="md" w="100%">
                  <Text fontFamily="Inter, sans-serif">Simpan</Text>
                </Flex>
              </Box>
              <Box>
                <Card.Root maxW="sm" bg="white" color="black" w="100%" minWidth="30vw" border='none'>
                  <Card.Header>
                    <Card.Title fontWeight="bold">Detail Penerbangan</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold">07:00</Text>
                      <Text color="purple.400" fontWeight="bold">Keberangkatan</Text>
                    </Flex>
                    <Text>3 Maret 2023</Text>
                    <Text fontWeight="bolder">Soekarno Hatta - Terminal 1A Domestik</Text>
                    <Box borderBottom="2px solid" borderColor="gray.200" marginTop={3}/>
                    <Flex direction="column" marginLeft={7} marginTop={3}>
                      <Text fontWeight="bold">Jet Air - Economy</Text>
                      <Text fontWeight="bold">JT - 203</Text>
                    </Flex>
                    <Flex align="center" marginTop={3}>
                      <FontAwesomeIcon icon={faSun} color='orange' marginLeft={1}/>
                      <Text fontWeight="bold" marginLeft={3}>Informasi :</Text>
                    </Flex>
                    <Flex marginLeft={7} direction="column">
                      <Text>Baggage 20 Kg</Text>
                      <Text>Cabin baggage 7 Kg</Text>
                      <Text>In Flight Entertainment</Text>
                    </Flex>
                    <Box borderBottom="2px solid" borderColor="gray.200" marginTop={3} marginBottom={3}/>
                    <Flex justifyContent="space-between">
                      <Text fontWeight="bold">11:00</Text>
                      <Text color="purple.400" fontWeight="bold">Kedatangan</Text>
                    </Flex>
                    <Text>3 Maret 2023</Text>
                    <Text fontWeight="bolder">Melbourne International Airport</Text>
                    <Box borderBottom="2px solid" borderColor="gray.200" marginTop={3} marginBottom={3}/>
                    <Text fontWeight="bold">Rincian Harga</Text>
                    <Flex justifyContent="space-between" marginTop={1}>
                      <Text>2 Adults</Text>
                      <Text>IDR 9.550.000</Text>
                    </Flex>
                    <Flex justifyContent="space-between" marginTop={1}>
                      <Text>1 Baby</Text>
                      <Text>IDR 0</Text>
                    </Flex>
                    <Flex justifyContent="space-between" marginTop={1}>
                      <Text>Tax</Text>
                      <Text>IDR 300.000</Text>
                    </Flex>
                    <Box borderBottom="2px solid" borderColor="gray.200" marginTop={2} marginBottom={3}/>
                    <Flex justifyContent="space-between" marginTop={1}>
                      <Text fontWeight="bold" fontSize="larger">Total</Text>
                      <Text fontWeight="bold" fontSize="larger" color="#4B1979">IDR 9.850.000</Text>
                    </Flex>
                  </Card.Body>
                  <Button colorPalette="red" width="92%" borderRadius="lg" size="xl" marginLeft={5} onClick={handleClick}>Lanjut Bayar</Button>
                </Card.Root>
              </Box>
            </Grid>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

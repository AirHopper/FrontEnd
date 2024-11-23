import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import {
  Box,
  Text,
  Image,
  Flex,
  Center,
  Container,
  Input,
  Grid,
  GridItem,
  IconButton,
  Heading,
  Highlight,
  Fieldset,
} from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { Field } from "../components/ui/field";
import { Banner } from "../assets/img";
import {
  faCalendarDays,
  faPerson,
  faPlaneDeparture,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Route = createLazyFileRoute("/")({
  component: Beranda,
});

function Beranda() {
  return (
    <Container maxWidth="container.lg" mx="auto" py={8}>
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Flex justifyContent="center" alignItems="center" zIndex={-10}>
          <Box
            width="90vw"
            color="white"
            position="relative"
            overflow="hidden"
            borderRadius={10}
          >
            <Box bgColor="#ffec99" width="32vw" padding={12}>
              <Heading
                size="4xl"
                fontWeight="extrabold"
                fontStyle="italic"
                color="black"
              >
                Diskon Hari Ini
              </Heading>
              <Heading mt={1} size="4xl" fontWeight="extrabold" color="#2078b8">
                85%!
              </Heading>
            </Box>

            <Image
              src={Banner}
              alt="Banner Background"
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              objectFit="cover"
              zIndex={-1}
            />
            <Box
              position="absolute"
              top="0"
              left="32vw"
              w="35vw"
              h="full"
              bg="linear-gradient(to right, #ffec99, transparent)"
            />
          </Box>

          <Center
            bgGradient="to-r"
            gradientFrom="#44b3f8"
            gradientTo="#70caff"
            color="white"
            textAlign="center"
            width="100%"
            height="20vh"
            py={10}
            zIndex={-10}
            position="absolute"
            overflow="hidden"
          ></Center>
        </Flex>

        <Flex
          width="50vw"
          flexDirection="column"
          overflow="hidden"
          bgColor="white"
          shadow="md"
          borderRadius={10}
          pt={6}
          px={6}
          position="absolute"
          top="30vh"
        >
          <Heading size="lg" fontWeight="bold" marginBottom={5}>
            <Highlight query="AirHopper!" styles={{ color: "#2078b8" }}>
              Pilih Jadwal Penerbangan Spesial di AirHopper!
            </Highlight>
          </Heading>

          <Grid
            justifyContent="center"
            alignItems="center"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(3, 1fr)"
          >
            <GridItem display="flex" gap={1} alignItems="center">
              <FontAwesomeIcon icon={faPlaneDeparture} />
              <Text display="inline">From</Text>
              <Input placeholder="Enter your email" variant="flushed" />
            </GridItem>
            <GridItem
              display="flex"
              gap={1}
              alignItems="center"
              rowSpan={2}
              justifySelf="center"
              width="10px"
            >
              <IconButton borderColor="#44b3f8" borderRadius={15}>
                <FontAwesomeIcon icon={faRepeat} style={{ fontSize: "20px" }} />
              </IconButton>
            </GridItem>
            <GridItem display="flex" gap={1} alignItems="center">
              <FontAwesomeIcon icon={faPlaneDeparture} />
              <Text display="inline">To</Text>
              <Input placeholder="Enter your email" variant="flushed" />
            </GridItem>
            <GridItem display="flex" gap={1} alignItems="center">
              <FontAwesomeIcon icon={faCalendarDays} />
              <Text display="inline">Date</Text>

              <Field label="Departure">
                <Input placeholder="Pilih Tanggal" variant="flushed" />
              </Field>
              <Field label="Return">
                <Input placeholder="Pilih Tanggal" variant="flushed" />
              </Field>
            </GridItem>
            <GridItem display="flex" gap={1} alignItems="center">
              <FontAwesomeIcon icon={faPerson} />
              <Text display="inline">To</Text>

              <Field label="Passengers">
                <Input placeholder="Pilih Tanggal" variant="flushed" />
              </Field>
              <Field label="Seat Class">
                <Input placeholder="Pilih Tanggal" variant="flushed" />
              </Field>
            </GridItem>
          </Grid>

          <Button width="40vw" alignSelf="center" borderRadius={0}>
            Cari Penerbangan
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}

import {
  Text,
  Input,
  Grid,
  GridItem,
  IconButton,
  Heading,
  Highlight,
  Stack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "../../ui/field";
import { Switch } from "../../ui/switch";
import {
  faCalendarDays,
  faPerson,
  faPlaneDeparture,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Promo from "./Promo";

const SearchFlight = ({
  handleFocus,
  handleDateFocus,
  handlePassengerFocus,
  handleClassFocus,
  isRangeMode,
  formattedStartDate,
  formattedEndDate,
  formattedSingleDate,
  handlePopup,
  setIsRangeMode,
  selectedFrom,
  selectedTo,
}) => {
  return (
    <Stack alignItems="center">
      <Promo />

      <Stack
        width="70vw"
        overflow="hidden"
        bgColor="white"
        shadow="md"
        borderRadius={10}
        pt={6}
        px={6}
        position="absolute"
        top="180px"
      >
        <Heading size="lg" fontWeight="bold" marginBottom={5}>
          <Highlight query="AirHopper!" styles={{ color: "#2078b8" }}>
            Pilih Jadwal Penerbangan Spesial di AirHopper!
          </Highlight>
        </Heading>

        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="3fr 1fr 3fr"
          marginBottom={5}
        >
          <GridItem display="flex" gap={1} alignItems="center">
            <FontAwesomeIcon icon={faPlaneDeparture} />
            <Text display="inline" marginRight={5}>
              From
            </Text>
            <Input
              placeholder="Enter Location"
              variant="flushed"
              value={selectedFrom}
              onFocus={handleFocus}
              onClick={() => handlePopup("from")}
              fontWeight="semibold"
            />
          </GridItem>
          <GridItem
            display="flex"
            rowSpan={2}
            justifyContent="center"
            marginTop={5}
          >
            <IconButton borderColor="#44b3f8" borderRadius={15}>
              <FontAwesomeIcon icon={faRepeat} style={{ fontSize: "20px" }} />
            </IconButton>
          </GridItem>
          <GridItem display="flex" gap={1} alignItems="center">
            <FontAwesomeIcon icon={faPlaneDeparture} />
            <Text display="inline" marginRight={5}>
              To
            </Text>
            <Input
              placeholder="Enter Location"
              variant="flushed"
              value={selectedTo}
              onFocus={handleFocus}
              onClick={() => handlePopup("to")}
              fontWeight="semibold"
            />
          </GridItem>
          <GridItem display="flex" gap={2} alignItems="center">
            <FontAwesomeIcon icon={faCalendarDays} />
            <Text display="inline" marginRight={5}>
              Date
            </Text>

            {isRangeMode ? (
              <>
                <Field label="Departure">
                  <Input
                    placeholder="Pilih Tanggal"
                    variant="flushed"
                    value={formattedStartDate}
                    onFocus={() => handleDateFocus(0)}
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    readOnly
                  />
                </Field>
                <Field label="Return">
                  <Input
                    placeholder="Pilih Tanggal"
                    variant="flushed"
                    value={formattedEndDate}
                    onFocus={() => handleDateFocus(1)}
                    fontWeight="semibold"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    readOnly
                  />
                </Field>
              </>
            ) : (
              <Field label="Departure">
                <Input
                  placeholder="Pilih Tanggal"
                  variant="flushed"
                  value={formattedSingleDate}
                  onFocus={handleDateFocus}
                  fontWeight="semibold"
                  readOnly
                />
              </Field>
            )}
            <Switch
              size="md"
              colorPalette="blue"
              onChange={() => setIsRangeMode(!isRangeMode)}
            />
          </GridItem>
          <GridItem display="flex" gap={3} alignItems="center">
            <FontAwesomeIcon icon={faPerson} />
            <Text display="inline" marginRight={3}>
              To
            </Text>

            <Field label="Passengers">
              <Input
                placeholder="Pilih Penumpang"
                variant="flushed"
                onFocus={handlePassengerFocus}
                fontWeight="semibold"
              />
            </Field>
            <Field label="Seat Class">
              <Input
                placeholder="Pilih Kelas"
                variant="flushed"
                onFocus={handleClassFocus}
                fontWeight="semibold"
              />
            </Field>
          </GridItem>
        </Grid>

        <Button
          width="70vw"
          alignSelf="center"
          borderRadius={0}
          bgColor="#44b3f8"
          _hover={{ bgColor: "#2078b8" }}
        >
          Cari Penerbangan
        </Button>
      </Stack>
    </Stack>
  );
};

export default SearchFlight;

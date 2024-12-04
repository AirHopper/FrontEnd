import { useState } from "react";
import {
  Text,
  Input,
  Grid,
  GridItem,
  IconButton,
  Heading,
  Highlight,
  Stack,
  HStack,
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

// Input Modals
import DatePicker from "./DatePicker";
import InputLocation from "./InputLocation";
import PassengerInput from "./PassengerInput";
import ClassSelect from "./ClassSelect";
import { useNavigate } from "@tanstack/react-router";

const SearchFlight = ({ flights, isFocused, setIsFocused }) => {
  const navigate = useNavigate();

  const [isLocationVisible, setIsLocationVisible] = useState(false);
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [focusedRange, setFocusedRange] = useState([0, 0]);
  const [isRangeMode, setIsRangeMode] = useState(false); // State untuk Switch
  const [singleDate, setSingleDate] = useState(new Date());
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Selected Values
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");
  const [locationType, setLocationType] = useState("");
  const [totalPassengers, setTotalPassengers] = useState(0);
  const [selectedClass, setSelectedClass] = useState("");

  // Format Date
  const formattedStartDate = dateRange[0].startDate.toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedEndDate = dateRange[0].endDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedSingleDate = singleDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleLocationInput = (locationType) => {
    setLocationType(locationType);
    setIsFocused(true);
    setIsLocationVisible(true);
    setIsPickerOpen(false);
    setIsPassengerOpen(false);
    setIsClassOpen(false);
  };

  const handleCitySelect = (city) => {
    if (locationType === "from") {
      setSelectedFrom(`${city.name} (${city.code})`);
    } else if (locationType === "to") {
      setSelectedTo(`${city.name} (${city.code})`);
    }
    handleClose();
  };

  const handleDateFocus = (rangeIndex) => {
    setIsFocused(true);
    setIsPickerOpen(true);
    setIsLocationVisible(false);
    setIsPassengerOpen(false);
    setIsClassOpen(false);
    setFocusedRange([0, rangeIndex]);
  };
  const handlePassengerFocus = () => {
    setIsFocused(true);
    setIsPassengerOpen(true);
    setIsPickerOpen(false);
    setIsLocationVisible(false);
    setIsClassOpen(false);
  };
  const handleClassFocus = () => {
    setIsFocused(true);
    setIsClassOpen(true);
    setIsPickerOpen(false);
    setIsLocationVisible(false);
    setIsPassengerOpen(false);
  };
  const handleClassSave = (className) => {
    setSelectedClass(className);
  };
  const handleClose = () => {
    setIsFocused(false);
    setIsLocationVisible(false);
    setIsPickerOpen(false);
    setIsPassengerOpen(false);
    setIsClassOpen(false);
  };

  const handleSwap = () => {
    setSelectedFrom(selectedTo);
    setSelectedTo(selectedFrom);
  };

  const handleSendSearch = () => {
    const searchParams = new URLSearchParams();

    if (selectedFrom)
      searchParams.append("search[departureCity]", selectedFrom);
    if (selectedTo) searchParams.append("search[arrivalCity]", selectedTo);
    if (selectedClass) searchParams.append("search[classType]", selectedClass);
    if (totalPassengers)
      searchParams.append("search[passengers]", totalPassengers);

    // Redirect ke halaman flights dengan query params
    navigate({ to: `/flights?${searchParams.toString()}` });
  };

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
              onFocus={() => handleLocationInput("from")}
              fontWeight="semibold"
            />
          </GridItem>
          <GridItem
            display="flex"
            rowSpan={2}
            justifyContent="center"
            marginTop={5}
          >
            <IconButton
              borderColor="#44b3f8"
              borderRadius={15}
              onClick={handleSwap}
            >
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
              onFocus={() => handleLocationInput("to")}
              fontWeight="semibold"
            />
          </GridItem>
          <GridItem display="flex" gap={2} alignItems="center">
            <FontAwesomeIcon icon={faCalendarDays} />
            <Text display="inline" marginRight={5}>
              Date
            </Text>

            <HStack>
              {isRangeMode ? (
                <>
                  <Field label="Departure">
                    <Input
                      placeholder="Pilih Tanggal"
                      variant="flushed"
                      value={formattedStartDate}
                      onFocus={() => handleDateFocus(0)}
                      _focus={{
                        position: "relative",
                        zIndex: "5",
                        bgColor: "white",
                      }}
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
                      _focus={{
                        position: "relative",
                        zIndex: "5",
                        bgColor: "white",
                      }}
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
            </HStack>
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
                value={totalPassengers ? `${totalPassengers} Penumpang` : ""}
                variant="flushed"
                onFocus={handlePassengerFocus}
                fontWeight="semibold"
              />
            </Field>
            <Field label="Seat Class">
              <Input
                placeholder="Pilih Kelas"
                variant="flushed"
                value={selectedClass}
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
          onClick={handleSendSearch}
        >
          Cari Penerbangan
        </Button>
      </Stack>

      {/* Input Wrapper */}
      {isLocationVisible && (
        <InputLocation
          onCloseClick={handleClose}
          isFocused={isFocused}
          flights={flights}
          onCitySelect={handleCitySelect}
        />
      )}

      {/* DatePicker */}
      {isPickerOpen && (
        <DatePicker
          isRangeMode={isRangeMode}
          dateRange={dateRange}
          setDateRange={setDateRange}
          singleDate={singleDate}
          setSingleDate={setSingleDate}
          focusedRange={focusedRange}
          setIsPickerOpen={setIsPickerOpen}
          handleClose={handleClose}
        />
      )}

      {isPassengerOpen && (
        <PassengerInput
          onCloseClick={handleClose}
          isFocused={isFocused}
          onSave={(total) => setTotalPassengers(total)}
        />
      )}

      {isClassOpen && (
        <ClassSelect
          isFocused={isFocused}
          onCloseClick={handleClose}
          onClassSelect={handleClassFocus}
          onSave={handleClassSave}
        />
      )}
    </Stack>
  );
};

export default SearchFlight;

import { useState, useEffect } from "react";
import {
  Text,
  Input,
  Grid,
  GridItem,
  IconButton,
  Heading,
  Highlight,
  Stack,
  Box,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseTrigger,
  PopoverBody,
} from "@/components/ui/popover";
import {
  faCalendarDays,
  faPerson,
  faPlaneDeparture,
  faRepeat,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { toast } from "react-toastify";

// Input Modals
import DatePicker from "./DatePicker";
import InputLocation from "./InputLocation";
import PassengerInput from "./PassengerInput";
import ClassSelect from "./ClassSelect";
import { useNavigate } from "@tanstack/react-router";

const SearchTicket = ({
  tickets,
  isFocused,
  setIsFocused,
  selectedFrom,
  selectedTo,
  dateRange,
  selectedClass,
  setSelectedFrom,
  setSelectedTo,
  setDateRange,
  setSelectedClass,
}) => {
  const navigate = useNavigate();

  const [isLocationVisible, setIsLocationVisible] = useState(false);
  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [focusedRange, setFocusedRange] = useState([0, 0]);
  const [isRangeMode, setIsRangeMode] = useState(false); // State untuk Switch
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State untuk buka popover
  const [hoverTimeout, setHoverTimeout] = useState(null); // state untuk timeout popover

  // Passenger and Class Input
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);

  // location input type and total passengers
  const [locationType, setLocationType] = useState("");
  const [totalPassengers, setTotalPassengers] = useState(0);

  const handleMouseEnter = () => {
    // Set delay untuk membuka popover
    const timeout = setTimeout(() => setIsPopoverOpen(true), 500); // Delay 500ms
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    // Hentikan delay jika user tidak jadi hover
    clearTimeout(hoverTimeout);
    setHoverTimeout(null);

    // Set delay untuk menutup popover
    setTimeout(() => setIsPopoverOpen(false), 200); // Delay 200ms
  };

  // Format Date
  const formattedStartDate =
    dateRange[0]?.startDate instanceof Date
      ? dateRange[0].startDate.toLocaleDateString("id-ID", {
          timeZone: "UTC",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

  const formattedEndDate =
    dateRange[0]?.endDate instanceof Date
      ? dateRange[0].endDate.toLocaleDateString("id-ID", {
          timeZone: "UTC",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "";

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
      setSelectedFrom(`${city.name}`);
    } else if (locationType === "to") {
      setSelectedTo(`${city.name}`);
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

  const handleFormatDate = (date) => {
    // Format date to "YYYY-MM-DD"
    return format(date, "yyyy-MM-dd");
  };

  const handleSwitchChange = () => {
    setIsRangeMode((prevMode) => {
      if (prevMode) {
        // Reset endDate jika mode range dinonaktifkan
        setDateRange([
          {
            startDate: dateRange[0].startDate,
            endDate: null,
          },
        ]);
      }
      return !prevMode;
    });
  };

  useEffect(() => {
    try {
      const storedDepartureCity = localStorage.getItem("departureCity");
      const storedArrivalCity = localStorage.getItem("arrivalCity");
      const storedDateRange = JSON.parse(localStorage.getItem("dateRange"));
      const storedAdultInput = parseInt(localStorage.getItem("adultInput"), 10);
      const storedChildInput = parseInt(localStorage.getItem("childInput"), 10);
      const storedInfantInput = parseInt(
        localStorage.getItem("infantInput"),
        10
      );
      const storedTotalPassengers = parseInt(
        localStorage.getItem("totalPassengers"),
        10
      );
      const storedClassType = localStorage.getItem("classType");

      if (storedDepartureCity) setSelectedFrom(storedDepartureCity);
      if (storedArrivalCity) setSelectedTo(storedArrivalCity);

      // Pastikan dateRange dikonversi kembali menjadi objek Date
      if (storedDateRange) {
        const parsedDateRange = storedDateRange.map((range) => ({
          startDate: range.startDate ? new Date(range.startDate) : null,
          endDate: range.endDate ? new Date(range.endDate) : null,
        }));

        setDateRange(parsedDateRange);

        // Jika salah satu range memiliki endDate, set isRangeMode menjadi true
        const hasEndDate = parsedDateRange.some(
          (range) => range.endDate !== null
        );
        if (hasEndDate) {
          setIsRangeMode(true);
        }
      }

      if (!isNaN(storedAdultInput)) setAdultCount(storedAdultInput);
      if (!isNaN(storedChildInput)) setChildCount(storedChildInput);
      if (!isNaN(storedInfantInput)) setInfantCount(storedInfantInput);
      if (!isNaN(storedTotalPassengers))
        setTotalPassengers(storedTotalPassengers);
      if (storedClassType) setSelectedClass(storedClassType);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);

  const handleSendSearch = () => {
    if (!selectedFrom || !selectedTo) {
      navigate({ to: "/" });
      toast.error('Lokasi "From" dan "To" harus dipilih!');
      return;
    }

    if (selectedFrom === selectedTo) {
      navigate({ to: "/" });
      toast.error('Lokasi "From" dan "To" tidak boleh sama!');
      return;
    }

    if (!dateRange[0].startDate) {
      navigate({ to: "/" });
      toast.error("Tanggal Departure harus dipilih!");
      return;
    }

    if (
      dateRange[0].endDate &&
      dateRange[0].startDate === dateRange[0].endDate
    ) {
      navigate({ to: "/" });
      toast.error("Tanggal Departure dan Return tidak boleh sama!");
      return;
    }

    if (
      dateRange[0].endDate &&
      dateRange[0].endDate <= dateRange[0].startDate
    ) {
      toast.error("Tanggal Return harus setelah Tanggal Departure!");
      return;
    }

    if (!adultCount || adultCount <= 0) {
      navigate({ to: "/" });
      toast.error("Minimal satu orang Dewasa (Adult) harus dipilih!");
      return;
    }

    if (!selectedClass) {
      navigate({ to: "/" });
      toast.error("Seat Class harus dipilih!");
      return;
    }

    const searchParams = new URLSearchParams();

    searchParams.append("departure", selectedFrom);
    searchParams.append("arrival", selectedTo);
    searchParams.append(
      "departureDate",
      handleFormatDate(dateRange[0].startDate)
    );
    if (dateRange[0].endDate) {
      searchParams.append("returnDate", handleFormatDate(dateRange[0].endDate));
    }
    searchParams.append("adult", adultCount);
    searchParams.append("child", childCount > 0 ? childCount : 0);
    searchParams.append("infant", infantCount > 0 ? infantCount : 0);
    searchParams.append("classType", selectedClass);

    navigate({ to: `/tickets?${searchParams.toString()}` });

    try {
      localStorage.setItem("departureCity", selectedFrom);
      localStorage.setItem("arrivalCity", selectedTo);
      localStorage.setItem(
        "dateRange",
        JSON.stringify(
          dateRange.map((range) => ({
            startDate: range.startDate ? range.startDate.toISOString() : null,
            endDate: range.endDate ? range.endDate.toISOString() : null,
          }))
        )
      );
      localStorage.setItem("adultInput", adultCount.toString());
      localStorage.setItem("childInput", childCount.toString());
      localStorage.setItem("infantInput", infantCount.toString());
      localStorage.setItem("classType", selectedClass);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
      toast.error("Terjadi kesalahan saat menyimpan pencarian!");
    }
  };

  return (
    <Stack alignItems="center">
      <Stack
        width={{ base: "90vw", md: "85vw", lg: "75vw", xl: "70vw" }}
        overflow="hidden"
        bgColor="white"
        shadow="md"
        borderRadius={10}
        pt={6}
        px={4}
      >
        <Heading size="lg" fontWeight="bold" marginBottom={5}>
          <Highlight query="AirHopper!" styles={{ color: "#2078b8" }}>
            Pilih Jadwal Penerbangan Spesial di AirHopper!
          </Highlight>
        </Heading>

        <Grid
          templateRows={{ lg: "repeat(2, 1fr)" }}
          templateColumns={{ lg: "3fr 1fr 3fr" }}
          gap={3}
          marginBottom={5}
        >
          <GridItem display="flex" gap={1} alignItems="center">
            <FontAwesomeIcon icon={faPlaneDeparture} />
            <Text display="inline" marginRight={5}>
              From
            </Text>
            <Input
              width={{ lg: "25.5vw" }}
              placeholder="Pilih Lokasi"
              variant="flushed"
              value={selectedFrom}
              onFocus={() => handleLocationInput("from")}
              fontWeight="semibold"
              readOnly
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
            <Text display="inline" marginRight={{ base: "10", lg: "5" }}>
              To
            </Text>
            <Input
              placeholder="Pilih Lokasi"
              variant="flushed"
              value={selectedTo}
              onFocus={() => handleLocationInput("to")}
              fontWeight="semibold"
              readOnly
            />
          </GridItem>
          <GridItem
            display="flex"
            gap={2}
            alignItems="center"
            marginTop={{ base: "15px", lg: "0" }}
          >
            <FontAwesomeIcon icon={faCalendarDays} />
            <Text display="inline" marginRight={5}>
              Date
            </Text>

            <Stack direction={{ base: "column", sm: "row" }}>
              {isRangeMode ? (
                <>
                  <Field
                    label="Departure"
                    width={{
                      base: "46vw",
                      sm: "28vw",
                      md: "32vw",
                      lg: "10.5vw",
                    }}
                  >
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
                      required
                      readOnly
                    />
                  </Field>
                  <Field
                    label="Return"
                    width={{
                      base: "46vw",
                      sm: "28vw",
                      md: "32vw",
                      lg: "10.5vw",
                    }}
                  >
                    <Input
                      placeholder="Pilih Tanggal"
                      variant="flushed"
                      value={formattedEndDate || ""}
                      onFocus={() => handleDateFocus(1)}
                      _focus={{
                        position: "relative",
                        zIndex: "5",
                        bgColor: "white",
                      }}
                      fontWeight="semibold"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      required
                      readOnly
                    />
                  </Field>
                </>
              ) : (
                <Field label="Departure">
                  <Input
                    placeholder="Pilih Tanggal"
                    variant="flushed"
                    value={formattedStartDate}
                    onFocus={handleDateFocus}
                    _focus={{
                      position: "relative",
                      zIndex: "5",
                      bgColor: "white",
                    }}
                    fontWeight="semibold"
                    required
                    readOnly
                  />
                </Field>
              )}
            </Stack>

            <PopoverRoot open={isPopoverOpen}>
              <PopoverTrigger
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                _focus={{ outline: "none", border: "none" }}
              >
                <Switch
                  size="md"
                  colorScheme="blue"
                  checked={isRangeMode}
                  onChange={handleSwitchChange}
                />
              </PopoverTrigger>
              <PopoverContent onBlur={() => setIsPopoverOpen(false)}>
                <PopoverArrow />
                <PopoverBody marginTop={3}>
                  Aktif/Nonaktifkan switch ini untuk memilih tanggal penerbangan
                  pulang (Return Date) saat memesan tiket.
                </PopoverBody>
                <PopoverCloseTrigger
                  _focus={{ outline: "none", border: "none" }}
                  onClick={() => setIsPopoverOpen(false)}
                />
              </PopoverContent>
            </PopoverRoot>
          </GridItem>
          <GridItem
            display="flex"
            gap={3}
            alignItems="center"
            marginTop={{ base: "15px", lg: "0" }}
          >
            <FontAwesomeIcon icon={faPerson} />
            <Text display="inline" marginRight={{ base: "8", lg: "3.5" }}>
              To
            </Text>

            <Stack direction={{ base: "column", sm: "row" }}>
              <Field
                label="Passengers"
                width={{ base: "60vw", sm: "32vw", lg: "13vw" }}
              >
                <Input
                  placeholder="Pilih Penumpang"
                  value={totalPassengers ? `${totalPassengers} Penumpang` : ""}
                  variant="flushed"
                  onFocus={handlePassengerFocus}
                  _focus={{
                    position: "relative",
                    zIndex: "5",
                    bgColor: "white",
                  }}
                  fontWeight="semibold"
                  required
                  readOnly
                />
              </Field>
              <Field
                label="Seat Class"
                width={{ base: "60vw", sm: "32vw", lg: "13vw" }}
              >
                <Input
                  placeholder="Pilih Kelas"
                  variant="flushed"
                  value={selectedClass}
                  onFocus={handleClassFocus}
                  _focus={{
                    position: "relative",
                    zIndex: "5",
                    bgColor: "white",
                  }}
                  fontWeight="semibold"
                />
              </Field>
            </Stack>
          </GridItem>
        </Grid>

        <Button
          width={{ base: "90vw", md: "85vw", lg: "75vw" }}
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
          tickets={tickets}
          onCitySelect={handleCitySelect}
        />
      )}

      {/* DatePicker */}
      {isPickerOpen && (
        <DatePicker
          isRangeMode={isRangeMode}
          dateRange={dateRange}
          setDateRange={setDateRange}
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
          adultCount={adultCount}
          childCount={childCount}
          infantCount={infantCount}
          setAdultCount={setAdultCount}
          setChildCount={setChildCount}
          setInfantCount={setInfantCount}
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

export default SearchTicket;

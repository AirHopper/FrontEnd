import { useState, useEffect } from "react";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Box, Container } from "@chakra-ui/react";
import DatePicker from "../components/Buyer/LandingPage/DatePicker";
import InputLocation from "../components/Buyer/LandingPage/InputLocation";
import Passenger from "../components/Buyer/LandingPage/Passenger";
import ClassSelect from "../components/Buyer/LandingPage/ClassSelect";
import { getFlights } from "../services/flights";
import SearchFlight from "../components/Buyer/LandingPage/SearchFlight";
import FlightFav from "../components/Buyer/LandingPage/FlightFav";

export const Route = createLazyFileRoute("/")({
  component: Beranda,
});

function Beranda() {
  const [isFocused, setIsFocused] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
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
  const [popupType, setPopupType] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPassengers, setSelectedPassengers] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");

  const handlePopup = (type) => {
    setPopupType(type);
    setIsFocused(true);
    setIsPopupVisible(true);
    setIsPickerOpen(false);
    setIsClassOpen(false);
  };

  const handleCitySelect = (city) => {
    if (popupType === "from") {
      setSelectedFrom(`${city.name} (${city.code})`);
    } else if (popupType === "to") {
      setSelectedTo(`${city.name} (${city.code})`);
    }
    handleClose();
  };

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

  const handleFocus = () => {
    setIsFocused(true);
    setIsPopupVisible(true);
    setIsPickerOpen(false);
    setIsPassengerOpen(false);
    setIsClassOpen(false);
  };

  const handleDateFocus = (rangeIndex) => {
    setIsFocused(true);
    setIsPickerOpen(true);
    setIsPopupVisible(false);
    setIsPassengerOpen(false);
    setIsClassOpen(false);
    setFocusedRange([0, rangeIndex]);
  };
  const handlePassengerFocus = () => {
    setIsFocused(true);
    setIsPassengerOpen(true);
    setIsPickerOpen(false);
    setIsPopupVisible(false);
    setIsClassOpen(false);
  };
  const handleClassFocus = () => {
    setIsFocused(true);
    setIsClassOpen(true);
    setIsPickerOpen(false);
    setIsPopupVisible(false);
    setIsPassengerOpen(false);
  };
  const handleClose = () => {
    setIsFocused(false);
    setIsPopupVisible(false);
    setIsPickerOpen(false);
    setIsPassengerOpen(false);
    setIsClassOpen(false);
  };

  const [flights, setFlights] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
  });

  // Use react query to fetch API
  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["flights", pagination.currentPage, pagination.pageSize],
    queryFn: () => getFlights(pagination.currentPage, pagination.pageSize),
    enabled: pagination.pageSize > 0,
  });

  useEffect(() => {
    if (isSuccess) {
      setFlights(data?.data);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.pagination.totalPages,
      }));
    }
  }, [data, isSuccess]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const departureDate = "Iyo";
  const arrivalDate = "Jakarta";

  return (
    <Container maxWidth="container.lg" mx="auto" py={8}>
      {/* Overlay Box */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="blackAlpha.700"
        opacity={isFocused ? 1 : 0}
        pointerEvents="none"
        transition="opacity 0.3s ease"
        zIndex="5"
      ></Box>

      {/* Input Wrapper */}
      {isPopupVisible && (
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
        <Passenger onCloseClick={handleClose} isFocused={isFocused} />
      )}

      {isClassOpen && (
        <ClassSelect onCloseClick={handleClose} isFocused={isFocused} />
      )}

      <SearchFlight
        handleFocus={handleFocus}
        handleDateFocus={handleDateFocus}
        handlePassengerFocus={handlePassengerFocus}
        handleClassFocus={handleClassFocus}
        isRangeMode={isRangeMode}
        setIsRangeMode={setIsRangeMode}
        formattedStartDate={formattedStartDate}
        formattedEndDate={formattedEndDate}
        formattedSingleDate={formattedSingleDate}
        handlePopup={handlePopup}
        selectedFrom={selectedFrom}
        selectedTo={selectedTo}
      />

      <FlightFav
        loading={isPending}
        flights={flights}
        departureDate={departureDate}
        arrivalDate={arrivalDate}
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
      />
    </Container>
  );
}

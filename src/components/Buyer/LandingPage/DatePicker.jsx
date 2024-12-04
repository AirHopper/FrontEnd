import { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { DateRange, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // default styles
import "react-date-range/dist/theme/default.css"; // default theme

const DatePicker = ({
  isRangeMode,
  handleClose,
  dateRange,
  setDateRange,
  singleDate,
  focusedRange,
  setSingleDate,
  setIsPickerOpen,
}) => {
  const pickerRef = useRef(); // Ref for detecting outside clicks

  const handleRangeChange = (item) => {
    setDateRange([item.selection]);
    setIsPickerOpen(false); // Close picker after selection
    handleClose();
  };

  const handleSingleDateChange = (date) => {
    setSingleDate(date);
    setIsPickerOpen(false); // Close picker after selection
    handleClose();
  };

  // Handle clicks outside the picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsPickerOpen(false); // Close the picker if clicked outside
        handleClose(); // Close the parent component when picker is closed (e.g., when clicked outside)
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsPickerOpen]);

  return (
    <Box
      mt={4}
      position="absolute"
      top="33%"
      left="23%"
      bg="white"
      shadow="lg"
      transition="all 0.3s ease"
      zIndex="10"
      ref={pickerRef}
    >
      {isRangeMode ? (
        <DateRange
          editableDateInputs
          onChange={handleRangeChange}
          color="#44b3f8"
          ranges={dateRange}
          focusedRange={focusedRange}
        />
      ) : (
        <Calendar
          date={singleDate}
          color="#44b3f8"
          onChange={handleSingleDateChange}
        />
      )}
    </Box>
  );
};

export default DatePicker;

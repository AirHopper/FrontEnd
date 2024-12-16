import { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { DateRange, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // default styles
import "react-date-range/dist/theme/default.css"; // default theme

const DatePicker = ({
  isRangeMode,
  dateRange,
  setDateRange,
  focusedRange,
  setIsPickerOpen,
  handleClose,
}) => {
  const pickerRef = useRef(); // Ref for detecting outside clicks

  const handleRangeChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    setDateRange((prevDateRange) => {
      const currentStartDate = prevDateRange[0].startDate;

      if (focusedRange[1] === 0) {
        // Fokus pada startDate
        return [
          {
            startDate,
            endDate: isRangeMode && endDate >= startDate ? endDate : null,
          },
        ];
      } else if (focusedRange[1] === 1) {
        // Fokus pada endDate
        return [
          {
            startDate: currentStartDate,
            endDate: endDate >= currentStartDate ? endDate : null,
          },
        ];
      }

      return prevDateRange;
    });
  };

  const handleSingleDateChange = (date) => {
    if (date >= new Date()) {
      // Allow setting only if the date is today or in the future
      setDateRange([{ startDate: date, endDate: null }]);
      setIsPickerOpen(false);
      handleClose();
    }
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
      top={{ base: "400px", sm: "325px", lg: "215px" }}
      left={{ base: "6%", sm: "21%", lg: "20%", xl: "23%" }}
      bg="white"
      shadow="lg"
      transition="all 0.3s ease"
      zIndex="10"
      ref={pickerRef}
    >
      {isRangeMode ? (
        <DateRange
          onChange={handleRangeChange}
          color="#44b3f8"
          rangeColors="#44b3f8"
          ranges={[
            {
              startDate: dateRange[0].startDate,
              endDate: isRangeMode ? dateRange[0].endDate : null,
              key: "selection",
            },
          ]}
          retainEndDateOnRangeChange={false}
          moveRangeOnFirstSelection={false}
          focusedRange={focusedRange} // Pastikan Anda melacak focusedRange
          minDate={new Date()} // Disable dates before today
        />
      ) : (
        <Calendar
          date={dateRange[0].startDate}
          color="#44b3f8"
          minDate={new Date()}
          onChange={handleSingleDateChange}
        />
      )}
    </Box>
  );
};

export default DatePicker;

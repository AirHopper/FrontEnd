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
      const currentEndDate = prevDateRange[0].endDate;

      // Perbarui berdasarkan fokus (focusedRange)
      if (focusedRange[1] === 0) {
        // Fokus pada startDate
        return [
          {
            startDate,
            endDate:
              isRangeMode &&
              (currentEndDate > startDate ? currentEndDate : null),
          },
        ];
      } else if (focusedRange[1] === 1) {
        // Fokus pada endDate
        return [
          {
            startDate: currentStartDate,
            endDate: isRangeMode ? endDate : null,
          },
        ];
      }

      return prevDateRange;
    });
  };

  const handleSingleDateChange = (date) => {
    setDateRange([{ startDate: date, endDate: null }]);
    setIsPickerOpen(false);
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
      top={{ base: "400px", sm: "325px", lg: "215px" }}
      left={{ base: "6%", sm: "21%", lg: "20.5%", xl: "23%" }}
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
          ranges={[
            {
              startDate: dateRange[0].startDate,
              endDate: isRangeMode ? dateRange[0].endDate : null,
              key: "selection",
            },
          ]}
          preventSnapRefocus={true}
          retainEndDateOnRangeChange={false}
          focusedRange={focusedRange} // Pastikan Anda melacak focusedRange
        />
      ) : (
        <Calendar
          date={dateRange[0].startDate}
          color="#44b3f8"
          onChange={handleSingleDateChange}
        />
      )}
    </Box>
  );
};

export default DatePicker;

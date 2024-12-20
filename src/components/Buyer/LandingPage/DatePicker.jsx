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

  // Convert date to UTC with time set to 00:00:00
  const toUTCDate = (date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    return utcDate;
  };

  const todayUTC = toUTCDate(new Date()); // Get today's date in UTC

  const handleRangeChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    setDateRange((prevDateRange) => {
      const currentStartDate = prevDateRange[0].startDate;
      if (focusedRange[1] === 0) {
        // Focus on startDate
        return [
          {
            startDate: toUTCDate(startDate),
            endDate:
              isRangeMode && prevDateRange[0].endDate > startDate
                ? prevDateRange[0].endDate
                : null,
          },
        ];
      } else if (focusedRange[1] === 1) {
        // Focus on endDate
        if (endDate > currentStartDate) {
          return [
            {
              startDate: currentStartDate,
              endDate: toUTCDate(endDate),
            },
          ];
        } else {
          return prevDateRange;
        }
      }

      return prevDateRange;
    });
  };

  const handleSingleDateChange = (date) => {
    const selectedDate = toUTCDate(date);
    if (selectedDate >= todayUTC) {
      // Allow setting only if the date is today or in the future
      setDateRange([{ startDate: selectedDate, endDate: null }]);
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
          minDate={todayUTC} // Disable dates before today
        />
      ) : (
        <Calendar
          date={dateRange[0].startDate}
          color="#44b3f8"
          minDate={todayUTC}
          scroll={{ calendarWidth: "10px" }}
          onChange={handleSingleDateChange}
        />
      )}
    </Box>
  );
};

export default DatePicker;

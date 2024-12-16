import React, { useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import { CloseButton } from "@/components/ui/close-button";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DatePicker = ({ dateRange, setDateRange, setIsPickerOpen, onSave }) => {
  const [localDateRange, setLocalDateRange] = useState(dateRange);

  const handleSave = () => {
    // Ambil startDate dan endDate dari localDateRange
    const startDate = localDateRange[0].startDate;
    let endDate = localDateRange[0].endDate;

    // Jika endDate tidak dipilih, set endDate sama dengan startDate
    if (!endDate) {
      endDate = startDate;
    }

    // Mengonversi tanggal ke format ISO sesuai dengan zona waktu lokal
    const startDateIso = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    const endDateIso = new Date(
      endDate.getTime() - endDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];

    // Kirim parameter ke parent dengan format tanggal yang benar
    onSave({ startDate: startDateIso, endDate: endDateIso });

    // Tutup DatePicker
    setIsPickerOpen(false);
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      zIndex="9"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        bg="white"
        shadow="lg"
        borderRadius="md"
        p="4"
        width="90%"
        maxWidth="400px"
      >
        {/* Tombol X untuk menutup filter dengan lebar penuh */}
        <Box
          top="10px"
          right="10px"
          display="flex"
          justifyContent="flex-end"
          mb={4}
        >
          <CloseButton onClick={() => setIsPickerOpen(false)} />
        </Box>

        {/* Date Range Picker */}
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setLocalDateRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={localDateRange}
          showMonthAndYearPickers={false}
          showDateDisplay={false}
        />

        {/* Tombol Simpan di bagian bawah kanan */}
        <HStack justifyContent="flex-end" mt={4}>
          <Button
            colorScheme="blue"
            onClick={handleSave}
            bg={"#44B3F8"}
            _hover={{ bg: "#2078B8" }}
          >
            Simpan
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default DatePicker;

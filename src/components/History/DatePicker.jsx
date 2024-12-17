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
      bg="rgba(0, 0, 0, 0.3)"
      zIndex="9"
    >
      <Box
        position="absolute"
        top={{ base: "400px", sm: "325px", lg: "65%", xl: "50%" }}
        left={{ base: "50%", sm: "75%", lg: "70%", xl: "70%" }}
        transform="translate(-50%, -50%)"
        transition="all 0.3s ease"
        bg="white"
        shadow="lg"
        zIndex="10"
        borderRadius="md"
      >
        {/* Tombol X untuk menutup filter dengan lebar penuh */}
        <HStack borderRadius="none" justifySelf="end">
          <CloseButton
            aria-label="Close Picker"
            onClick={() => setIsPickerOpen(false)}
            rounded="none"
            borderTopRightRadius="md"
          />
        </HStack>

        {/* Date Range Picker */}
        <Box borderTopWidth="2px">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setLocalDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={localDateRange}
            color="#44b3f8"
            rangeColors="#44b3f8"
            showMonthAndYearPickers={false}
            showDateDisplay={false}
          />
        </Box>

        <HStack borderTopWidth="2px"></HStack>

        {/* Tombol Simpan di bagian bawah kanan */}
        <HStack justifyContent="flex-end" p={3}>
          <Button
            px="35px"
            colorScheme="blue"
            onClick={handleSave}
            bg={"#44B3F8"}
            _hover={{ bg: "#2078B8" }}
            borderRadius="xl"
          >
            Simpan
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

export default DatePicker;

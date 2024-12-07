import { useState } from "react";
import {
  Box,
  Text,
  Stack,
  HStack,
  List,
  Separator,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
// import { StepperInput } from "@/components/ui/stepper-input";
import StepperInput from "./StepperInput";
import { CloseButton } from "@/components/ui/close-button";
import {
  faBaby,
  faPerson,
  faPersonDress,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PassengerInput = ({
  adultCount,
  childCount,
  infantCount,
  setAdultCount,
  setChildCount,
  setInfantCount,
  onCloseClick,
  onSave,
}) => {
  const handleSave = () => {
    const totalPassengers = adultCount + childCount + infantCount;
    onSave(totalPassengers); // Kirim nilai total ke komponen utama
    onCloseClick(); // Tutup modal
  };

  return (
    <Box
      position="absolute"
      top={{ base: "505px", sm: "405px", lg: "222px" }}
      left={{ base: "3%", sm: "22%", md: "19%", lg: "59%" }}
      bg="white"
      w={{ base: "95%", sm: "60vw", md: "40vw", lg: "30vw" }}
      shadow="lg"
      borderRadius="xl"
      transition="all 0.3s ease"
      zIndex="10"
    >
      <HStack mb={5} px={5} justifyContent="end" borderBottomWidth="1px">
        <CloseButton onClick={onCloseClick} size="xl" borderRadius={0} />
      </HStack>

      <List.Root as={Stack} gap={3} listStyle="none">
        <List.Item px={5}>
          <Grid templateColumns="0.2fr 1fr 1.1fr" mb={1}>
            <GridItem paddingTop={1}>
              <FontAwesomeIcon icon={faPerson} style={{ fontSize: "20px" }} />
            </GridItem>
            <GridItem as={Stack} gap={1}>
              <Text fontWeight="bold">Dewasa</Text>
              <Text
                mt={-2}
                fontSize="sm"
                color="gray.500"
              >{`(12 tahun keatas)`}</Text>
            </GridItem>
            <GridItem as={Flex} justifySelf="end">
              <StepperInput
                value={adultCount}
                min={1}
                onChange={(value) => setAdultCount(value)}
              />
            </GridItem>
          </Grid>
          <Separator />
        </List.Item>
        <List.Item px={5} as={Grid}>
          <Grid templateColumns="0.2fr 1fr 1.1fr" mb={1}>
            <GridItem paddingTop={1}>
              <FontAwesomeIcon
                icon={faPersonDress}
                style={{ fontSize: "20px" }}
              />
            </GridItem>
            <GridItem as={Stack} gap={1}>
              <Text fontWeight="bold">Anak</Text>
              <Text
                mt={-2}
                fontSize="sm"
                color="gray.500"
              >{`(2 - 11 tahun)`}</Text>
            </GridItem>
            <GridItem as={Flex} justifySelf="end">
              <StepperInput
                value={childCount}
                min={0}
                onChange={(value) => setChildCount(value)}
              />
            </GridItem>
          </Grid>
          <Separator />
        </List.Item>
        <List.Item px={5}>
          <Grid templateColumns="0.2fr 1fr 1.1fr" mb={1}>
            <GridItem paddingTop={1}>
              <FontAwesomeIcon icon={faBaby} style={{ fontSize: "20px" }} />
            </GridItem>
            <GridItem as={Stack} gap={1}>
              <Text fontWeight="bold">Bayi</Text>
              <Text
                mt={-2}
                fontSize="sm"
                color="gray.500"
              >{`(Dibawah 2 tahun)`}</Text>
            </GridItem>
            <GridItem as={Flex} justifySelf="end">
              <StepperInput
                value={infantCount}
                min={0}
                onChange={(value) => setInfantCount(value)}
              />
            </GridItem>
          </Grid>
          <Separator />
        </List.Item>
      </List.Root>

      <HStack justifySelf="end" px={5}>
        <Button
          bgColor="#44b3f8"
          _hover={{ bgColor: "#2078b8" }}
          my={3}
          px={9}
          py={5}
          borderRadius="xl"
          fontSize="md"
          onClick={handleSave}
        >
          Simpan
        </Button>
      </HStack>
    </Box>
  );
};

export default PassengerInput;

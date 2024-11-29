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
import { StepperInput } from "../../ui/stepper-input";
import { CloseButton } from "../../ui/close-button";
import {
  faBaby,
  faPerson,
  faPersonDress,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Passenger = ({ isFocused, onCloseClick }) => {
  return (
    <Box
      position="absolute"
      top="46%"
      left="50%"
      transform={`translate(34%, -10%) scale(${isFocused ? 1 : 0.8})`}
      bg="white"
      w="28vw"
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
              <StepperInput defaultValue="0" min="0" />
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
              <StepperInput defaultValue="0" min="0" />
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
              <StepperInput defaultValue="0" min="0" />
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
        >
          Simpan
        </Button>
      </HStack>
    </Box>
  );
};

export default Passenger;

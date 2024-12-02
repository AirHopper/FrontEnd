import { Banner } from "../../../assets/img";
import {
  Box,
  Text,
  Image,
  Card,
  HStack,
  Stack,
  Skeleton,
} from "@chakra-ui/react";

const FlightCard = ({ flight }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatter = new Intl.DateTimeFormat("id-ID", options); // 'id-ID' for Bahasa Indonesia
    return formatter.format(new Date(dateString));
  };

  const departureDate = formatDate(flight?.departure.time);
  const arrivalDate = formatDate(flight?.arrival.time);

  return (
    <Card.Root width="215px" height="225px" border="none" boxShadow="md">
      <Card.Body gap="2" padding={3}>
        <Image src={Banner} alt="Flight Image" borderRadius="lg" width={220} />
        <Card.Title fontSize="md">
          {flight?.departure?.city?.name} {"->"} {flight?.arrival?.city?.name}
        </Card.Title>
        <Card.Description>
          <Text color="#44b3f8" fontWeight="bold" fontSize={15}>
            {flight?.airline}
          </Text>
          <Text fontWeight="semibold" fontSize={16}>
            {departureDate.split(" ")[0]} - {arrivalDate.split(" ")[0]}{" "}
            {arrivalDate.split(" ")[1]} {arrivalDate.split(" ")[2]}
          </Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default FlightCard;

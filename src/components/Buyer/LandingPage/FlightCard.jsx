import { Banner } from "../../../assets/img";
import { Text, Image, Highlight, Card } from "@chakra-ui/react";

const FlightCard = ({ flight, departureDate, arrivalDate }) => {
  return (
    <Card.Root width="215px" height="265px" border="none" boxShadow="md">
      <Card.Body gap="2" padding={3}>
        <Image src={Banner} alt="Flight Image" borderRadius="lg" width={220} />
        <Card.Title>
          {flight?.departure?.city?.name} {"->"} {flight?.arrival?.city?.name}
        </Card.Title>
        <Card.Description mt={-2}>
          <Text color="#44b3f8" fontWeight="bold">
            {flight?.airline}
          </Text>
          <Text fontWeight="semibold">
            {departureDate.split(" ")[0]} - {arrivalDate.split(" ")[0]}{" "}
            {arrivalDate.split(" ")[1]} {arrivalDate.split(" ")[2]}
          </Text>
          <Text fontWeight="semibold" fontSize="md">
            <Highlight
              query="IDR 2.550.000"
              styles={{ fontWeight: "bold", color: "red" }}
            >
              Mulai dari IDR 2.550.000
            </Highlight>
          </Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default FlightCard;

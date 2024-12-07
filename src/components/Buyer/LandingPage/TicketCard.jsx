import { Text, Image, Card } from "@chakra-ui/react";

const TicketCard = ({ ticket, onSelectCard }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatter = new Intl.DateTimeFormat("id-ID", options); // 'id-ID' for Bahasa Indonesia
    return formatter.format(new Date(dateString));
  };

  const departureDate = formatDate(ticket?.departure.time);
  const arrivalDate = formatDate(ticket?.arrival.time);

  return (
    <Card.Root
      width={{ base: "100%", sm: "220px" }}
      height="225px"
      border="none"
      boxShadow="md"
      cursor="pointer"
      onClick={() => onSelectCard(ticket)}
      _hover={{ boxShadow: "lg" }}
    >
      <Card.Body gap="2" padding={3} textAlign={{ base: "center", sm: "left" }}>
        <Image
          src={ticket?.arrival?.city?.image}
          alt="Ticket Arrival Image"
          borderRadius="lg"
          width={220}
        />
        <Card.Title fontSize="md">
          {ticket?.departure?.city?.name} {"->"} {ticket?.arrival?.city?.name}
        </Card.Title>
        <Card.Description>
          <Text color="#44b3f8" fontWeight="bold" fontSize={15}>
            {ticket?.flights[0].airline}
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

export default TicketCard;

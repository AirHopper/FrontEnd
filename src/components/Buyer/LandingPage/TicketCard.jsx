import { Text, Image, Card } from "@chakra-ui/react";

const TicketCard = ({ ticket, onSelectCard }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formatter = new Intl.DateTimeFormat("id-ID", options); // 'id-ID' for Bahasa Indonesia
    return formatter.format(new Date(dateString));
  };

  const departureDate = formatDate(ticket?.departure.time);

  return (
    <Card.Root
      width={{ base: "100%", sm: "183px" }}
      height="240px"
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
          width="100%"
          height={100}
        />
        <Card.Title
          height="35px"
          fontSize={{ base: "15px", sm: "clamp(12px, 1vw, 14px)" }}
          lineHeight="moderate"
          fontWeight="bold"
        >
          {ticket?.departure?.city?.name} {"->"} {ticket?.arrival?.city?.name}
        </Card.Title>
        <Card.Description>
          <Text color="#44b3f8" fontWeight="bold" fontSize={14}>
            {ticket?.flights[0]?.airline?.name}
          </Text>
          <Text fontWeight="semibold" fontSize={13}>
            Mulai dari: {departureDate.split(" ")[0]}{" "}
            {departureDate.split(" ")[1]} {departureDate.split(" ")[2]}
          </Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default TicketCard;

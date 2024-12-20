import { Stack, Text, Image, Card } from "@chakra-ui/react";

const TicketCard = ({ ticket, onSelectCard }) => {
  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    };
    const formatter = new Intl.DateTimeFormat("id-ID", options); // 'id-ID' for Bahasa Indonesia
    return formatter.format(new Date(dateString));
  };

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("id-ID").format(number || 0);
  };

  const departureDate = formatDate(ticket?.departure?.time);

  return (
    <Card.Root
      width={{ base: "100%", sm: "183px" }}
      height="260px"
      border="none"
      boxShadow="md"
      cursor="pointer"
      onClick={() => onSelectCard(ticket)}
      _hover={{ boxShadow: "lg" }}
    >
      <Card.Body gap="2" padding={3} textAlign={{ base: "center", sm: "left" }}>
        {ticket?.discount && (
          <Stack
            position="absolute"
            right="0px"
            width="80px"
            height="35px"
            bgColor="#44b3f8"
            borderTopLeftRadius="full"
            borderBottomLeftRadius="full"
            justifyContent="center"
          >
            <Text
              textAlign="center"
              fontSize={12}
              fontWeight="bold"
              color="white"
            >
              {ticket?.discount?.percentage}% OFF
            </Text>
          </Stack>
        )}
        <Image
          src={ticket?.arrival?.city?.image}
          alt="Ticket Arrival Image"
          borderRadius="lg"
          width="100%"
          height={100}
          loading="lazy"
        />
        <Card.Title
          height="31px"
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
          <Text
            fontWeight="bold"
            fontSize="md"
            mt={1}
            color={ticket?.discount ? "red.500" : "#44b3f8"}
          >
            IDR {formatCurrency(ticket?.totalPrice)}
          </Text>
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default TicketCard;

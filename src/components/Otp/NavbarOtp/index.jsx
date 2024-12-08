import {
  Box,
  Flex,
  Container,
  Image,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { LogoAirHopper } from "../../../assets/img";

const NavbarOtp = () => {
  const logoSize = useBreakpointValue({ base: "15vw", md: "5vw" }); // Ukuran logo berubah sesuai layar
  const containerPadding = useBreakpointValue({ base: 2, md: 4 }); // Padding container berubah sesuai layar

  return (
    <Box bg="#2078b8" w="100%" boxShadow="xl">
      <Container maxW="100%" py={containerPadding}>
        <Flex
          align="center"
          justify="flex-start"
          gap={3}
          flexDirection="row" // Tata letak berubah pada layar kecil
        >
          {/* Logo */}
          <Box as={Link} to="/" color="white" fontSize="xl" fontWeight="bold">
            <Image
              src={LogoAirHopper}
              alt="AirHopper Logo"
              width={logoSize}
              margin="auto"
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default NavbarOtp;

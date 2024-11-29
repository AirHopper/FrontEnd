import {
    Box,
    Flex,
    Container,
    Image,
  } from "@chakra-ui/react";
  import { Link } from "@tanstack/react-router";
  import { LogoAirHopper } from "../../../assets/img";
  
  const NavbarOtp = () => {
    return (
      <Box bg="#2078b8" w="100%" boxShadow="xl">
        <Container maxW="100%" py={2}>
          <Flex align="center" gap={3}>
            {/* Logo */}
            <Box as={Link} to="/" color="white" fontSize="xl" fontWeight="bold">
              <Image src={LogoAirHopper} alt="AirHopper Logo" width="5vw" />
            </Box>
          </Flex>
        </Container>
      </Box>
    );
  };
  
  export default NavbarOtp;
  
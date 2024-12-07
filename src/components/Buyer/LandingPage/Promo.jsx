import { Banner } from "../../../assets/img";
import { Box, Image, Center, Heading, HStack } from "@chakra-ui/react";

const Promo = () => {
  return (
    <HStack justifyContent="center" alignItems="center" zIndex={-10}>
      <Box
        width="90vw"
        color="white"
        position="relative"
        overflow="hidden"
        borderRadius={10}
      >
        <Box
          bgColor="#ffec99"
          width={{ base: "43vw", sm: "42vw", md: "33vw" }}
          py="6vh"
          px="5vw"
        >
          <Heading
            size={{ base: "md", sm: "xl", md: "2xl", lg: "3xl" }}
            fontWeight="extrabold"
            fontStyle="italic"
            color="black"
          >
            Diskon Hari Ini
          </Heading>
          <Heading
            mt={1}
            size={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="extrabold"
            color="#2078b8"
          >
            85%!
          </Heading>
        </Box>

        <Image
          src={Banner}
          alt="Banner Background"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          zIndex={-1}
        />
        <Box
          position="absolute"
          top="0"
          left={{ base: "42vw", sm: "40vw", md: "33vw", lg: "32vw" }}
          width={{ base: "35vw", md: "40vw" }}
          height="full"
          bg="linear-gradient(to right, #ffec99, transparent)"
        />
      </Box>

      <Center
        bgGradient="to-r"
        gradientFrom="#44b3f8"
        gradientTo="#70caff"
        color="white"
        textAlign="center"
        width="100%"
        height={{ base: "12vh", sm: "14vh", lg: "16vh" }}
        py={10}
        zIndex={-10}
        position="absolute"
        overflow="hidden"
      ></Center>
    </HStack>
  );
};

export default Promo;

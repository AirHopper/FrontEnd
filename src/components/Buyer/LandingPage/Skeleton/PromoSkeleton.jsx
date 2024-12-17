import { Box, Stack, HStack, Skeleton } from "@chakra-ui/react";

const PromoSkeleton = () => {
  return (
    <HStack justifyContent="center" alignItems="center" zIndex={-10}>
      <Box
        width="90vw"
        color="white"
        position="relative"
        overflow="hidden"
        borderRadius={10}
      >
        <Stack
          width={{ base: "43vw", sm: "42vw", md: "33vw" }}
          py="6vh"
          px="5vw"
          bgColor="white"
          opacity="0.9"
        >
          <Skeleton
            size={{ base: "md", sm: "xl", md: "2xl", lg: "3xl" }}
            fontWeight="extrabold"
            py="17px"
            gap={2}
          ></Skeleton>
          <Skeleton
            mt={1}
            size={{ base: "2xl", sm: "3xl", md: "4xl" }}
            width="90px"
            py="20px"
            gap={2}
          ></Skeleton>
        </Stack>

        <Skeleton
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          objectFit="cover"
          // transition="opacity 1s ease-in-out"
          opacity={1} // Fully visible
          zIndex={-1}
        />
      </Box>

      <Box
        bgGradient="to-r"
        gradientFrom="#44b3f8"
        gradientTo="#70caff"
        width="100%"
        height={{ base: "12vh", sm: "14vh", lg: "16vh" }}
        py={10}
        zIndex={-10}
        position="absolute"
        overflow="hidden"
      ></Box>
    </HStack>
  );
};

export default PromoSkeleton;

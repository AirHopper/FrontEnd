import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Box, Text, Image, Flex, Center, Container } from "@chakra-ui/react";
import { Button } from "../components/ui/button";
import { Banner } from "../assets/img";

export const Route = createLazyFileRoute("/")({
  component: Beranda,
});

function Beranda() {
  return (
    <Container maxWidth="container.lg" mx="auto" py={8}>
      <Flex justifyContent="center" alignItems="center">
        <Box
          width="90vw"
          color="white"
          padding={12}
          position="relative"
          overflow="hidden"
          borderRadius={10}
        >
          {/* Background image */}
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

          {/* Text content */}
          <Text fontSize="3xl" fontWeight="bold" fontStyle="italic">
            Diskon Hari Ini
          </Text>
          <Text mt={2} fontSize="2xl" fontWeight="bold" fontStyle="italic">
            85%!
          </Text>
        </Box>

        <Center
          bgGradient="to-r"
          gradientFrom="#44b3f8"
          gradientTo="#70caff"
          color="white"
          textAlign="center"
          width="100%"
          height="18vh"
          py={10}
          zIndex={-10}
          position="absolute"
          overflow="hidden"
        ></Center>

        <Button></Button>
      </Flex>
    </Container>
  );
}

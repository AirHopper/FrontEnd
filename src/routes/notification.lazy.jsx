import * as React from 'react'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
  VStack,
  HStack,
  Badge,
  Container
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilter, faBell } from "@fortawesome/free-solid-svg-icons";

export const Route = createLazyFileRoute('/notification')({
  component: NotificationPage,
})

function NotificationPage() {

  const notifications = [
    {
      type: "Promosi",
      title: "Dapatkan Potongan 50% Tiket!",
      description: "Syarat dan Ketentuan berlaku!",
      date: "20 Maret, 14:04",
      isRead: true,
    },
    {
      type: "Notifikasi",
      title:
        "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!",
      date: "5 Maret, 14:04",
      isRead: false,
    },
  ];

  return (
      <Box minH="100vh">
        <Box 
          p={4} 
          mb={6} 
          borderBottom="4px solid" 
          borderColor="gray.100"
        >
          <Container>
          <Heading size="2xl" mb={7}>
            Notifikasi
          </Heading>
          <Flex 
            justifyContent="space-between" 
            align="center" 
            gap={4} 
            wrap="wrap"
          >
            {/* Tombol Homepage di awal */}
            <Button
              as={Link} 
              to="/"
              colorScheme="blue"
              bg="#44b3f8"
              color="white"
              borderRadius="lg"
              _hover={{ bg: "blue.600" }}
              _active={{ bg: "blue.700" }}
              px={{ base: 4, md: 6 }}
              py={4}
              fontWeight="semibold"
              justifyContent="flex-start"
              h="5vh"
              w={{ base: "100%", sm: "auto", md:"70%" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="xl" />
              Beranda
            </Button>
            
            {/* Tombol Filter, Input, dan Search di akhir */}
            <Flex gap={2} align="center" wrap="wrap">
              <Button
                colorScheme="purple"
                variant="outline"
                mb={{ base: 2, sm: 0 }}
              >
                <FontAwesomeIcon icon={faFilter} />
                Filter
              </Button>
              <Input placeholder="Cari notifikasi..." w={{ base: "100%", sm: "200px" }} />
            </Flex>
          </Flex>
          </Container>
        </Box>
        <Container maxW="container.lg" p={6}>
        {/* Notifications List */}
        <VStack spacing={4} align="stretch" gap={5}>
          {notifications.map((notif, index) => (
            <Flex
              key={index}
              p={4}
              bg="white"
              boxShadow="sm"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.200"
              align="center"
              justify="space-between"
              flexDirection={{ base: "column", sm: "row" }}
            >
              {/* Bagian Kiri: Icon Bell + Info Notifikasi */}
              <Flex align="center" gap={6} flexDirection={{ base: "column", sm: "row" }}>
                {/* Icon Bell */}
                <Box>
                  <FontAwesomeIcon icon={faBell} size="2xl" color="#6B7280" />
                </Box>
                
                {/* Info Notifikasi */}
                <Box>
                  <Badge
                    colorScheme={notif.type === "Promosi" ? "purple" : "gray"}
                    mb={2}
                  >
                    {notif.type}
                  </Badge>
                  <Text fontWeight="bold">{notif.title}</Text>
                  {notif.description && (
                    <Text fontSize="sm" color="gray.600">
                      {notif.description}
                    </Text>
                  )}
                </Box>
              </Flex>

              {/* Bagian Kanan: Tanggal + Status */}
              <Flex align="center" flexDirection={{ base: "column", sm: "row" }}>
                <Text fontSize="sm" color="gray.500" mr={2}>
                  {notif.date}
                </Text>
                <Box
                  w={2}
                  h={2}
                  borderRadius="full"
                  bg={notif.isRead ? "green.400" : "red.400"}
                />
              </Flex>
            </Flex>
          ))}
        </VStack>
        </Container>
      </Box>
  );
};

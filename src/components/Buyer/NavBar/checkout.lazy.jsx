import React from 'react';
import { Box, Flex, HStack, IconButton, Button, useDisclosure, Stack, Input } from '@chakra-ui/react';
import {
    faMagnifyingGlass,
    faXmark,
    faList,
    faBell,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" px={4} borderBottom="2px solid" borderColor="gray.100" >
      <Flex h={16} alignItems="center" justifyContent="space-between" marginLeft={20}>
        <HStack spacing={8} alignItems="center">
          <Box color="purple" fontWeight="bold">Logo</Box>
          <Flex align="center" w="100%" px={4} bg="#EEEEEE" borderRadius="xl" marginLeft={10}>
            <Input
                placeholder="Cari di sini..."
                size="md"              
                bg="#EEEEEE"
                borderColor="#EEEEEE"
                mr={4}                 
                w={{ base: "85%", md: "95%" }}
            />
            <Button bg="#EEEEEE" color="grey" size="lg" w={{ base: "15%", md: "5%" }}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
            </Flex>
        </HStack>
        <HStack spacing={8} alignItems="center" marginRight={10}>
            <Button variant="link" size="md" color="black">
                <FontAwesomeIcon icon={faList} size='md'/>
            </Button>
            <Button variant="link" size="md" color="black">
                <FontAwesomeIcon icon={faBell} size='md'/>
            </Button>
            <Button variant="link" size="md" color="black">
                <FontAwesomeIcon icon={faUser} size='md'/>
            </Button>
        </HStack>
        <IconButton
          size="md"
          icon={isOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faList} />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          color="black"
          bg="#EEEEEE"
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <Button w="full" variant="solid" colorScheme="blue">Home</Button>
            <Button w="full" variant="solid" colorScheme="blue">About</Button>
            <Button w="full" variant="solid" colorScheme="blue">Contact</Button>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default Navbar;

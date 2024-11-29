import {
  Box,
  Text,
  Flex,
  Input,
  Stack,
  HStack,
  List,
  Separator,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { CloseButton } from "../../ui/close-button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputLocation = ({ isFocused, onCloseClick }) => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform={`translate(-50%, -50%) scale(${isFocused ? 1 : 0.8})`}
      w="55vw"
      p="6"
      bg="white"
      px={0}
      shadow="lg"
      borderRadius="md"
      transition="all 0.3s ease"
      zIndex="10"
    >
      <HStack mb={5} px={5}>
        <Flex
          align="center"
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          px={2}
          py={1}
          bg="white"
        >
          {/* Ikon di sebelah kiri */}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{
              marginLeft: "10px",
              fontSize: "20px",
              color: "gray.200",
            }}
          />
          {/* Input field */}
          <Input
            variant="unstyled"
            placeholder="Search"
            width="45vw"
            pl={2}
            py={0}
            focusBorderColor="transparent"
          />
        </Flex>
        <CloseButton onClick={onCloseClick} />
      </HStack>

      <HStack justifyContent="space-between" mb={4} px={5}>
        <Text fontWeight="semibold" fontSize="lg">
          Pencarian Terkini
        </Text>
        <Button fontWeight="semibold" variant="plain" color="red" pr={3}>
          Hapus
        </Button>
      </HStack>

      <List.Root as={Stack} gap="3" listStyle="none">
        <List.Item _hover={{ bgColor: "gray.300" }} px={5}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text mb={1}>Jakarta</Text>
            <CloseButton
              variant="ghost"
              size="md"
              colorPalette="gray"
              borderRadius={0}
            />
          </HStack>
          <Separator />
        </List.Item>
        <List.Item _hover={{ bgColor: "gray.300" }} px={5}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text mb={1}>Singapura</Text>
            <CloseButton
              variant="ghost"
              size="md"
              colorPalette="gray"
              borderRadius={0}
            />
          </HStack>
          <Separator />
        </List.Item>
        <List.Item _hover={{ bgColor: "gray.300" }} px={5}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text mb={1}>Bangkok</Text>
            <CloseButton
              variant="ghost"
              size="md"
              colorPalette="gray"
              borderRadius={0}
            />
          </HStack>
          <Separator />
        </List.Item>
        <List.Item _hover={{ bgColor: "gray.300" }} px={5}>
          <HStack justifyContent="space-between" alignItems="center">
            <Text mb={1}>Kuala Lumpur</Text>
            <CloseButton
              variant="ghost"
              size="md"
              colorPalette="gray"
              borderRadius={0}
            />
          </HStack>
          <Separator />
        </List.Item>
      </List.Root>
    </Box>
  );
};

export default InputLocation;

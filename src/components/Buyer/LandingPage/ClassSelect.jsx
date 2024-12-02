import { Box, Text, Stack, HStack, List, Separator } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { CloseButton } from "../../ui/close-button";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClassSelect = ({ isFocused, onCloseClick }) => {
  return (
    <Box
      position="absolute"
      top="37%"
      left="50%"
      transform={`translate(34%, -10%) scale(${isFocused ? 1 : 0.8})`}
      bg="white"
      w="28vw"
      shadow="lg"
      borderRadius="xl"
      transition="all 0.3s ease"
      zIndex="10"
    >
      <HStack px={5} justifyContent="end" borderBottomWidth="1px">
        <CloseButton onClick={onCloseClick} size="xl" borderRadius={0} />
      </HStack>

      <List.Root as={Stack} gap={2} listStyle="none">
        <List.Item px={5} _hover={{ bgColor: "#44b3f8", color: "white" }}>
          <HStack justifyContent="space-between" alignItems="center" py={1}>
            <Box>
              <Text fontWeight="bold">Economy</Text>
            </Box>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ fontSize: "20px", color: "#73CA5C" }}
            />
          </HStack>
          <Separator />
        </List.Item>
        <List.Item px={5} _hover={{ bgColor: "#44b3f8", color: "white" }}>
          <HStack justifyContent="space-between" alignItems="center" py={1}>
            <Box>
              <Text fontWeight="bold">Premium Economy</Text>
            </Box>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ fontSize: "20px", color: "#73CA5C" }}
            />
          </HStack>
          <Separator />
        </List.Item>
        <List.Item px={5} _hover={{ bgColor: "#44b3f8", color: "white" }}>
          <HStack justifyContent="space-between" alignItems="center" py={1}>
            <Box>
              <Text fontWeight="bold">Business</Text>
            </Box>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ fontSize: "20px", color: "#73CA5C" }}
            />
          </HStack>
          <Separator />
        </List.Item>
        <List.Item px={5} _hover={{ bgColor: "#44b3f8", color: "white" }}>
          <HStack justifyContent="space-between" alignItems="center" py={1}>
            <Box>
              <Text fontWeight="bold">First Class</Text>
            </Box>
            <FontAwesomeIcon
              icon={faCircleCheck}
              style={{ fontSize: "20px", color: "#73CA5C" }}
            />
          </HStack>
          <Separator />
        </List.Item>
      </List.Root>

      <HStack justifySelf="end" px={5}>
        <Button
          bgColor="#44b3f8"
          _hover={{ bgColor: "#2078b8" }}
          my={3}
          px={9}
          py={5}
          borderRadius="xl"
          fontSize="md"
        >
          Simpan
        </Button>
      </HStack>
    </Box>
  );
};

export default ClassSelect;

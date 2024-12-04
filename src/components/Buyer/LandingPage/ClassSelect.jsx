import { useState } from "react";
import { Box, Text, Stack, HStack, List, Separator } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { CloseButton } from "../../ui/close-button";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ClassSelect = ({ isFocused, onCloseClick, onSave }) => {
  const [selectedClass, setSelectedClass] = useState("");

  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  const classes = ["Economy", "Premium Economy", "Business", "First Class"];

  return (
    <Box
      position="absolute"
      top="430px"
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
        {classes.map((className) => (
          <List.Item
            key={className}
            px={5}
            _hover={{ bgColor: "#44b3f8", color: "white" }}
            onClick={() => handleClassClick(className)}
          >
            <HStack justifyContent="space-between" alignItems="center" py={1}>
              <Box>
                <Text fontWeight="bold" cursor="default">
                  {className}
                </Text>
              </Box>
              {selectedClass === className && (
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{ fontSize: "20px", color: "#73CA5C" }}
                />
              )}
            </HStack>
            <Separator />
          </List.Item>
        ))}
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
          onClick={() => {
            onSave(selectedClass);
            onCloseClick();
          }}
        >
          Simpan
        </Button>
      </HStack>
    </Box>
  );
};

export default ClassSelect;

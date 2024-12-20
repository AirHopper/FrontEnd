import React from "react";
import { HStack, Button, Input } from "@chakra-ui/react";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StepperInput = ({ value, min = 0, max = Infinity, onChange }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <HStack>
      <Button
        size="sm"
        onClick={handleDecrement}
        isDisabled={value <= min}
        bgColor="#44b3f8"
        _hover={{ bgColor: "#70caff", color: "white" }}
        _disabled={{
          cursor: "not-allowed",
          bg: "gray.200",
          color: "gray.500",
        }}
        aria-label="Decrement"
      >
        <FontAwesomeIcon icon={faMinus} style={{ fontSize: "15px" }} />
      </Button>
      <Input
        size="sm"
        textAlign="center"
        readOnly
        value={value}
        width="40px"
        aria-label="Value"
      />
      <Button
        size="sm"
        onClick={handleIncrement}
        isDisabled={value >= max}
        bgColor="#44b3f8"
        _hover={{ bgColor: "#70caff", color: "white" }}
        aria-label="Increment"
      >
        <FontAwesomeIcon icon={faPlus} style={{ fontSize: "15px" }} />
      </Button>
    </HStack>
  );
};

export default StepperInput;

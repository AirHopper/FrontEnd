import { HStack, IconButton, NumberInput } from "@chakra-ui/react";
import * as React from "react";
import { LuMinus, LuPlus } from "react-icons/lu";

export const StepperInput = React.forwardRef(function StepperInput(props, ref) {
  const { label, ...rest } = props;
  return (
    <NumberInput.Root {...rest} unstyled ref={ref}>
      {label && <NumberInput.Label>{label}</NumberInput.Label>}
      <HStack gap="2">
        <DecrementTrigger />
        <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
        <IncrementTrigger />
      </HStack>
    </NumberInput.Root>
  );
});

const DecrementTrigger = React.forwardRef(
  function DecrementTrigger(props, ref) {
    return (
      <NumberInput.DecrementTrigger {...props} asChild ref={ref}>
        <IconButton variant="outline" size="sm">
          <LuMinus />
        </IconButton>
      </NumberInput.DecrementTrigger>
    );
  }
);

const IncrementTrigger = React.forwardRef(
  function IncrementTrigger(props, ref) {
    return (
      <NumberInput.IncrementTrigger {...props} asChild ref={ref}>
        <IconButton variant="outline" size="sm">
          <LuPlus />
        </IconButton>
      </NumberInput.IncrementTrigger>
    );
  }
);

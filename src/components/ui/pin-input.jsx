import React from 'react';
import { PinInput as ChakraPinInput, Group } from '@chakra-ui/react';
export const PinInput = React.forwardRef(function PinInput(props, ref) {
    const { count = 6, onChange, ...rest } = props;
    const handleChange = (event) => {
        // Get the value from the input
        const value = event.target.value;
        onChange(value); // Call the onChange prop with the value
        console.log(value)
    };
    return (
        <ChakraPinInput.Root {...rest}>
            <ChakraPinInput.HiddenInput ref={ref} />
            <ChakraPinInput.Control>
                <Group>
                    {Array.from({ length: count }).map((_, index) => (
                        <ChakraPinInput.Input
                            key={index}
                            index={index}
                            onChange={handleChange} // Ensure the onChange is wired correctly
                        />
                    ))}
                </Group>
            </ChakraPinInput.Control>
        </ChakraPinInput.Root>
    );
});
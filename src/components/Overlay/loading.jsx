import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const Overlay = ({ isVisible, message = "Loading..." }) => {
  if (!isVisible) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        bg="white"
        color="black"
        p={5}
        borderRadius="lg"
        textAlign="center"
        boxShadow="lg"
      >
        <Spinner size="xl" color="blue.500" />
        <Text fontFamily="Inter, sans-serif" mt={4}>
          {message}
        </Text>
      </Flex>
    </div>
  );
};

export default Overlay;

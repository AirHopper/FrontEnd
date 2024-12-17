import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Overlay = ({ isVisible, message}) => {
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
        justifyContent="center"
        bg="red"
        color="white"
        p={3}
        borderRadius="lg"
        w="50%"
        textAlign="center"
      >
        <Text fontFamily="Inter, sans-serif" marginRight={10}>{message}</Text>
        <FontAwesomeIcon
          icon={faCircleXmark}
          color="white"
          style={{fontSize: '1.5vw'}}
        />
      </Flex>
    </div>
  );
};
export default Overlay;

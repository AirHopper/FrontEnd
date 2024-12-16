import { Box, Stack, Skeleton } from "@chakra-ui/react";

const TicketSkeletonCard = () => {
  return (
    <Box
      mt={5}
      width="183px"
      height="260px"
      border="none"
      boxShadow="md"
      borderRadius="md"
    >
      <Stack gap="2" padding={3}>
        <Skeleton
          gap="2"
          padding={3}
          width={160}
          borderRadius="lg"
          height={105}
        ></Skeleton>
        <Skeleton gap="2" padding={3}></Skeleton>
        <Skeleton gap="2" padding={3}></Skeleton>
        <Skeleton gap="2" padding={3}></Skeleton>
        <Skeleton gap="2" padding={3}></Skeleton>
      </Stack>
    </Box>
  );
};

export default TicketSkeletonCard;

'use client';

import { Box, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box p={8} maxW="container.xl" mx="auto">
      <Heading mb={4}>Welcome to Western Computer</Heading>
      <Text>Your Next.js migration is in progress!</Text>
    </Box>
  );
}

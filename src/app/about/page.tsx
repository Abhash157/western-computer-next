'use client';

import { Box, Heading, Text } from '@chakra-ui/react';

export default function AboutPage() {
  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>About Us</Heading>
      <Text>Information about our company will be here.</Text>
      {/* TODO: Migrate content from React-website/src/pages/About.tsx */}
    </Box>
  );
} 
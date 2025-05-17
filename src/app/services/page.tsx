'use client'; // Most pages will likely use client components for interactivity or Chakra UI

import { Box, Heading, Text } from '@chakra-ui/react';

export default function ServicesPage() {
  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>Services</Heading>
      <Text>Our services will be listed here.</Text>
      {/* TODO: Migrate content from React-website/src/pages/Services.tsx */}
    </Box>
  );
} 
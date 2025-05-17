'use client';

import { Box, Heading, Text } from '@chakra-ui/react';

export default function ContactPage() {
  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>Contact Us</Heading>
      <Text>Our contact information and form will be here.</Text>
      {/* TODO: Migrate content from React-website/src/pages/Contact.tsx */}
    </Box>
  );
} 
'use client';

import { Box, Heading, Text } from '@chakra-ui/react';

export default function ProductsPage() {
  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>Products</Heading>
      <Text>Our products will be listed here.</Text>
      {/* TODO: Migrate content from React-website/src/pages/Products.tsx */}
    </Box>
  );
} 
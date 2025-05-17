'use client';

import { Box, Heading, Text } from '@chakra-ui/react';

export default function BlogPage() {
  return (
    <Box p={8}>
      <Heading as="h1" mb={4}>Blog</Heading>
      <Text>Our blog posts will be listed here.</Text>
      {/* TODO: Migrate content from React-website/src/pages/Blog.tsx */}
    </Box>
  );
} 
'use client';

import { Box, Heading, Text, SimpleGrid, Button, Image, VStack, HStack, Icon, useColorModeValue, useColorMode, Link as ChakraLink, Container } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaTools, FaLaptop, FaPrint, FaProjectDiagram } from 'react-icons/fa';
import { useRef } from 'react';
import Link from 'next/link'; // Using Next.js Link

// Video path relative to public directory
const circuitVideoPath = '/assets/videos/circuit.mp4';

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const services = [
  {
    icon: FaTools,
    title: 'Computer Maintenance',
    description: 'Professional maintenance and repair services for all your computer needs.',
  },
  {
    icon: FaLaptop,
    title: 'Laptop Services',
    description: 'Expert laptop repair and maintenance services for all brands and models.',
  },
  {
    icon: FaPrint,
    title: 'Printer Solutions',
    description: 'Comprehensive printer repair, maintenance, and parts replacement.',
  },
  {
    icon: FaProjectDiagram,
    title: 'Projector Services',
    description: 'Professional projector setup, maintenance, and repair services.',
  },
];

const featuredProducts = [
  {
    name: 'High-Performance Laptop',
    description: 'Latest generation laptop with powerful specs for all your computing needs.',
    // Path relative to public directory
    image: '/assets/images/products/laptop.jpg',
    price: '$999.99'
  },
  {
    name: 'Color LaserJet Printer',
    description: 'Professional-grade printer with wireless connectivity and duplex printing.',
    image: '/assets/images/products/printer.jpg',
    price: '$449.99'
  },
  {
    name: '4K Projector',
    description: 'Ultra HD projector with smart features and brilliant color accuracy.',
    image: '/assets/images/products/projector.jpg',
    price: '$799.99'
  }
];

export default function HomePage() { // Renamed component to HomePage to avoid conflict if Home was a type
  const { colorMode } = useColorMode();
  const serviceBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const productBg = useColorModeValue('white', 'gray.700');
  const sectionBg = useColorModeValue('gray.50', 'gray.800');
  
  const heroRef = useRef(null);
  // For useScroll to work effectively in Next.js App Router with a specific target,
  // the target needs to be a DOM element. Ensure heroRef is correctly attached.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]); // Adjust transform based on scrollYProgress (0 to 1)

  // Alias Chakra UI's Link as ChakraLink to avoid conflict with Next.js Link
  // This was already done in the import statement.

  return (
    <Box w="100%" overflow="hidden">
      {/* Hero Section */}
      <Box
        ref={heroRef}
        position="relative"
        height={{ base: "80vh", md: "100vh" }}
        overflow="hidden"
        bg="brand.500"
        w="100%"
      >
        {/* Video background */}
        <MotionBox // Changed from Box as=motion.div to MotionBox for consistency
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={0}
          style={{ y }} // y is already a MotionValue from useTransform
          width="100%"
        >
          <Box
            as="video"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            objectFit="cover"
            autoPlay
            muted
            loop
            playsInline
            src={circuitVideoPath} // Use the variable for video path
          />
        </MotionBox>

        {/* Content directly over video */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          px={4}
          textAlign="center"
        >
          <Box maxW="container.xl" px={{ base: 4, md: 6 }}>
            <Heading
              as="h1"
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }} // Responsive font size
              mb={6}
              color={colorMode === 'light' ? 'brand.600' : 'brand.200'} // Adjusted color
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.5)" // Simplified text shadow
              // padding="10px" // Consider if still needed
              // backdropFilter="blur(2px)" // This can be performance intensive, check if necessary
            >
              Western Computer & Multi Trade Link
            </Heading>
            <Text
              fontSize={{ base: 'lg', md: 'xl'}} // Responsive font size
              color="white"
              mb={8}
              textShadow="0 1px 3px rgba(0, 0, 0, 0.5)" // Simplified text shadow
              maxW="container.md"
              mx="auto"
            >
              Your trusted partner for computer maintenance and parts
            </Text>
            <HStack spacing={4} justify="center">
              <Link href="/services" passHref legacyBehavior>
                <ChakraLink _hover={{ textDecoration: 'none' }}>
                  <Button
                    as={motion.button} // Use MotionBox as={Button} or directly animate Button if it supports motion props
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    colorScheme="brand"
                    size="lg"
                  >
                    Request Service
                  </Button>
                </ChakraLink>
              </Link>
              <Link href="/products" passHref legacyBehavior>
                <ChakraLink _hover={{ textDecoration: 'none' }}>
                  <Button
                    as={motion.button}
                    whileHover={{ 
                      scale: 1.05,
                      y: -2,
                      boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    variant="outline"
                    size="lg"
                    color="white"
                    borderColor="white"
                    _hover={{
                      bg: "whiteAlpha.300", // Slightly more visible hover
                      borderColor: "whiteAlpha.800"
                    }}
                  >
                    Browse Products
                  </Button>
                </ChakraLink>
              </Link>
            </HStack>
          </Box>
        </MotionBox>
      </Box>

      {/* Services Section */}
      <Container maxW="container.xl" py={{ base: 12, md: 16}}>
        <Heading textAlign="center" mb={{ base: 8, md: 12}} fontSize={{ base: '2xl', md: '3xl'}}>
          Our Services
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 6, md: 8}}>
          {services.map((service, index) => (
            <Link href="/services" passHref legacyBehavior key={service.title}>
              <ChakraLink _hover={{ textDecoration: 'none' }}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  p={6}
                  bg={serviceBg}
                  borderRadius="xl"
                  boxShadow="lg" // Base shadow
                  cursor="pointer"
                  whileHover={{
                    y: -5, // Enhanced hover effect
                    boxShadow: "xl", // More pronounced shadow on hover
                  }}
                  whileTap={{ scale: 0.98 }}
                  h="100%" // Ensure consistent height for grid items
                  display="flex" flexDirection="column" alignItems="center"
                >
                  <VStack spacing={4} textAlign="center">
                    <Icon as={service.icon} w={10} h={10} color="brand.500" />
                    <Heading size="md">{service.title}</Heading>
                    <Text color={textColor} fontSize="sm">
                      {service.description}
                    </Text>
                  </VStack>
                </MotionBox>
              </ChakraLink>
            </Link>
          ))}
        </SimpleGrid>
      </Container>

      {/* Featured Products Section */}
      <Box py={{ base: 12, md: 16}} bg={sectionBg}>
        <Container maxW="container.xl">
          <Heading textAlign="center" mb={{ base: 8, md: 12}} fontSize={{ base: '2xl', md: '3xl'}}>
            Featured Products
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 6, md: 8}}>
            {featuredProducts.map((product, index) => (
              <Link href={`/products`} passHref legacyBehavior key={index}>
                <ChakraLink _hover={{ textDecoration: 'none' }}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }} // Stagger animation
                    whileHover={{ 
                      scale: 1.03,
                      y: -5, // Enhanced hover effect
                      boxShadow: "xl"
                    }}
                    whileTap={{ scale: 0.98 }}
                    bg={productBg}
                    borderRadius="xl"
                    boxShadow="lg"
                    overflow="hidden" // Ensure image corners are rounded
                    h="100%" // Ensure consistent height
                    display="flex" flexDirection="column"
                  >
                    <MotionImage 
                      src={product.image} 
                      alt={product.name} 
                      width="100%" 
                      height={{ base: "200px", md: "220px" }} // Fixed height for images
                      objectFit="cover"
                    />
                    <VStack p={6} spacing={3} alignItems="start" flexGrow={1}>
                      <Heading size="md">{product.name}</Heading>
                      <Text color={textColor} fontSize="sm" flexGrow={1}>{product.description}</Text>
                      <Text fontWeight="bold" color="brand.500">{product.price}</Text>
                    </VStack>
                  </MotionBox>
                </ChakraLink>
              </Link>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      {/* ... more content from original Home.tsx ... */}
    </Box>
  );
}

'use client';

import { Box, Container, Flex, useColorMode, IconButton, Button, Stack, useDisclosure, VStack, Text as ChakraText } from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Link from 'next/link'; // Changed from react-router-dom
import { usePathname } from 'next/navigation'; // Changed from react-router-dom
import { motion } from 'framer-motion'; // useScroll and useTransform are not directly used here, can be removed if not needed for other elements
import { useEffect, useState, useRef } from 'react'; // Added useRef

const MotionBox = motion(Box);

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Products', path: '/products' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const pathname = usePathname(); // Next.js hook
  const navContainerRef = useRef<HTMLDivElement>(null); // Ref for the entire nav container including mobile
  const [navHeight, setNavHeight] = useState(64); // Default nav height

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = prevScrollPos < currentScrollPos;
      // Keep nav visible if at top or scrolling up, hide if scrolling down past a certain point (e.g., 50px)
      const threshold = 50; // Only hide if scrolled down more than 50px
      setIsNavVisible(currentScrollPos < threshold || !isScrollingDown || currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    if (navContainerRef.current) {
      setNavHeight(navContainerRef.current.offsetHeight);
    }
  }, [isOpen, colorMode]); // Recalculate on isOpen change (mobile nav) or other changes that might affect height

  // Mobile navigation drawer (if isOpen)
  const MobileNav = () => (
    <Box pb={4} display={{ md: 'none' }} w="100%">
      <Stack as={'nav'} spacing={4}>
        {navItems.map((item) => (
          <Button
            key={item.path}
            as={Link}
            href={item.path}
            variant="ghost"
            w="full"
            textAlign="left"
            color={colorMode === 'light' ? 'gray.700' : 'white'}
            onClick={isOpen ? onToggle : undefined} // Close drawer on click
            _hover={{ bg: colorMode === 'light' ? 'gray.200' : 'gray.700', color: 'brand.500' }}
            isActive={pathname === item.path}
            _activeLink={{ fontWeight: 'bold', color: 'brand.500' }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box minH="100vh" w="100vw" overflowX="hidden">
      <MotionBox // Changed Box to MotionBox for animation
        ref={navContainerRef} // Attach ref here
        as="nav"
        position="fixed"
        w="100%"
        zIndex={1100} // Ensure nav is above most things, Chakra default modal zIndex is 1400
        bg={colorMode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(26, 32, 44, 0.8)'}
        backdropFilter="blur(8px)"
        boxShadow={isNavVisible ? (colorMode === 'light' ? 'sm' : 'dark-sm') : 'none'} // Add subtle shadow when visible
        initial={{ y: 0 }}
        animate={{ y: isNavVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Link href="/">
              <MotionBox
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                fontWeight="bold"
                fontSize="xl"
                color={colorMode === 'light' ? 'brand.500' : 'brand.300'} // Adjusted color for dark mode
              >
                Western Computer
              </MotionBox>
            </Link>

            <Stack direction="row" spacing={{ base: 2, sm: 4}} display={{ base: 'none', md: 'flex' }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  as={Link} // Use Next.js Link
                  href={item.path}
                  variant="ghost"
                  color={colorMode === 'light' ? 'gray.700' : 'gray.200'} // Adjusted color for dark mode
                  _hover={{
                    bg: colorMode === 'light' ? 'gray.100' : 'whiteAlpha.200',
                    color: colorMode === 'light' ? 'brand.500' : 'brand.300',
                  }}
                  position="relative"
                  sx={{
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '0px',
                      left: '50%',
                      transform: pathname === item.path ? 'scaleX(1) translateX(-50%)' : 'scaleX(0) translateX(-50%)',
                      width: 'calc(100% - 1rem)', // Adjust width based on padding
                      height: '2px',
                      bg: 'brand.500',
                      transition: 'transform 0.3s ease-in-out',
                      transformOrigin: 'center',
                    }
                  }}
                  isActive={pathname === item.path}
                  fontWeight={pathname === item.path ? 'semibold' : 'normal'}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>

            <Flex alignItems="center">
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
                variant="ghost"
                mr={{ base: 0, sm: 2 }}
              />
              <IconButton
                aria-label="Toggle menu"
                icon={isOpen ? <CloseIcon w={4} h={4} /> : <HamburgerIcon w={5} h={5} />}
                onClick={onToggle}
                variant="ghost"
                display={{ base: 'flex', md: 'none' }}
              />
            </Flex>
          </Flex>
          {/* Mobile Navigation Drawer Content */}
          {isOpen && <MobileNav />}
        </Container>
      </MotionBox>

      {/* The main content area no longer has padding-top. Pages manage their own spacing if needed. */}
      {/* If isNavVisible is false, the nav is translated up, so navHeight effectively becomes 0 for margin */}
      <Box as="main" w="100%" style={{ paddingTop: isNavVisible ? navHeight : 0, transition: 'padding-top 0.3s ease-in-out' }}>
        {children}
      </Box>

      <Box
        as="footer"
        bg={colorMode === 'light' ? 'gray.50' : 'gray.900'} // Adjusted for better contrast
        borderTop="1px"
        borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
        py={10} // Adjusted padding
        w="100%"
      >
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap={6} // Adjusted gap
          >
            <VStack align={{ base: 'center', md: 'start' }} spacing={3}>
              <Link href="/">
                <MotionBox
                  whileHover={{ scale: 1.05 }}
                  fontWeight="bold"
                  fontSize="lg"
                  color={colorMode === 'light' ? 'brand.500' : 'brand.300'}
                >
                  Western Computer
                </MotionBox>
              </Link>
              <Box textAlign={{ base: 'center', md: 'left'}} color={colorMode === 'light' ? 'gray.600' : 'gray.400'} maxW="md">
                Your trusted partner in computer maintenance and parts. Serving with excellence since 2010.
              </Box>
            </VStack>
            <Stack 
              direction={{ base: 'column', sm: 'row' }} 
              spacing={{ base: 3, sm: 5}} // Adjusted spacing
              align="center"
              wrap="wrap" // Allow wrapping on smaller screens
              justify={{ base: 'center', sm: 'end'}}
            >
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  as={Link}
                  href={item.path}
                  variant="ghost"
                  size="sm"
                  color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
                  _hover={{
                    color: colorMode === 'light' ? 'brand.500' : 'brand.300',
                    transform: 'translateY(-1px)', // Subtle hover effect
                  }}
                  isActive={pathname === item.path}
                  fontWeight={pathname === item.path ? 'semibold' : 'normal'}
                >
                  {item.label}
                </Button>
              ))}
            </Stack>
          </Flex>
          <ChakraText textAlign="center" mt={8} fontSize="sm" color={colorMode === 'light' ? 'gray.500' : 'gray.500'}>
            © {new Date().getFullYear()} Western Computer. All rights reserved.
          </ChakraText>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout; 
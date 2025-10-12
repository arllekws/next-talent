// app/components/Layouts/Footer.tsx
'use client';

import { Box, Text, VStack, Heading, Input, Button, Flex, HStack, Icon } from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa';
import { RiUserStarLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <Box bg="gray.500" color="gray.300" mt={20}>
      <Box maxW="4xl" mx="auto" px={{ base: 4, md: 8 }} py={10}>
        <VStack spacing={1} align="stretch">

          {/* Logo */}
          <HStack justify="center" spacing={2}>
            
            <Heading size="md" color="white">NexTalent</Heading>
            <Icon as={RiUserStarLine} w={6} h={6} color="brand.400" />
          </HStack>

          {/* Newsletter */}
          <VStack spacing={4} align="center">
            <Text fontWeight="bold" color="white">Fique por dentro</Text>
            <Flex w={{ base: '100%', md: 'auto' }} maxW="md">
              <Input
                placeholder="Seu endereço de email"
                size="md"
                bg="gray.700"
                borderWidth={0}
                focusBorderColor="teal.400"
                borderRadius="md"
              />
              <Button colorScheme="teal" ml={2} borderRadius="md">
                Inscrever
              </Button>
            </Flex>
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Receba novidades e promoções diretamente no seu e-mail.
            </Text>
          </VStack>

          {/* Copyright */}
          <Text fontSize="sm" color="gray.500" textAlign="center">
            © 2025 NexTalent. Todos os direitos reservados.
          </Text>

        </VStack>
      </Box>
    </Box>
  );
};

export default Footer;

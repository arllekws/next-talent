'use client';

import { useAuth } from '@/context/AuthContext';
import {
  Box,
  Avatar,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Badge,
  Spinner,
  Container,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  // 🔹 Simulação de dados adicionais do perfil
  const [interests] = useState([
    'Desenvolvimento Web',
    'Tecnologia e Inovação',
    'UI/UX Design',
    'Inteligência Artificial',
  ]);

  const [preferences] = useState([
    'Prefere trabalhar remotamente',
    'Gosta de projetos colaborativos',
    'Aprende melhor com aulas práticas',
  ]);

  if (loading) {
    return (
      <Box minH="100vh" bg={bgColor} display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" color="teal.400" />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box minH="100vh" bg={bgColor} display="flex" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Heading size="md">Você precisa estar logado para ver seu perfil.</Heading>
        </VStack>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} py={10}>
      <Container maxW="3xl">
        <Box
          bg={cardBg}
          borderRadius="2xl"
          boxShadow="md"
          p={8}
          borderWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <VStack spacing={5} align="center">
            {/* --- Cabeçalho do Perfil --- */}
            <Avatar
              name={user.displayName || 'Usuário'}
              src={user.photoURL || undefined}
              size="2xl"
              mb={3}
            />
            <Heading>{user.displayName || 'Usuário sem nome'}</Heading>
            <Text color={textColor}>{user.email}</Text>

            <Divider my={4} />

            {/* --- Interesses --- */}
            <Box w="full" textAlign="left">
              <Heading size="md" mb={3}>
                Interesses
              </Heading>
              <HStack spacing={3} flexWrap="wrap">
                {interests.map((item, index) => (
                  <Badge key={index} colorScheme="teal" px={3} py={1} borderRadius="full">
                    {item}
                  </Badge>
                ))}
              </HStack>
            </Box>

            {/* --- Preferências --- */}
            <Box w="full" textAlign="left">
              <Heading size="md" mb={3}>
                Preferências
              </Heading>
              <VStack align="start" spacing={2}>
                {preferences.map((pref, index) => (
                  <Text key={index} color={textColor}>
                    • {pref}
                  </Text>
                ))}
              </VStack>
            </Box>

            <Divider my={4} />

            <Button colorScheme="teal" variant="outline">
              Editar Perfil (em breve)
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

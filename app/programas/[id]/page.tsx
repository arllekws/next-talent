'use client';

import { useParams } from 'next/navigation';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Spinner,
  Container,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useProgramStore } from '@/lib/store/useProgramStore';

export default function ProgramDetailPage() {
  const { id } = useParams();
  const { programs } = useProgramStore();

  const program = programs.find(p => String(p.id) === String(id));

  const bgCard = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subText = useColorModeValue('gray.500', 'gray.400');

  if (!program) {
    return (
      <Container maxW="3xl" py={10}>
        <Box bg={bgCard} p={8} borderRadius="2xl" boxShadow="md" textAlign="center">
          <Heading size="lg">Programa não encontrado</Heading>
          <Link href="/dashboard">
            <Button mt={6} colorScheme="teal">Voltar</Button>
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="3xl" py={10}>
      <Box bg={bgCard} p={8} borderRadius="2xl" boxShadow="lg">
        <VStack align="start" spacing={6}>
          {/* --- Cabeçalho --- */}
          <Heading color={textColor}>{program.title}</Heading>
          <HStack spacing={3}>
            <Text color={subText}>Oferecido por: {program.companyName}</Text>
            <Badge colorScheme="teal">{program.type}</Badge>
          </HStack>

          <Divider />

          {/* --- Informações principais --- */}
          <Divider />

          {/* --- Descrição --- */}
          <Box>
            <Heading size="md" mb={2}>Descrição</Heading>
            <Text color={subText}>{program.description || 'Sem descrição disponível.'}</Text>
          </Box>

          <Divider />

          {/* --- Botões --- */}
          <HStack spacing={4} mt={4}>
            <Button colorScheme="teal" flex={1}>Inscrever-se</Button>
            <Link href="/" style={{ flex: 1 }}>
              <Button variant="outline" flex={1}>Voltar</Button>
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Container>
  );
}

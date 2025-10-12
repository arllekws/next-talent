'use client';

import { useParams } from 'next/navigation';
import { Box, Heading, Text, Button, VStack, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useProgramStore } from '@/lib/store/useProgramStore';

export default function ProgramDetailPage() {
  const { id } = useParams();
  const { programs } = useProgramStore();

  const program = programs.find(p => String(p.id) === String(id));

  if (!program) {
    return (
      <Box p={8}>
        <Heading>Programa não encontrado</Heading>
        <Link href="/dashboard">
          <Button mt={4} colorScheme="teal">Voltar</Button>
        </Link>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <VStack align="start" spacing={4}>
        <Heading>{program.title}</Heading>
        <Text color="gray.600">Oferecido por: {program.companyName}</Text>
        <Text><strong>Tipo:</strong> {program.type}</Text>
        <Text><strong>Prazo:</strong> {program.deadline}</Text>
        <Text><strong>Inscritos:</strong> {program.participants}</Text>
        <Text><strong>Descrição:</strong> {program.description || 'Sem descrição disponível.'}</Text>

        <Button colorScheme="teal">Inscrever-se</Button>

        <Link href="/dashboard">
          <Button variant="outline">Voltar</Button>
        </Link>
      </VStack>
    </Box>
  );
}
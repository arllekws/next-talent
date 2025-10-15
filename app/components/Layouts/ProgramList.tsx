'use client';

import { useState, useMemo } from 'react';
import {
  Box,
  VStack,
  HStack,
  Select,
  Input,
  Button,
  SimpleGrid,
  Heading,
  Text,
  useColorModeValue,
  Collapse,
  IconButton,
} from '@chakra-ui/react';
import { FaFilter } from 'react-icons/fa';
import OpportunityCard from './OportunityCard';
import type { Program } from '@/lib/types';

interface ProgramListProps {
  programs: Program[];
  isLoading?: boolean;
}

export default function ProgramList({ programs, isLoading }: ProgramListProps) {
  const [filters, setFilters] = useState({
    area: '',
    type: '',
    level: '',
    deadline: '',
  });

  const [showFilters, setShowFilters] = useState(false);

  const bgFilters = useColorModeValue('gray.50', 'gray.800');

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      return (
        (filters.area === '' || p.area === filters.area) &&
        (filters.type === '' || p.type === filters.type) &&
        (filters.level === '' || p.level === filters.level) &&
        (filters.deadline === '' || new Date(p.deadline) >= new Date(filters.deadline))
      );
    });
  }, [filters, programs]);

  const clearFilters = () =>
    setFilters({ area: '', type: '', level: '', deadline: '' });

  if (isLoading) {
    return <Text textAlign="center">Carregando programas...</Text>;
  }

  return (
    <VStack spacing={6} align="stretch" width="100%">
      {/* --- Filter Bar --- */}
      <HStack justify="space-between" align="center" mb={2}>
  <Heading size="md">Programas</Heading>

  <Button
    variant="outline"
    leftIcon={<FaFilter />}
    onClick={() => setShowFilters((prev) => !prev)}
    size="sm"
  >
    Filtros
  </Button>
</HStack>

      {/* --- Filtros deslizantes --- */}
      <Collapse in={showFilters} animateOpacity>
        <Box
          bg={bgFilters}
          p={5}
          borderRadius="2xl"
          shadow="md"
          mb={4}
          transition="all 0.3s"
        >
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
            <Select
              placeholder="Área"
              value={filters.area}
              onChange={(e) => setFilters({ ...filters, area: e.target.value })}
            >
              <option value="Tecnologia">Tecnologia</option>
              <option value="Engenharia">Engenharia</option>
              <option value="Pesquisa">Pesquisa</option>
            </Select>

            <Select
              placeholder="Modalidade"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            >
              <option value="Estágio">Estágio</option>
              <option value="Trainee">Trainee</option>
              <option value="Bolsa">Bolsa</option>
            </Select>

            <Select
              placeholder="Nível"
              value={filters.level}
              onChange={(e) => setFilters({ ...filters, level: e.target.value })}
            >
              <option value="Júnior">Júnior</option>
              <option value="Pleno">Pleno</option>
              <option value="Sênior">Sênior</option>
            </Select>

            <Input
              type="date"
              placeholder="Período de inscrição até"
              value={filters.deadline}
              onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
            />
          </SimpleGrid>

          <HStack mt={4} justify="flex-end">
            <Button size="sm" variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </HStack>
        </Box>
      </Collapse>

      {/* --- Lista de Programas --- */}
      {filteredPrograms.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          Nenhum programa encontrado com esses filtros.
        </Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          {filteredPrograms.map((program) => (
            <OpportunityCard key={program.id} opportunity={program} />
          ))}
        </SimpleGrid>
      )}
    </VStack>
  );
}

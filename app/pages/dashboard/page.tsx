// src/pages/dashboard/page.tsx

'use client';


import {
  Box, Container, Grid, GridItem, Heading, Text, VStack, HStack, Button,
  Card, CardHeader, CardBody, Flex, useColorModeValue, Center, Spinner
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

// Layouts e Componentes
import UserHeader from '@/components/Layouts/UserHeader'; // <-- O Header agora é independente
import Footer from '@/components/Layouts/Footer';
import { OpportunityCard } from '@/components/Layouts/OportunityCard';

// Stores
import { useProgramStore } from '@/lib/store/useProgramStore';
import { useUserDashboardStore } from '@/lib/store/useUserDashboardStore';

// Contexto de Autenticação
import { useAuth } from '@/context/AuthContext'; // <-- IMPORTANTE: Adicionamos o AuthContext
import ProgramList from '@/components/Layouts/ProgramList';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<'opportunities' | 'saved' | 'applications'>('opportunities');
  
  // 1. Pegamos o estado de autenticação do Firebase
  const { user, loading: authLoading } = useAuth();

  // 2. Conectamos aos stores do Zustand
  const { programs, isLoading: programsLoading, fetchPrograms } = useProgramStore();
  const { savedPrograms, fetchDashboardData } = useUserDashboardStore();

  // 3. O useEffect agora depende do 'user' para buscar os dados
  useEffect(() => {
    // Só busca os dados se o usuário estiver logado
    if (user) {
      fetchPrograms();
      fetchDashboardData();
    }
  }, [user, fetchPrograms, fetchDashboardData]); // <-- 'user' é uma dependência

  // Constantes de estilo
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // --- Renderização Condicional ---

  // Estado de Carregamento da Autenticação
  if (authLoading) {
    return (
      <Box minH="100vh" bg={bgColor}>
        <UserHeader />
        <Center h="80vh">
          <Spinner size="xl" color="brand.500" />
        </Center>
      </Box>
    );
  }

  // Estado Deslogado
  if (!user) {
    return (
      <Box minH="100vh" bg={bgColor}>
        <UserHeader />
        <Container maxW="7xl" py={8}>
          <Center h="70vh" flexDirection="column" textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              Bem-vindo ao NexTalent
            </Heading>
            <Text fontSize="xl" color="gray.500">
              Faça login com sua conta Google para descobrir novas oportunidades.
            </Text>
          </Center>
        </Container>
        <Footer />
      </Box>
    );
  }

  // Estado Logado (renderiza o dashboard completo)
  return (
    <Box minH="100vh" bg={bgColor}>
      {/* 4. O UserHeader não recebe mais NENHUMA prop */}
      <UserHeader />
      
      <Container maxW="7xl" py={8}>
        <Box mb={8}>
          <VStack align="start" spacing={1}>
              <Heading size="lg">Bem-vindo(a), {user.displayName}!</Heading>
              <Text color="gray.500">Aqui está o seu painel de oportunidades.</Text>
          </VStack>
        </Box>

        <Grid templateColumns={{ base: '1fr', lg: '4fr 1fr' }} gap={6}>
          {/* Main Content */}
          <GridItem>
            <Card bg={cardBg} borderWidth="1px" borderColor={borderColor}>
              <CardHeader>
                <HStack justify="space-between" mb={4}>
                  <Heading size="md">Oportunidades Disponíveis</Heading>
                </HStack>
                <HStack spacing={4}>
                  <Button size="sm" variant={activeTab === 'opportunities' ? 'solid' : 'ghost'} colorScheme="teal" onClick={() => setActiveTab('opportunities')}>Novas Oportunidades</Button>
                  {/* <Button size="sm" variant={activeTab === 'applications' ? 'solid' : 'ghost'} colorScheme="teal" onClick={() => setActiveTab('applications')}>Minhas Inscrições</Button> */}
                  <Button size="sm" variant={activeTab === 'saved' ? 'solid' : 'ghost'} colorScheme="teal" onClick={() => setActiveTab('saved')}>Favoritos</Button>
                </HStack>
              </CardHeader>
              <CardBody>
                <CardBody>
  {activeTab === 'opportunities' && (
    <ProgramList programs={programs} isLoading={programsLoading} />
  )}

  {activeTab === 'saved' && (
    savedPrograms.length > 0 ? (
      <VStack spacing={4} align="stretch">
        {savedPrograms.map((program) => (
          <OpportunityCard key={program.id} opportunity={program} />
        ))}
      </VStack>
    ) : (
      <Text color="gray.500">Nenhuma oportunidade favoritada ainda.</Text>
    )
  )}
</CardBody>

              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default DashboardPage;
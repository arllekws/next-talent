import Link from 'next/link';
import {
  Card,
  CardBody,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Icon,
  Button,
  Box,
  useColorModeValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaUsers, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useUserDashboardStore } from '@/lib/store/useUserDashboardStore';

interface Opportunity {
  id: number | string;
  title: string;
  companyName: string;
  type: string;
  deadline: string;
  status: 'open' | 'closing-soon' | string;
  participants: number;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const getStatusColor = (status: string) => {
  if (status === 'closing-soon') return 'orange.400';
  if (status === 'open') return 'green.400';
  return 'gray.400';
};

const getStatusLabel = (status: string) => {
  if (status === 'closing-soon') return 'Encerrando em Breve';
  if (status === 'open') return 'Aberto';
  return 'Fechado';
};

export const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const { toggleFavorite, isFavorite } = useUserDashboardStore();
  const favorite = isFavorite(opportunity.id);
  const isClosed = getStatusLabel(opportunity.status) === 'Fechado';

  const bgCard = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const subText = useColorModeValue('gray.500', 'gray.400');

  // --- Novo Layout ---
  const cardContent = (
    <Card
      bg={bgCard}
      borderRadius="2xl"
      p={5}
      _hover={{ bg: !isClosed ? hoverBg : bgCard, shadow: 'lg' }}
      transition="all 0.2s"
      opacity={isClosed ? 0.6 : 1}
      width="100%"
    >
      <HStack align="start" spacing={6} justify="space-between">
        {/* --- Coluna Principal: Texto --- */}
        <VStack align="start" spacing={3} flex={1}>
          {/* Título */}
          <Heading size="md" color={textColor}>
            {opportunity.title}
          </Heading>

          {/* Empresa + Tipo */}
          <HStack spacing={3}>
            <Text fontSize="sm" color={subText}>
              {opportunity.companyName}
            </Text>
            <Badge colorScheme="teal">{opportunity.type}</Badge>
          </HStack>

          {/* Status + Inscritos + Prazo */}
          {/* <HStack spacing={5} fontSize="sm" color={subText}>
            <HStack>
              <Icon as={FaCalendarAlt} />
              <Text>Até {opportunity.deadline}</Text>
            </HStack>
            <HStack>
              <Icon as={FaUsers} />
              <Text>{opportunity.participants} inscritos</Text>
            </HStack>
            <Badge colorScheme={getStatusColor(opportunity.status)}>
              {getStatusLabel(opportunity.status)}
            </Badge>
          </HStack> */}
        </VStack>

        {/* --- Coluna de Ações --- */}
        <VStack spacing={2}>
          <Tooltip label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}>
            <IconButton
              aria-label="Favoritar"
              icon={favorite ? <FaHeart color="red" /> : <FaRegHeart />}
              variant="outline"
              colorScheme="red"
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(opportunity);
              }}
            />
          </Tooltip>

          <Button
            isDisabled={isClosed}
            colorScheme="teal"
            size="sm"
            w="full"
          >
            Detalhes
          </Button>
        </VStack>
      </HStack>
    </Card>
  );

  if (isClosed) return <Box>{cardContent}</Box>;

  return (
    <Link href={`/programas/${opportunity.id}`} style={{ textDecoration: 'none' }}>
      {cardContent}
    </Link>
  );
};

export default OpportunityCard;

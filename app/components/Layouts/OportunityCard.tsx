// app/components/Cards/OpportunityCard.tsx
'use client';

import Link from 'next/link';
import {
  Card,
  CardBody,
  HStack,
  VStack,
  Heading,
  Text,
  Badge,
  Icon,
  Button,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';

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

// Funções utilitárias de status
const getStatusColor = (status: string) => {
  if (status === 'closing-soon') return 'brand.300'; // Tan
  if (status === 'open') return 'brand.500'; // Moss Green
  return 'gray';
};

const getStatusLabel = (status: string) => {
  if (status === 'closing-soon') return 'Encerrando em Breve';
  if (status === 'open') return 'Aberto';
  return 'Fechado';
};

export const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  const isClosed = getStatusLabel(opportunity.status) === 'Fechado';

  const borderColor = useColorModeValue('brand.300', 'brand.700');
  const hoverBorder = useColorModeValue('brand.500', 'brand.300');
  const bgCard = useColorModeValue('brand.100', 'gray.800');
  const textColor = useColorModeValue('brand.900', 'brand.100');
  const subText = useColorModeValue('gray.600', 'gray.400');

  const cardContent = (
    <Card
      variant="outline"
      bg={bgCard}
      borderColor={borderColor}
      _hover={!isClosed ? { shadow: 'md', cursor: 'pointer', borderColor: hoverBorder } : {}}
      transition="all 0.2s"
      width="100%"
      opacity={isClosed ? 0.6 : 1}
    >
      <CardBody>
        <HStack justify="space-between" align="start" mb={3}>
          <VStack align="start" spacing={1} flex={1}>
            <Heading size="sm" color={textColor}>
              {opportunity.title}
            </Heading>
            <HStack spacing={2} wrap="wrap">
              <Text fontSize="sm" color={subText}>
                {opportunity.companyName}
              </Text>
              <Text fontSize="sm" color="gray.500" display={{ base: 'none', md: 'block' }}>
                •
              </Text>
              <Badge bg="brand.500" color="white">
                {opportunity.type}
              </Badge>
            </HStack>
          </VStack>
          <Badge bg={getStatusColor(opportunity.status)} color="white">
            {getStatusLabel(opportunity.status)}
          </Badge>
        </HStack>

        <HStack justify="space-between" mt={4}>
          <HStack spacing={4} fontSize="sm" color={subText}>
            <HStack>
              <Icon as={FaCalendarAlt} />
              <Text>Até {opportunity.deadline}</Text>
            </HStack>
            <HStack>
              <Icon as={FaUsers} />
              <Text>{opportunity.participants} inscritos</Text>
            </HStack>
          </HStack>

          <Button
            isDisabled={isClosed}
            size="sm"
            colorScheme="brand"
            bg="brand.500"
            _hover={{ bg: 'brand.700' }}
            variant="solid"
            display={{ base: 'none', md: 'flex' }}
          >
            Inscrever-se
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );

  if (isClosed) {
    return <Box>{cardContent}</Box>;
  }

  return (
    <Link href={`/programas/${opportunity.id}`} style={{ textDecoration: 'none' }}>
      {cardContent}
    </Link>
  );
};

export default OpportunityCard;

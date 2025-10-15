// src/components/Layouts/UserHeader.tsx

'use client';

import {
  Box, Flex, Button, Avatar, Menu, MenuButton, MenuList, MenuItem,
  MenuDivider, HStack, Text, Link, useColorModeValue, Spinner,
  Icon
} from '@chakra-ui/react';
import { FaUser, FaSignOutAlt, FaBell, FaGoogle } from 'react-icons/fa'; // Adicionado FaGoogle
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext'; // IMPORTAMOS O NOSSO HOOK
import { RiUserStarLine } from 'react-icons/ri';

const UserHeader = () => {
  // Agora usamos todas as funções do contexto
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const router = useRouter();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const menuBg = useColorModeValue('white', 'gray.800');

  const handleLogout = async () => {
    await logout();
    // O redirect não é mais necessário, a página se atualizará sozinha
  };

  const handleEditProfile = () => {
    router.push('/pages/profile');
  };

  return (
    <Box as="header" p={4} borderBottomWidth="1px" borderColor={borderColor} bg={menuBg}>
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        {/* Logo (sempre visível) */}
        <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
  <HStack spacing={2} align="center">
    <Icon as={RiUserStarLine} w={6} h={6} color="brand.400" />
    <Text fontWeight="bold" color="brand.500" fontSize="xl">
      NexTalent
    </Text>
  </HStack>
</Link>

        {/* Lógica condicional de renderização */}
        <HStack spacing={4}>
          {loading && <Spinner color="brand.500" />}

          {/* Se não estiver carregando E não houver usuário, mostra o botão de login */}
          {!loading && !user && (
            <Button
              leftIcon={<FaGoogle />}
              onClick={signInWithGoogle}
              colorScheme="teal"
              variant="solid"
            >
              Entrar com Google
            </Button>
          )}

          {/* Se não estiver carregando E houver usuário, mostra o menu */}
          {!loading && user && (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                cursor="pointer"
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              >
                <HStack spacing={3}>
                  <Avatar size="sm" name={user.displayName || ''} src={user.photoURL || ''} />
                  <Box display={{ base: 'none', md: 'block' }} textAlign="left">
                    <Text fontSize="sm" fontWeight="600">
                      {user.displayName}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      Ver perfil
                    </Text>
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg={menuBg} border="none" boxShadow="xl" rounded="xl" py={2}>
  <Box px={4} py={3} bg="gray.50" borderBottom="1px solid" borderColor="gray.200" roundedTop="xl">
    <Text fontSize="sm" fontWeight="bold">
      {user.displayName}
    </Text>
    <Text fontSize="xs" color="gray.500">
      {user.email}
    </Text>
  </Box>

  <MenuItem
    icon={<FaUser />}
    _hover={{ bg: "blue.50", color: "blue.600" }}
    onClick={handleEditProfile}
  >
    Meu Perfil
  </MenuItem>

  <MenuDivider />

  <MenuItem
    icon={<FaSignOutAlt />}
    _hover={{ bg: "red.50", color: "red.600" }}
    onClick={handleLogout}
  >
    Sair
  </MenuItem>
</MenuList>
            </Menu>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default UserHeader;
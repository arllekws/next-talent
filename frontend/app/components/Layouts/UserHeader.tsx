'use client';

import {
  Box, Flex, Button, Avatar, Menu, MenuButton, MenuList, MenuItem,
  MenuDivider, HStack, useColorModeValue, Spinner, Icon
} from '@chakra-ui/react';
import { FaUser, FaSignOutAlt, FaGoogle } from 'react-icons/fa';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { RiUserStarLine } from 'react-icons/ri';

const UserHeader = () => {
  const { user, loading, signInWithGoogle, logout } = useAuth();
  const router = useRouter();
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const menuBg = useColorModeValue('white', 'gray.800');
  const hoverBg = useColorModeValue('gray.100', 'gray.700');

  const handleLogout = async () => {
    await logout();
  };

  const handleEditProfile = () => {
    router.push('/pages/profile');
  };

  return (
    <Box as="header" p={4} borderBottomWidth="1px" borderColor={borderColor} bg={menuBg}>
      <Flex justify="space-between" align="center" maxW="7xl" mx="auto">
        {/* Logo */}
        <NextLink href="/" passHref>
          <HStack spacing={2} cursor="pointer">
            <Icon as={RiUserStarLine} w={6} h={6} color="brand.400" />
          </HStack>
        </NextLink>

        {/* Área do usuário */}
        <HStack spacing={4}>
          {loading && <Spinner color="brand.500" />}

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

          {!loading && user && (
            <Menu>
              <MenuButton>
                <Avatar
                  size="sm"
                  name={user.displayName || ''}
                  src={user.photoURL || ''}
                  cursor="pointer"
                  _hover={{ transform: 'scale(1.1)', transition: '0.2s' }}
                />
              </MenuButton>

              <MenuList bg={menuBg} border="none" boxShadow="xl" rounded="xl" py={2}>
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

import { Button, Box, Heading, VStack, Text } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Box bg="gray.100" minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box bg="white" p={10} rounded="lg" shadow="lg" maxW="md" w="full" textAlign="center">
        <Heading mb={6} color="blue.600">Next Talent</Heading>
        <Text mb={8} color="gray.600">
          Escolha como deseja acessar a plataforma
        </Text>

        <VStack spaceX={4}>
          <Button colorScheme="blue" w="full">Sou Talento</Button>
          <Button colorScheme="green" w="full">Sou Empresa</Button>
        </VStack>
      </Box>
    </Box>
  );
}

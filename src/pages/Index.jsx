import { Container, Text, VStack, Button } from "@chakra-ui/react";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Click the button below to create a node.</Text>
        <Button colorScheme="blue">Create Node</Button>
      </VStack>
    </Container>
  );
};

export default Index;

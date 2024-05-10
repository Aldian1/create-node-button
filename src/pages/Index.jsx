import { Container, Text, VStack } from "@chakra-ui/react";
import ReactFlow, { MiniMap, Controls } from "reactflow";
import "reactflow/dist/style.css";

const Index = () => {
  const nodes = [{ id: "1", type: "default", position: { x: 250, y: 5 }, data: { label: "Hello World" } }];
  const edges = [];

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <MiniMap />
          <Controls />
        </ReactFlow>
      </VStack>
    </Container>
  );
};

export default Index;

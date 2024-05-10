import { Button, Container, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactFlow, { MiniMap, Controls } from "reactflow";
import "reactflow/dist/style.css";

const Index = () => {
  const nodes = [{ id: "1", type: "default", position: { x: 250, y: 5 }, data: { label: "Hello World" } }];
  const edges = [];

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <ReactFlow nodes={nodes} edges={edges} fitView style={{ width: "100%", height: "100vh" }}>
        <MiniMap />
        <Controls />
      </ReactFlow>
    </Container>
  );
};

export default Index;

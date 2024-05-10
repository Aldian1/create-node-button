import React from "react";
import { Button, Container, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ReactFlow, { MiniMap, Controls } from "reactflow";
import "reactflow/dist/style.css";

const Index = () => {
  const [nodes, setNodes] = React.useState([{ id: "1", type: "default", position: { x: 250, y: 5 }, data: { label: "Hello World" }, draggable: true }]);
  const edges = [];

  const addNode = () => {
    const newNode = {
      id: (nodes.length + 1).toString(),
      type: "default",
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
      data: { label: `Node ${nodes.length + 1}` },
      draggable: true,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="relative">
      <VStack spacing={4}>
        <Button colorScheme="blue" onClick={addNode} position="absolute" bottom="20px" right="20px">
          Add Node
        </Button>
        <ReactFlow nodes={nodes} edges={edges} fitView style={{ width: "100%", height: "100%" }}>
          <MiniMap />
          <Controls />
        </ReactFlow>
      </VStack>
    </Container>
  );
};

export default Index;

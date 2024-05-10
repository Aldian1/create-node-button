import { Button, Container, Text, VStack, useDisclosure } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ReactFlow, { MiniMap, Controls } from "reactflow";
import "reactflow/dist/style.css";

const Index = () => {
  const [nodes, setNodes] = React.useState([{ id: "1", type: "default", position: { x: 250, y: 5 }, data: { label: "Hello World" }, draggable: true }]);
  const addNode = useCallback(() => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "default",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}` },
      draggable: true,
    };
    setNodes((nds) => [...nds, newNode]);
  }, [nodes]);
  const edges = [];

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <ReactFlow nodes={nodes} edges={edges} fitView style={{ width: "100%", height: "100vh", position: "relative" }}>
        <Button onClick={addNode} colorScheme="blue" position="absolute" top="10px" right="10px" zIndex="10">
          Add Node
        </Button>
        <MiniMap />
        <Controls />
      </ReactFlow>
    </Container>
  );
};

export default Index;

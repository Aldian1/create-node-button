import { Button, Container, Input } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import ReactFlow, { MiniMap, Controls, useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";

const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([{ id: "1", type: "default", position: { x: 250, y: 5 }, data: { label: "Hello World" } }]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeName, setNodeName] = useState("");
  const [editingNode, setEditingNode] = useState(null);

  const handleDoubleClick = (event, node) => {
    setEditingNode(node);
    setNodeName(node.data.label);
  };

  const handleNameChange = (event) => {
    setNodeName(event.target.value);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setNodes((nds) => nds.map((n) => (n.id === editingNode.id ? { ...n, data: { ...n.data, label: nodeName } } : n)));
    setEditingNode(null);
  };

  const addNode = useCallback(() => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "default",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [nodes, setNodes]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onNodeDoubleClick={handleDoubleClick} onConnect={(params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: "#000" } }, eds))} fitView style={{ width: "100%", height: "100vh", position: "relative" }}>
        {editingNode && (
          <form onSubmit={handleNameSubmit} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "10", background: "white" }}>
            <Input value={nodeName} onChange={handleNameChange} onBlur={handleNameSubmit} autoFocus />
          </form>
        )}
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

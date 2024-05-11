import { Button, Container, Input } from "@chakra-ui/react";
import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";

const Index = () => {
  const initialNodes = JSON.parse(localStorage.getItem("nodes")) || [{ id: "1", type: "default", position: { x: 250, y: 5 }, data: { label: "Hello World" } }];
  const initialEdges = JSON.parse(localStorage.getItem("edges")) || [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
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
    setNodes((nds) => {
      const updatedNodes = nds.map((n) => (n.id === editingNode.id ? { ...n, data: { ...n.data, label: nodeName } } : n));
      localStorage.setItem("nodes", JSON.stringify(updatedNodes));
      return updatedNodes;
    });
    setEditingNode(null);
  };

  const handleSave = () => {
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
  };

  const handleLoad = () => {
    const loadedNodes = JSON.parse(localStorage.getItem("nodes")) || [];
    const loadedEdges = JSON.parse(localStorage.getItem("edges")) || [];
    setNodes(loadedNodes);
    setEdges(loadedEdges);
  };

  const handleClear = () => {
    localStorage.clear();
    setNodes([]);
    setEdges([]);
  };

  useEffect(() => {
    handleClear();
  }, []);

  const addNode = useCallback(() => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "default",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nds) => {
      const newNodes = nds.concat(newNode);
      localStorage.setItem("nodes", JSON.stringify(newNodes));
      return newNodes;
    });
  }, [nodes, setNodes]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDoubleClick={handleDoubleClick}
        onConnect={(params) =>
          setEdges((eds) => {
            const newEdges = addEdge({ ...params, animated: true, style: { stroke: "#000" } }, eds);
            localStorage.setItem("edges", JSON.stringify(newEdges));
            return newEdges;
          })
        }
        fitView
        style={{ width: "100%", height: "100vh", position: "relative" }}
      >
        {editingNode && (
          <form onSubmit={handleNameSubmit} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "10", background: "white" }}>
            <Input value={nodeName} onChange={handleNameChange} onBlur={handleNameSubmit} autoFocus />
          </form>
        )}
        <Button onClick={addNode} colorScheme="blue" position="absolute" top="10px" right="100px" zIndex="10">
          Add Node
        </Button>
        <MiniMap />
        <Button onClick={handleSave} colorScheme="green" position="absolute" top="10px" right="10px" zIndex="10">
          Save
        </Button>
        <Button onClick={handleClear} colorScheme="red" position="absolute" top="50px" right="10px" zIndex="10">
          Clear
        </Button>
        <Controls />
      </ReactFlow>
    </Container>
  );
};

export default Index;

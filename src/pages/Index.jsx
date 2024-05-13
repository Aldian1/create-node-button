// Import necessary components and icons from Chakra UI, React Icons, and React packages
import React, { useCallback, useState, useEffect } from "react";
import { Button, Container, Input, Flex, Spacer } from "@chakra-ui/react";
import { FaPlus, FaMicrophone, FaStop, FaTrash } from "react-icons/fa";
import ReactFlow, { MiniMap, Controls, useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";

// Functional component Index
const Index = () => {
  // Retrieve initial nodes and edges from localStorage, or use default if empty
  const initialNodes = JSON.parse(localStorage.getItem("nodes")) || [{ id: "1", type: "default", position: { x: 0, y: 0 }, data: { label: "Hello World", name: "item-1" } }];
  // Assign names to nodes based on their index
  initialNodes.forEach((node, index) => {
    node.data.name = `item-${index + 1}`;
  });
  // Retrieve initial edges from localStorage, or use empty array if empty
  const initialEdges = JSON.parse(localStorage.getItem("edges")) || [];
  
  // State variables using custom hooks from React Flow
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeName, setNodeName] = useState(""); // State for node name input
  const [isRecording, setIsRecording] = useState(false); // State for recording status
  const [mediaRecorder, setMediaRecorder] = useState(null); // State for media recorder
  const [audioURL, setAudioURL] = useState(localStorage.getItem("audioURL") || ""); // State for audio URL
  const [editingNode, setEditingNode] = useState(null); // State for editing node

  // Handler for double-clicking on a node to edit its name
  const handleDoubleClick = (event, node) => {
    setEditingNode(node);
    setNodeName(node.data.label);
  };

  // Handler for changing node name input
  const handleNameChange = (event) => {
    setNodeName(event.target.value);
  };

  // Handler for submitting node name change
  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (editingNode) {
      setNodes((nds) => {
        const updatedNodes = nds.map((n, index) => (n.id === editingNode.id ? { ...n, data: { ...n.data, label: nodeName, name: `item-${index + 1}` } } : n));
        localStorage.setItem("nodes", JSON.stringify(updatedNodes));
        return updatedNodes;
      });
      setEditingNode(null);
    }
    setEditingNode(null);
    setNodeName("");
  };

  // Handler for starting/stopping voice recording
  const handleVoiceRecord = () => {
    if (isRecording) {
      mediaRecorder.stop();
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
        recorder.ondataavailable = (event) => {
          const audioBlob = new Blob([event.data], { type: "audio/wav" });
          const audioURL = URL.createObjectURL(audioBlob);
          setAudioURL(audioURL);
          localStorage.setItem("audioURL", audioURL);
        };
        setIsRecording(true);
      });
    }
  };

  // Handler for deleting recorded audio
  const handleDeleteAudio = () => {
    setAudioURL("");
    localStorage.removeItem("audioURL");
  };

  // Function to add a new node
  const addNode = useCallback(() => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "default",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}`, name: `item-${nodes.length + 1}` },
    };
    setNodes((nds) => {
      const newNodes = nds.concat(newNode);
      localStorage.setItem("nodes", JSON.stringify(newNodes));
      return newNodes;
    });
  }, [nodes, setNodes]);

  // Render JSX
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
        style={{ width: "100vw", height: "100vh", position: "relative" }}
      >
        {/* Render nodes */}
        {nodes.map((node) => (
          <div key={node.id} style={{ position: "absolute", top: node.position.y, left: node.position.x }}>
            <NodeName name={node.data.name} />
          </div>
        ))}
        {/* Render node name input if editing */}
        {editingNode && (
          <form onSubmit={handleNameSubmit} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "10", background: "white" }}>
            <Input value={nodeName} onChange={handleNameChange} onBlur={handleNameSubmit} autoFocus />
          </form>
        )}
        {/* Render buttons for adding nodes, recording voice, and managing recorded audio */}
        <Flex position="absolute" top="10px" left="10px" right="10px" zIndex="10" justifyContent="space-between" alignItems="center">
          <Button onClick={addNode} colorScheme="blue" leftIcon={<FaPlus />}>
            Add Node
          </Button>
          <Spacer />
          {isRecording ? (
            <Button onClick={handleVoiceRecord} colorScheme="red" leftIcon={<FaStop />}>
              Stop Recording
            </Button>
          ) : (
            <Button onClick={handleVoiceRecord} colorScheme="blue" leftIcon={<FaMicrophone />}>
              Record Voice
            </Button>
          )}
          {audioURL && (
            <>
              <audio controls src={audioURL} style={{ marginLeft: "10px" }} />
              <Button onClick={handleDeleteAudio} colorScheme="red" leftIcon={<FaTrash />} style={{ marginLeft: "10px" }}>
                Delete Recording
              </Button>
            </>
          )}
        </Flex>
        {/* Render controls for panning and zooming */}
        <Controls />
        {/* Render voice transcription component if recording */}
        {isRecording && <VoiceTranscription />}
      </ReactFlow>
    </Container>
  );
};

// Export the component as default
export default Index;
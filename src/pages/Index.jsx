import { Button, Container, Input, Flex, Spacer } from "@chakra-ui/react";
import { FaPlus, FaMicrophone, FaStop, FaTrash } from "react-icons/fa";
import React, { useCallback, useState, useEffect } from "react";
import VoiceTranscription from "../components/VoiceTranscription";
import ReactFlow, { MiniMap, Controls, useNodesState, useEdgesState, addEdge } from "reactflow";
import "reactflow/dist/style.css";

const Index = () => {
  const initialNodes = JSON.parse(localStorage.getItem("nodes")) || [{ id: "1", type: "default", position: { x: 250, y: 5 }, data: { label: "Hello World", name: "item-1" } }];
  initialNodes.forEach((node, index) => {
    node.data.name = `item-${index + 1}`;
  });
  const initialEdges = JSON.parse(localStorage.getItem("edges")) || [];
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeName, setNodeName] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(localStorage.getItem("audioURL") || "");
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
      const updatedNodes = nds.map((n, index) => (n.id === editingNode.id ? { ...n, data: { ...n.data, label: nodeName, name: `item-${index + 1}` } } : n));
      localStorage.setItem("nodes", JSON.stringify(updatedNodes));
      return updatedNodes;
    });
    setEditingNode(null);
  };

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

  const handleDeleteAudio = () => {
    setAudioURL("");
    localStorage.removeItem("audioURL");
  };
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
        {nodes.map((node) => (
          <div key={node.id} style={{ position: "absolute", top: node.position.y, left: node.position.x, background: "grey", padding: "2px 5px", borderRadius: "3px", color: "white", fontSize: "10px" }}>
            {node.data.name}
          </div>
        ))}
        <form onSubmit={handleNameSubmit} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: "10", background: "white" }}>
          <Input value={nodeName} onChange={handleNameChange} onBlur={handleNameSubmit} autoFocus />
        </form>
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
        <Controls />
        {isRecording && <VoiceTranscription />}
      </ReactFlow>
    </Container>
  );
};

export default Index;

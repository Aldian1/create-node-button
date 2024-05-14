import { Button } from "@chakra-ui/react";
import NodeName from "./NodeName";
import React from "react";

const ButtonNode = ({ data, id, setNodes, setEdges }) => {
  const addConnectedNode = () => {
    const newNode = {
      id: `node-${id}-connected`,
      type: "custom",
      position: { x: data.position.x + 200, y: data.position.y + 200 },
      data: { label: `Connected to ${data.label}`, name: `item-${id}-connected`, style: { opacity: 0.5 } },
    };
    setNodes((nds) => {
      const newNodes = nds.concat(newNode);
      localStorage.setItem("nodes", JSON.stringify(newNodes));
      return newNodes;
    });
    setEdges((eds) => {
      const newEdges = eds.concat({ id: `edge-${id}-connected-${Date.now()}`, source: id, target: newNode.id });
      localStorage.setItem("edges", JSON.stringify(newEdges));
      return newEdges;
    });
  };

  return (
    <div style={{ padding: 10, border: "1px solid #ddd", borderRadius: 5, background: "#fff" }}>
      <div>{data.label}</div>
      <NodeName name={data.name} />
    </div>
  );
};

export default ButtonNode;

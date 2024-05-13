import React from "react";

const NodeName = ({ name }) => {
  return <div style={{ position: "absolute", top: 0, right: 0, background: "grey", padding: "2px 5px", borderRadius: "3px", color: "white", fontSize: "10px" }}>{name}</div>;
};

export default NodeName;

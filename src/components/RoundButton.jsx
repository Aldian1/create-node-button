import { Button } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import React from "react";

const RoundButton = ({ position }) => {
  const handleClick = () => {
    console.log("Round button clicked");
  };

  return <Button onClick={handleClick} position="absolute" left={`${position.x}px`} top={`${position.y}px`} transform="translate(-50%, -50%)" borderRadius="50%" width="40px" height="40px" zIndex="10" colorScheme="blue" leftIcon={<FaPlus />} />;
};

export default RoundButton;

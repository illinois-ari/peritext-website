import { motion } from "framer-motion";
import React from "react";

interface HeadingProps {
  text: string;
  color?: string;
}

const Heading: React.FC<HeadingProps> = ({ text, color = "black" }) => {
  return (
    <motion.h1
      className="text-2xl font-bold mb-4"
      style={{ color }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {text}
    </motion.h1>
  );
};

export default Heading;

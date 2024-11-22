import { motion } from "framer-motion";

interface SubHeadingProps {
  text: string;
  color?: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ text, color = "black" }) => {
  return (
    <motion.h2
      className="text-3xl font-bold mb-6 font-playfairDisplay leading-normal tracking-wide"
      style={{ color }} // Apply color from prop or default to black
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 0 }}
      // transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {text}
    </motion.h2>
  );
};

export default SubHeading;

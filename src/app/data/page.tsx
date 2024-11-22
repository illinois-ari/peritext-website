'use client';
import PageSkeleton from "@/components/PageSkeleton";
import { dataData } from "@/modules/DataData";
import { FaTools, FaHammer } from "react-icons/fa";
import { motion } from "framer-motion";

const accentColor = "#FF6347";
const secondaryColor = "#1E3A8A";

export default function Data() {
  const { body } = dataData[0];

  return (
    <PageSkeleton title="Dataset, Exploration & Visualizations" showLine lineColor={accentColor}>
      <motion.div
        // initial={{ opacity: 0, y: 10 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="mb-8 text-gray-700 leading-relaxed">{body}</p>
      </motion.div>

      {/* In-progress indicator */}
      <motion.div
        className="h-[30vh] flex items-center justify-center space-x-4 mt-8"
        // initial={{ opacity: 0, y: 20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <FaTools size="2rem" color={secondaryColor} />
        </motion.div>
        <span className="text-lg font-medium">
          This page is under construction
        </span>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <FaHammer size="2rem" color={secondaryColor} />
        </motion.div>
      </motion.div>
    </PageSkeleton>
  );
}

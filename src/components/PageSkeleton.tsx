"use client";

import { motion } from "framer-motion";
import React from "react";
import Heading from "@/components/Heading";

interface PageSkeletonProps {
  title: string;
  children: React.ReactNode;
  showLine?: boolean;
  lineColor?: string;
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({ title, children, showLine = false, lineColor = "black" }) => {
  return (
    <motion.div className="mx-auto px-[4%] py-[1.5%] shadow-lg min-h-full overflow-x-hidden text-black">
      <Heading text={title} />
      
      {/* Horizontal line, only displayed if showLine is true */}
      {showLine && (
        <hr
          className="mx-auto my-6"
          style={{
            width: "20%",
            borderBottom: `${0.25}rem solid ${lineColor}`,
          }}
        />
      )}
      
      <div>{children}</div>
    </motion.div>
  );
};

export default PageSkeleton;

"use client";
import PageSkeleton from "@/components/PageSkeleton";
import { aboutData } from "@/modules/AboutData";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const accentColor = "#36aa5d";

export default function About() {
  return (
    <PageSkeleton title="About the Project" showLine lineColor={accentColor}>
      {aboutData.map((section) => {
        if (section.type === "text") {
          return (
            <motion.p
              key={section.id}
              className="mb-6 text-base leading-relaxed tracking-normal"
              initial={false} // No animation initially
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: section.id * 0.1 }}
              viewport={{ once: true }}
            >
              {section.content}
            </motion.p>
          );
        } else if (section.type === "image") {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true });

          return (
            <motion.div
              ref={ref}
              key={section.id}
              className={`mb-6 ${
                section.align === "left"
                  ? "md:float-left md:mr-6"
                  : "md:float-right md:ml-6"
              } w-full md:w-1/4`}
              initial={false} // No animation initially
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: section.id * 0 }}
            >
              <img
                src={section.src}
                alt={section.alt}
                className="w-full h-auto"
              />
            </motion.div>
          );
        }
      })}
      <div className="clear-both" />
    </PageSkeleton>
  );
}

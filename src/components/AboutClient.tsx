"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";
import { richTextToHtml } from "@/utils/richTextParser";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

type AboutSection = {
  id: string;
  type: "text" | "image";
  content?: DefaultTypedEditorState;
  image?: {
    file: {
      url: string; // Fetch from media collection
    };
    alt?: string;
    align: "left" | "right";
  };
};

export default function AboutClient({ aboutData }: { aboutData: AboutSection[] }) {
  return (
    <>
      {aboutData.map((section) => {
        if (section.type === "text" && section.content) {
          return (
            <motion.div
              key={section.id}
              className="mb-6 text-base leading-relaxed tracking-normal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              dangerouslySetInnerHTML={{ __html: richTextToHtml(section.content) }} // Converts rich text to HTML
            />
          );
        } else if (section.type === "image" && section.image?.file?.url) {
          const ref = useRef(null);
          const isInView = useInView(ref, { once: true });

          const getImagePath = (url: string) => {
            if (!url) return "";
          
            // If the URL is absolute (e.g., from S3/CDN), return as-is
            if (url.startsWith("http")) return url;
          
            // Ensure basePath is only added if it's missing
            return url.startsWith(BASE_PATH) ? url : `${BASE_PATH}${url}`;
          };
          
          const imagePath = getImagePath(section.image.file.url);

          return (
            <motion.div
              ref={ref}
              key={section.id}
              className={`mb-6 ${
                section.image.align === "left"
                  ? "md:float-left md:mr-6"
                  : "md:float-right md:ml-6"
              } w-full md:w-1/4`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <img
                src={imagePath}
                alt={section.image.alt || "About Image"}
                className="w-full h-auto"
              />
            </motion.div>
          );
        }
      })}
      <div className="clear-both" />
    </>
  );
}
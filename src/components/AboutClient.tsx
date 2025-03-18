"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

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
                src={section.image.file.url}
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

// Function to convert Lexical rich text JSON to HTML
function richTextToHtml(content: DefaultTypedEditorState): string {
  if (!content?.root?.children) return "";

  return content.root.children
    .map((node) => {
      if (node.type === "paragraph") {
        return `<p>${node.children?.map(convertTextNode).join("")}</p>`;
      }
      return "";
    })
    .join("");
}

function convertTextNode(node: any): string {
  if (node.type === "text") {
    let text = node.text;
    if (node.format & 1) text = `<b>${text}</b>`; // Bold
    if (node.format & 2) text = `<i>${text}</i>`; // Italics
    if (node.format & 4) text = `<u>${text}</u>`; // Underline
    return text;
  }
  if (node.type === "link" && node.url) {
    return `<a href="${node.url}" target="_blank" rel="noopener noreferrer">${node.children?.map(convertTextNode).join("")}</a>`;
  }
  return "";
}
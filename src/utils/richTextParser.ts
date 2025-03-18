import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical";

// Convert Lexical Rich Text JSON to HTML
export function richTextToHtml(content: DefaultTypedEditorState): string {
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

// Convert text nodes (bold, italic, underline, links)
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
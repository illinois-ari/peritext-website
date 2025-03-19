import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

interface RichTextToHtmlOptions {
  underlineColor?: string
  underlineThickness?: string
  underlineOffset?: string
  paragraphSpacing?: string // New option for paragraph spacing
}

export function richTextToHtml(
  content: SerializedEditorState,
  options?: RichTextToHtmlOptions,
): string {
  if (!content?.root) return ''

  let html = convertLexicalToHTML({ data: content })

  // Remove unwanted parentheses (if any) around links
  html = html.replace(/\(\s*<a /g, '<a ').replace(/<\/a>\s*\)/g, '</a>')

  // Normalize spaces to prevent extra gaps
  html = html.replace(/\s+/g, ' ').trim()

  // Apply underline styles if options are provided
  if (options?.underlineColor || options?.underlineThickness || options?.underlineOffset) {
    const color = options.underlineColor || 'inherit'
    const thickness = options.underlineThickness || '0.125rem'
    const offset = options.underlineOffset || '0.125rem'

    html = html.replace(
      /<span style="text-decoration: underline;([^>]*)">/g,
      `<span style="text-decoration: underline; text-decoration-color: ${color}; text-decoration-thickness: ${thickness}; text-underline-offset: ${offset};$1">`,
    )
  }

  // ✅ Add spacing between paragraphs if multiple are detected
  const paragraphSpacing = options?.paragraphSpacing || '1rem' // Default spacing
  html = html.replace(/<\/p>\s*<p>/g, `</p><p style="margin-top: ${paragraphSpacing};">`)

  return html
}
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

interface RichTextToHtmlOptions {
  underlineColor?: string
  underlineThickness?: string
  underlineOffset?: string
  underlineTextColor?: string 
  paragraphSpacing?: string
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

  // Underline + text styling
  if (
    options?.underlineColor ||
    options?.underlineThickness ||
    options?.underlineOffset ||
    options?.underlineTextColor
  ) {
    const underlineColor = options.underlineColor || 'inherit'
    const thickness = options.underlineThickness || '0.125rem'
    const offset = options.underlineOffset || '0.125rem'
    const textColor = options.underlineTextColor || 'inherit'

    html = html.replace(
      /<span style="text-decoration: underline;([^>]*)">/g,
      `<span style="text-decoration: underline; text-decoration-color: ${underlineColor}; text-decoration-thickness: ${thickness}; text-underline-offset: ${offset}; color: ${textColor}; $1">`
    )
  }

  // Paragraph spacing
  const paragraphSpacing = options?.paragraphSpacing || '1rem'
  const paragraphs = html.match(/<p[^>]*>[\s\S]*?<\/p>/g)

  if (paragraphs && paragraphs.length > 1) {
    html = paragraphs
      .map((p, i) => {
        if (i === 0) return p
        // Add or merge margin-top onto the actual <p> tag only
        const hasStyle = /<p[^>]*style="/.test(p)
        if (hasStyle) {
          return p.replace(
            /<p([^>]*?)style="([^"]*?)"/,
            `<p$1style="margin-top: ${paragraphSpacing}; $2"`
          )
        } else {
          return p.replace(
            /<p/,
            `<p style="margin-top: ${paragraphSpacing};"`
          )
        }
      })
      .join('')
  }

  return html
}
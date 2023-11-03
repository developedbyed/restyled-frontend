"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Toolbar } from "./Toolbar"

export default function Tiptap({
  description,
  setRichText,
}: {
  description: string
  setRichText: (richText: string) => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {},
        heading: {
          levels: [2],
          HTMLAttributes: {
            class: "text-xl font-bold",
            levels: [2],
          },
        },
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md  border border-input bg-background px-3 py-2 my-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      setRichText(editor.getHTML())
    },
  })

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

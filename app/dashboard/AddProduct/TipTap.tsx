"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Toolbar } from "./Toolbar";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: any;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
      }),
      Placeholder.configure({
        placeholder: "Write your product description",
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border border-input bg-background px-3 py-2 my-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      console.log(editor.getHTML());
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent className="min-h-[80px] border-1" editor={editor} />
    </div>
  );
}

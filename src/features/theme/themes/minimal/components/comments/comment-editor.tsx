import type { JSONContent } from "@tiptap/react";
import { useEditor } from "@tiptap/react";
import { Send } from "lucide-react";
import { useState } from "react";
import { getCommentExtensions } from "@/features/comments/components/editor/config";

interface CommentEditorProps {
  onSubmit: (content: JSONContent) => Promise<void>;
  isSubmitting: boolean;
  placeholder?: string;
}

export function CommentEditor({ onSubmit, isSubmitting }: CommentEditorProps) {
  const [isEmpty, setIsEmpty] = useState(true);
  const editor = useEditor({
    extensions: getCommentExtensions(),
    onUpdate: ({ editor: e }) => setIsEmpty(e.isEmpty),
  });

  const handleSubmit = async () => {
    if (!editor || editor.isEmpty) return;
    const content = editor.getJSON();
    try {
      await onSubmit(content);
      editor.commands.clearContent();
    } catch {
      // keep content on error
    }
  };

  return (
    <div className="rounded-lg p-4 space-y-3" style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)" }}>
      <div
        className="min-h-[80px] text-sm focus:outline-none ProseMirror"
        style={{ color: "var(--mag-text)" }}
        ref={(el) => {
          if (el && editor) {
            el.innerHTML = "";
            // Mount editor to element
            const view = editor.view;
            if (view.dom.parentNode !== el) {
              el.appendChild(view.dom);
            }
          }
        }}
      />
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || isEmpty}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-40"
          style={{ background: "var(--mag-accent)" }}
        >
          <Send size={14} />
          {isSubmitting ? "Posting..." : "Comment"}
        </button>
      </div>
    </div>
  );
}

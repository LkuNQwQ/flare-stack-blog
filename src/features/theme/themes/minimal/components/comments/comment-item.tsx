import type { JSONContent } from "@tiptap/react";
import { MessageSquare, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import { extensions } from "@/features/posts/editor/config";

interface CommentData {
  id: number;
  content: JSONContent;
  userId: string;
  userName: string;
  userImage?: string | null;
  createdAt: Date | string;
  replies?: CommentData[];
}

interface CommentItemProps {
  comment: CommentData;
  postId: number;
  currentUserId?: string;
  onReply: (rootId: number, commentId: number, userName: string) => void;
  onDelete: (id: number) => void;
  isRoot?: boolean;
  rootId?: number;
}

function formatDate(date: Date | string) {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function CommentContent({ content }: { content: JSONContent }) {
  const rendered = useMemo(() => {
    try {
      return renderToReactElement({ extensions, content, options: {} });
    } catch {
      return <p style={{ color: "var(--mag-text-secondary)" }}>[Unable to render]</p>;
    }
  }, [content]);
  return <div className="mag-prose text-sm">{rendered}</div>;
}

export function CommentItem({ comment, currentUserId, onReply, onDelete, rootId }: CommentItemProps) {
  const effectiveRootId = rootId ?? comment.id;

  return (
    <div className="space-y-3" id={`comment-${comment.id}`}>
      <div className="flex items-start gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: "var(--mag-tag-bg)", color: "var(--mag-text-secondary)" }}
        >
          {comment.userName?.charAt(0)?.toUpperCase() ?? "?"}
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: "var(--mag-text)" }}>{comment.userName}</span>
            <span className="text-xs" style={{ color: "var(--mag-text-muted)" }}>{formatDate(comment.createdAt)}</span>
          </div>
          <CommentContent content={comment.content} />
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={() => onReply(effectiveRootId, comment.id, comment.userName)}
              className="text-xs flex items-center gap-1 transition-colors hover:opacity-80"
              style={{ color: "var(--mag-text-muted)" }}
            >
              <MessageSquare size={12} /> Reply
            </button>
            {currentUserId === comment.userId && (
              <button
                onClick={() => onDelete(comment.id)}
                className="text-xs flex items-center gap-1 transition-colors hover:opacity-80"
                style={{ color: "var(--mag-text-muted)" }}
              >
                <Trash2 size={12} /> Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 space-y-4" style={{ borderLeft: "2px solid var(--mag-border)", paddingLeft: "1rem" }}>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={0}
              currentUserId={currentUserId}
              onReply={onReply}
              onDelete={onDelete}
              isRoot={false}
              rootId={effectiveRootId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

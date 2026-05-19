import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { JSONContent } from "@tiptap/react";
import { LogIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Turnstile, useTurnstile } from "@/components/common/turnstile";
import { useComments } from "@/features/comments/hooks/use-comments";
import { rootCommentsByPostIdInfiniteQuery } from "@/features/comments/queries";
import { authClient } from "@/lib/auth/auth.client";
import { CommentEditor } from "./comment-editor";
import { CommentItem } from "./comment-item";

interface CommentSectionProps {
  postId: number;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const { data: session } = authClient.useSession();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(rootCommentsByPostIdInfiniteQuery(postId, session?.user.id));

  const rootComments = data?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  const { createComment, deleteComment, isCreating } = useComments(postId);

  const [replyTarget, setReplyTarget] = useState<{
    rootId: number;
    commentId: number;
    userName: string;
  } | null>(null);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const { isPending: turnstilePending, reset: resetTurnstile, turnstileProps } = useTurnstile("comment");

  const requireTurnstile = () => {
    if (!turnstilePending) return false;
    toast.error("Please complete the verification");
    turnstileRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    throw new Error("TURNSTILE_PENDING");
  };

  const handleCreateComment = async (content: JSONContent) => {
    requireTurnstile();
    try {
      await createComment({ data: { postId, content } });
    } finally {
      resetTurnstile();
    }
  };

  const handleCreateReply = async (content: JSONContent) => {
    if (!replyTarget) return;
    requireTurnstile();
    try {
      await createComment({ data: { postId, content, rootId: replyTarget.rootId, replyToCommentId: replyTarget.commentId } });
      setReplyTarget(null);
    } finally {
      resetTurnstile();
    }
  };

  useEffect(() => {
    if (isLoading || !data) return;
    const hash = window.location.hash;
    if (!hash?.startsWith("#comment-")) return;
    const commentId = parseInt(hash.replace("#comment-", ""), 10);
    if (isNaN(commentId)) return;
    let retries = 0;
    const attempt = () => {
      const el = document.getElementById(`comment-${commentId}`);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
      if (retries++ < 20) setTimeout(attempt, 200);
    };
    attempt();
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <div className="space-y-4 pt-12">
        <div className="mag-skeleton h-6 w-32" />
        <div className="mag-skeleton h-24 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <section className="space-y-8 pt-12" style={{ borderTop: "1px solid var(--mag-border)" }}>
      <h2 className="text-lg font-bold" style={{ color: "var(--mag-text)" }}>
        Comments ({totalCount})
      </h2>

      {session ? (
        <div className="space-y-3">
          {replyTarget && (
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--mag-text-secondary)" }}>
              Replying to <strong>{replyTarget.userName}</strong>
              <button onClick={() => setReplyTarget(null)} className="underline hover:opacity-80">Cancel</button>
            </div>
          )}
          <CommentEditor
            onSubmit={replyTarget ? handleCreateReply : handleCreateComment}
            isSubmitting={isCreating}
          />
        </div>
      ) : (
        <div className="py-8 text-center space-y-3">
          <p className="text-sm" style={{ color: "var(--mag-text-muted)" }}>Join the discussion</p>
          <Link to="/login">
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium text-white"
              style={{ background: "var(--mag-accent)" }}
            >
              <LogIn size={14} /> Log in
            </span>
          </Link>
        </div>
      )}

      <div ref={turnstileRef}>
        <Turnstile {...turnstileProps} />
      </div>

      <div className="space-y-6">
        {rootComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={{
              ...comment,
              content: comment.content ?? {},
              userId: comment.userId ?? "",
              userName: comment.user?.name ?? "Anonymous",
            }}
            postId={postId}
            currentUserId={session?.user.id}
            onReply={(rootIdArg, commentId, userName) => setReplyTarget({ rootId: rootIdArg, commentId, userName })}
            onDelete={(id) => deleteComment({ data: { id } })}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ background: "var(--mag-surface)", border: "1px solid var(--mag-border)", color: "var(--mag-text-secondary)" }}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </section>
  );
}

import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import type { TableOfContentsItem } from "@/features/posts/utils/toc";
import { useActiveTOC } from "@/hooks/use-active-toc";

export default function TableOfContents({
  headers,
}: {
  headers: Array<TableOfContentsItem>;
}) {
  const activeId = useActiveTOC(headers);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeId && navRef.current) {
      const container = navRef.current;
      const activeLink = container.querySelector(`a[href="#${CSS.escape(activeId)}"]`);
      if (activeLink instanceof HTMLElement) {
        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const linkTop = container.scrollTop + (linkRect.top - containerRect.top);
        const linkBottom = linkTop + linkRect.height;
        const padding = 40;
        if (linkBottom > container.scrollTop + containerRect.height - padding) {
          container.scrollTo({ top: linkBottom - containerRect.height + padding, behavior: "smooth" });
        } else if (linkTop < container.scrollTop + padding) {
          container.scrollTo({ top: Math.max(0, linkTop - padding), behavior: "smooth" });
        }
      }
    }
  }, [activeId]);

  if (headers.length === 0) return null;

  return (
    <nav
      ref={navRef}
      className="sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto"
      style={{ scrollbarWidth: "thin" }}
    >
      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--mag-text-muted)" }}>
        Contents
      </p>
      <ul className="space-y-2 list-none m-0 p-0">
        {headers.map((node) => (
          <li key={node.id}>
            <a
              href={`#${node.id}`}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(node.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                  navigate({ hash: node.id, replace: true, hashScrollIntoView: false });
                }
              }}
              className="block text-xs leading-relaxed py-0.5 transition-colors duration-200"
              style={{
                marginLeft: `${(node.level - 2) * 0.75}rem`,
                paddingLeft: "0.75rem",
                borderLeft: `2px solid ${activeId === node.id ? "var(--mag-accent)" : "var(--mag-border)"}`,
                color: activeId === node.id ? "var(--mag-accent)" : "var(--mag-text-muted)",
                fontWeight: activeId === node.id ? 600 : 400,
              }}
            >
              {node.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

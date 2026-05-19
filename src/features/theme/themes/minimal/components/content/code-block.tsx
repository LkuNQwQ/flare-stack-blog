import { Check, Copy } from "lucide-react";
import { memo, useState } from "react";

const LANGUAGE_MAP: Record<string, string> = {
  ts: "TypeScript", typescript: "TypeScript",
  js: "JavaScript", javascript: "JavaScript",
  jsx: "JSX", tsx: "TSX",
  py: "Python", python: "Python",
  rb: "Ruby", ruby: "Ruby",
  go: "Go", rs: "Rust", rust: "Rust",
  java: "Java", cpp: "C++", c: "C",
  php: "PHP", css: "CSS", html: "HTML",
  json: "JSON", yaml: "YAML", xml: "XML",
  sql: "SQL", sh: "Shell", bash: "Bash", md: "Markdown",
};

interface CodeBlockProps {
  code: string;
  language: string | null;
  highlightedHtml?: string;
}

export const CodeBlock = memo(
  ({ code, language, highlightedHtml }: CodeBlockProps) => {
    const fallback = `<pre class="shiki font-mono text-sm leading-relaxed whitespace-pre-wrap p-0 m-0 border-0" style="background:transparent;color:var(--mag-text)"><code>${code}</code></pre>`;
    const html = highlightedHtml || fallback;
    const [copied, setCopied] = useState(false);

    const normalizedLanguage = language?.toLowerCase();
    const displayLanguage = normalizedLanguage
      ? LANGUAGE_MAP[normalizedLanguage] || language
      : "Plain text";

    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="my-8 group relative">
        <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--mag-border)" }}>
          <div
            className="flex items-center justify-between px-4 py-2 select-none"
            style={{ background: "var(--mag-tag-bg)", borderBottom: "1px solid var(--mag-border)" }}
          >
            <span className="text-xs font-mono" style={{ color: "var(--mag-text-muted)" }}>
              {displayLanguage}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-mono transition-opacity opacity-60 hover:opacity-100"
              style={{ color: "var(--mag-text-secondary)" }}
            >
              {copied ? "Copied!" : "Copy"}
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </button>
          </div>
          <div className="overflow-x-auto p-0">
            <div
              className="[&>pre]:p-5 [&>pre]:m-0 [&>pre]:min-w-full [&>pre>code]:p-0"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    );
  },
);

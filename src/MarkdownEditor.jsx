import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { pojoaque } from "react-syntax-highlighter/dist/esm/styles/prism";

import "./MarkdownEditor.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("# Heading");

  return (
    <div className="markdown-editor">
      <textarea
        autoRe
        autoFocus
        className="markdown-input"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />
      <ReactMarkdown
        className="markdown-output"
        children={markdown}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={pojoaque}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
};

export default MarkdownEditor;

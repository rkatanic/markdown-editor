import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import EditControls from "./EditControls";

import "./MarkdownEditor.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const textareaRef = useRef();

  useEffect(() => {
    import(`./text.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setMarkdown(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMarkdownPrefixInsert = (text) => {
    var selectStart = textareaRef.current.selectionStart;

    var front = markdown.substring(0, selectStart);
    var back = markdown.substring(selectStart, markdown.length);

    setMarkdown(front + text + back);
  };

  const handleMarkdownInsert = (
    fullMarkdown,
    markdownPrefix,
    markdownSuffix
  ) => {
    var selectStart = textareaRef.current.selectionStart;
    var selectEnd = textareaRef.current.selectionEnd;
    var front = markdown.substring(0, selectStart);
    var back = markdown.substring(selectStart, markdown.length);

    if (selectStart !== selectEnd) {
      const middle = markdown.slice(selectStart, selectEnd);
      back = back.substring(middle.length, markdown.length);
      setMarkdown(front + markdownPrefix + middle + markdownSuffix + back);
    } else {
      setMarkdown(front + fullMarkdown + back);
    }
  };

  return (
    <div className="markdown-editor">
      <EditControls
        insertMarkdown={handleMarkdownInsert}
        insertMarkdownPrefix={handleMarkdownPrefixInsert}
      />

      <div className="markdown-editor-content">
        <textarea
          ref={textareaRef}
          autoFocus
          className="markdown-input"
          value={markdown}
          onChange={(e) => {
            setMarkdown(e.target.value);
          }}
        />
        <ReactMarkdown
          className="markdown-output"
          children={markdown}
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={atomDark}
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
    </div>
  );
};

export default MarkdownEditor;

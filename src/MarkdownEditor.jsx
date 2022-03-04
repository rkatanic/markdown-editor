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

  const handleMarkdownSuffixInsert = (text) => {
    var selectEnd = textareaRef.current.selectionEnd;

    var front = markdown.substring(0, selectEnd);
    var back = markdown.substring(selectEnd, markdown.length);

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

  const handleMarkdownUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      setMarkdown(e.target.result);
    };
  };

  const handleMarkdownDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="markdown-editor">
      <EditControls
        insertMarkdown={handleMarkdownInsert}
        insertMarkdownPrefix={handleMarkdownPrefixInsert}
        insertMarkdownSuffix={handleMarkdownSuffixInsert}
        uploadMarkdown={handleMarkdownUpload}
        downloadMarkdown={handleMarkdownDownload}
        clearMarkdown={() => setMarkdown("")}
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

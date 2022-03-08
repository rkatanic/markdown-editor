import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ReactComponent as MarkdownIcon } from "../assets/icons/markdown.svg";

import "./Markdown.css";

const Markdown = ({ markdown }) => {
  return (
    <div className="markdown-output-container">
      {markdown ? (
        <ReactMarkdown
          className="markdown-output-result"
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
      ) : (
        <div className="markdown-output-desc">
          <MarkdownIcon />
          <div>
            <h3>Simple Markdown Editor</h3>
            <p>
              Made by: <a href="">Radivoje Katanic</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Markdown;

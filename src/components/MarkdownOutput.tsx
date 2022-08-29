import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./MarkdownOutput.css";

interface Props {
  markdown: string;
}

const MarkdownOutput = ({ markdown }: Props): JSX.Element => {
  return (
    <div className="w-full max-w-5xl m-auto sm:mt-8 sm:px-8 h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)]">
      <div className="markdown-output overflow-y-auto shadow-lg bg-white h-full p-4 sm:p-8 rounded-md dark:bg-zinc-700">
        <ReactMarkdown
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
                  spread={props}
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

export default MarkdownOutput;

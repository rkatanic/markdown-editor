import Markdown from "./Markdown";

import "./MarkdownOutput.css";

const MarkdownOutput = ({ markdown }) => {
  return (
    <div className="markdown-output">
      <Markdown markdown={markdown} />
    </div>
  );
};

export default MarkdownOutput;

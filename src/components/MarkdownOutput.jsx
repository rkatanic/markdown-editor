import Markdown from "./Markdown";

import "./MarkdownOutput.css";

const MarkdownOutput = ({ markdown }) => {
  return (
    <div className="markdown-output">
      <div className="markdown-output-header">
        <div className="markdown-output-header-txt">Preview</div>
      </div>
      <Markdown markdown={markdown} />
    </div>
  );
};

export default MarkdownOutput;

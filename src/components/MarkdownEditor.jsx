import { useEffect, useState, useRef } from "react";
import MarkdownOutput from "../components/MarkdownOutput";
import Editor from "../components/Editor";

import "./MarkdownEditor.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const textareaRef = useRef();

  useEffect(() => {
    import(`../text.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => {
            console.log(res);
            return res.text();
          })
          .then((res) => {
            setMarkdown(res);
            console.log(markdown.length);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(markdown.length);
  }, [markdown]);

  return (
    <div className="markdown-editor">
      <Editor markdown={markdown} setMarkdown={setMarkdown} />
      <MarkdownOutput markdown={markdown} />
    </div>
  );
};

export default MarkdownEditor;

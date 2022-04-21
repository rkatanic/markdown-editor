import { useEffect, useState } from "react";
import { Controlled as CodeMirror2 } from "react-codemirror2";
import CodeMirror from "codemirror";
import MarkdownOutput from "./MarkdownOutput";
import IconButton from "../components/IconButton";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";

import "codemirror/addon/mode/overlay";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/display/placeholder";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";

import "./MarkdownEditor.css";

CodeMirror.defineMode("customHighlights", (config) => {
  const overlay = {
    token: (stream) => {
      if (stream.match(/\*/)) {
        return "md-strong";
      }
      if (stream.match(/#/)) {
        return "md-heading-prefix";
      } else {
        stream.next();
        return null;
      }
    },
  };

  return CodeMirror.overlayMode(
    CodeMirror.getMode(config, "text/x-markdown"),
    overlay,
    true
  );
});

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [activeTab, setActiveTab] = useState("editor");

  useEffect(() => {
    import(`../text.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => {
            return res.text();
          })
          .then((res) => {
            setMarkdown(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

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
      <div className="header">
        <div className="tabs">
          <h5
            className={`tab ${activeTab === "editor" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("editor")}
          >
            Editor
          </h5>
          <h5
            className={`tab ${activeTab === "preview" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </h5>
        </div>
        <div className="actions">
          <IconButton icon={<TrashIcon />} onClick={() => setMarkdown("")} />
          <IconButton
            icon={<DownloadIcon />}
            onClick={handleMarkdownDownload}
          />
        </div>
      </div>
      {activeTab === "editor" ? (
        <CodeMirror2
          className="code-mirror"
          options={{
            placeholder: "Begin typing...",
            mode: { name: "customHighlights" },
            highlightFormatting: true,
            theme: "material",
            lineWrapping: true,
            highlightActiveLine: true,
            // specialChars: /^(#{1,6}.*)/,
          }}
          value={markdown}
          onBeforeChange={(editor, data, value) => {
            setMarkdown(value);
          }}
        />
      ) : (
        <MarkdownOutput markdown={markdown} />
      )}
    </div>
  );
};

export default MarkdownEditor;

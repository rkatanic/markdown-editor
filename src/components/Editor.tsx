import { MarkdownFile } from "../types/markdown";
import { Controlled as CodeMirror2 } from "react-codemirror2";
import "../util/CodeMirrorOvelay";

import "codemirror/addon/mode/overlay";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/display/placeholder";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";

import "./Editor.css";

interface Props {
  file: MarkdownFile;
  updateCurrentFile: (file: MarkdownFile) => void;
}

const Editor = ({ file, updateCurrentFile }: Props): JSX.Element => {
  return (
    <CodeMirror2
      className="code-mirror"
      options={{
        // @ts-ignore
        placeholder: "Start typing",
        mode: { name: "customHighlights" },
        highlightFormatting: true,
        theme: "material",
        lineWrapping: true,
        highlightActiveLine: true,
      }}
      value={file.markdown}
      onChange={(editor, data, value) =>
        updateCurrentFile({ ...file, markdown: value })
      }
      onBeforeChange={(editor, data, value) => {
        updateCurrentFile({ ...file, markdown: value });
      }}
    />
  );
};

export default Editor;

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
    <div className="w-full max-w-5xl m-auto sm:mt-8 sm:px-8 h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)]">
      <CodeMirror2
        className="code-mirror overflow-y-auto h-full"
        options={{
          placeholder: "Start typing",
          mode: { name: "customHighlights" },
          highlightFormatting: true,
          theme: "material",
          lineWrapping: true,
          highlightActiveLine: true,
        }}
        value={file.markdown}
        onChange={(_editor, _data, value) =>
          updateCurrentFile({ ...file, markdown: value })
        }
        onBeforeChange={(_editor, _data, value) => {
          updateCurrentFile({ ...file, markdown: value });
        }}
      />
    </div>
  );
};

export default Editor;

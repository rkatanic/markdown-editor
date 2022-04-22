import { useEffect, useState } from "react";
import { Controlled as CodeMirror2 } from "react-codemirror2";

import MarkdownOutput from "./MarkdownOutput";
import IconButton from "../components/IconButton";
import Files from "./Files";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";
import FileSave from "./FileSave";

import "../util/CodeMirrorOvelay";
import "codemirror/addon/mode/overlay";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/display/placeholder";
import "codemirror/theme/material.css";
import "codemirror/lib/codemirror.css";

import "./MarkdownEditor.css";

const MarkdownEditor = () => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState({
    name: "Untitled",
    markdown: "",
  });
  const [activeTab, setActiveTab] = useState("editor");

  useEffect(() => {
    const savedFiles = handleReadSavedFilesFromLocalStorage();

    if (savedFiles.length) {
      setFiles(savedFiles);
      setCurrentFile({ ...savedFiles[0] });
    } else {
      handleReadIntroductionFile();
    }
  }, []);

  const handleReadSavedFilesFromLocalStorage = () => {
    return Object.entries(localStorage)
      .filter((key) => key[0].includes("md:"))
      .map((storage) => {
        return {
          name: storage[0].substring(3, storage[0].length),
          markdown: storage[1],
        };
      });
  };

  const handleReadIntroductionFile = () => {
    import(`../text.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => {
            return res.text();
          })
          .then((res) => {
            setCurrentFile({ ...currentFile, markdown: res });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleMarkdownDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([currentFile.markdown], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${currentFile.name}.md`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const handleFileSelect = (name) => {
    setCurrentFile({
      name,
      markdown: localStorage.getItem(`md:${name}`) || "",
    });
  };

  const handleFileDelete = (name) => {
    const updatedFiles = [...files].filter((f) => f.name != name);
    setFiles(updatedFiles);

    localStorage.removeItem(`md:${name}`);
  };

  const handleFileSave = () => {
    const fileAlreadyExists = files.some((f) => f.name == currentFile.name);

    if (fileAlreadyExists) {
      const updatedFiles = files.map((f) =>
        f.name === currentFile.name
          ? { ...f, markdown: currentFile.markdown }
          : f
      );
      setFiles(updatedFiles);
    } else {
      setFiles([
        ...files,
        { name: currentFile.name, markdown: currentFile.markdown },
      ]);
      setCurrentFile({ ...currentFile, name: currentFile.name });
    }

    localStorage.setItem(`md:${currentFile.name}`, currentFile.markdown);
  };

  const handleFileNameChange = (name) => {
    setCurrentFile({ ...currentFile, name });
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
          <FileSave
            changeFileName={handleFileNameChange}
            saveFile={handleFileSave}
            fileName={currentFile.name}
          />
          <IconButton
            icon={<DownloadIcon />}
            onClick={handleMarkdownDownload}
          />
          <Files
            files={files}
            selectFile={handleFileSelect}
            deleteFile={handleFileDelete}
          />
          <IconButton
            icon={<TrashIcon />}
            onClick={() => setCurrentFile({ ...currentFile, markdown: "" })}
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
          }}
          value={currentFile.markdown}
          onChange={(editor, data, value) =>
            setCurrentFile({ ...currentFile, markdown: value })
          }
          onBeforeChange={(editor, data, value) => {
            setCurrentFile({ ...currentFile, markdown: value });
          }}
        />
      ) : (
        <MarkdownOutput markdown={currentFile.markdown} />
      )}
    </div>
  );
};

export default MarkdownEditor;

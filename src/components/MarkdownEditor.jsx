import { useEffect, useState } from "react";
import { Controlled as CodeMirror2 } from "react-codemirror2";

import MarkdownOutput from "./MarkdownOutput";
import IconButton from "../components/IconButton";
import FileSave from "./FileSave";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/x-circle.svg";
import { ReactComponent as PencilIcon } from "../assets/icons/pencil.svg";
import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg";
import { ReactComponent as FolderIcon } from "../assets/icons/folder.svg";

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
import "./Files.css";

const MarkdownEditor = () => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState({
    name: "Untitled",
    markdown: "",
  });
  const [activeTab, setActiveTab] = useState("editor");
  const [showFiles, setShowFiles] = useState(true);

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
        <span className="logo">rk</span>
        <hr />
        <div className="tabs">
          <h5
            className={`tab ${activeTab === "editor" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("editor")}
          >
            <IconButton icon={<PencilIcon />} tooltip="Editor" />
          </h5>
          <h5
            className={`tab ${activeTab === "preview" ? "tab-active" : ""}`}
            onClick={() => setActiveTab("preview")}
          >
            <IconButton icon={<EyeIcon />} tooltip="Preview" />
          </h5>
        </div>
        <hr />
        <div className="actions">
          <div className="files-button">
            {files.length > 0 && (
              <div className="files-amount">{files.length}</div>
            )}
            <IconButton
              icon={<FolderIcon />}
              onClick={() => setShowFiles((prevState) => !prevState)}
              tooltip={`${showFiles ? "Hide" : "Show"} files`}
            />
          </div>
          <FileSave
            changeFileName={handleFileNameChange}
            saveFile={handleFileSave}
            fileName={currentFile.name}
          />
          <IconButton
            icon={<DownloadIcon />}
            onClick={handleMarkdownDownload}
            tooltip="Download"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => setCurrentFile({ ...currentFile, markdown: "" })}
            tooltip="Clear"
          />
        </div>
      </div>
      <div className={`files ${showFiles ? "files-open" : ""}`}>
        <h5 className="files-header">
          Files
          <IconButton
            icon={<CloseIcon />}
            onClick={() => setShowFiles(false)}
          />
        </h5>
        <hr />
        <div className="files-list">
          {files.length ? (
            files.map((file, i) => (
              <div
                className={`file ${
                  file.name === currentFile.name ? "file-active" : ""
                }`}
                key={i}
              >
                <div className="file-header">
                  <span
                    className="file-name"
                    onClick={() => handleFileSelect(file.name)}
                  >
                    {file.name}
                  </span>
                  <IconButton
                    icon={<TrashIcon />}
                    onClick={() => handleFileDelete(file.name)}
                    size="small"
                  />
                </div>
                <div
                  className="file-content"
                  onClick={() => handleFileSelect(file.name)}
                >
                  {file.markdown}
                </div>
              </div>
            ))
          ) : (
            <span className="file-text">No files saved</span>
          )}
        </div>
      </div>
      <div className="output">
        {activeTab === "editor" ? (
          <CodeMirror2
            className="code-mirror"
            options={{
              placeholder: "Start typing",
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
    </div>
  );
};

export default MarkdownEditor;

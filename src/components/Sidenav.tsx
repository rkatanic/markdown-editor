import { useState } from "react";
import Files from "./Files";
import IconButton from "./IconButton";
import FileSave from "./FileSave";
import { MarkdownFile } from "../types/markdown";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/x-circle.svg";
import { ReactComponent as PencilIcon } from "../assets/icons/pencil.svg";
import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg";
import { ReactComponent as FolderIcon } from "../assets/icons/folder.svg";

import "./Sidenav.css";

interface Props {
  files: MarkdownFile[];
  currentFile: MarkdownFile;
  activeTab: "editor" | "preview";
  changeTab: (tab: "editor" | "preview") => void;
  clearCurrentFile: () => void;
  changeFileName: (fileName: string) => void;
  selectFile: (fileName: string) => void;
  deleteFile: (fileName: string) => void;
  saveFile: () => void;
  downloadFile: () => void;
}

const Sidenav = ({
  files,
  currentFile,
  activeTab,
  changeTab,
  clearCurrentFile,
  changeFileName,
  selectFile,
  deleteFile,
  saveFile,
  downloadFile,
}: Props): JSX.Element => {
  const [showFiles, setShowFiles] = useState(false);

  return (
    <div className="sidenav">
      <div className="header">
        <span className="logo">rk</span>
        <hr />
        <div className="tabs">
          <h5
            className={`tab ${activeTab === "editor" ? "tab-active" : ""}`}
            onClick={() => changeTab("editor")}
          >
            <IconButton icon={<PencilIcon />} tooltip="Editor" />
          </h5>
          <h5
            className={`tab ${activeTab === "preview" ? "tab-active" : ""}`}
            onClick={() => changeTab("preview")}
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
            changeFileName={(fileName: string) => changeFileName(fileName)}
            saveFile={saveFile}
            fileName={currentFile.name}
          />
          <IconButton
            icon={<DownloadIcon />}
            onClick={downloadFile}
            tooltip="Download"
          />
          <IconButton
            icon={<DeleteIcon />}
            onClick={clearCurrentFile}
            tooltip="Clear"
          />
        </div>
      </div>
      <Files
        files={files}
        currentFile={currentFile}
        showFiles={showFiles}
        selectFile={(fileName: string) => selectFile(fileName)}
        deleteFile={(fileName: string) => deleteFile(fileName)}
        closeFiles={() => setShowFiles(false)}
      />
    </div>
  );
};

export default Sidenav;

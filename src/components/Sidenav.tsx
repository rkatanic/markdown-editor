import { useState } from "react";
import Files from "./Files";
import IconButton from "./IconButton";
import FileSave from "./FileSave";
import { MarkdownFile } from "../types/markdown";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/x-circle.svg";
import { ReactComponent as PencilIcon } from "../assets/icons/pencil.svg";
import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";

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
  const [showNav, setShowNav] = useState(false);

  const handleNavigationOpen = (): void => {
    setShowNav(true);
  };

  const handleNavigationClose = (): void => {
    setShowNav(false);
  };

  return (
    <div className={`sidenav ${showNav ? "sidenav-open" : ""}`}>
      <div className="sidenav-toggle" onClick={handleNavigationOpen}>
        <MenuIcon />
      </div>

      <div className="header">
        <span className="logo">rk</span>
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
        <div className="actions">
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
        selectFile={(fileName: string) => selectFile(fileName)}
        deleteFile={(fileName: string) => deleteFile(fileName)}
        closeSidenav={handleNavigationClose}
      />
    </div>
  );
};

export default Sidenav;

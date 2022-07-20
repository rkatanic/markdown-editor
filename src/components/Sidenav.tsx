import IconButton from "./IconButton";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/x-circle.svg";
import { ReactComponent as PencilIcon } from "../assets/icons/pencil.svg";
import { ReactComponent as EyeIcon } from "../assets/icons/eye.svg";
import { ReactComponent as FolderIcon } from "../assets/icons/folder.svg";

import "./Sidenav.css";

interface Props {
  activeTab: "editor" | "preview";
  changeTab: (tab: "editor" | "preview") => void;
  clearCurrentFile: () => void;
  downloadFile: () => void;
  toggleFilesShow: () => void;
  numberOfFiles: number;
}

const Sidenav = ({
  activeTab,
  changeTab,
  clearCurrentFile,
  downloadFile,
  toggleFilesShow,
  numberOfFiles,
}: Props): JSX.Element => {
  return (
    <div className="sidenav">
      <span className="logo">rk</span>
      <h5
        className={`tab ${activeTab === "editor" ? "tab-active" : ""}`}
        onClick={() => changeTab("editor")}
      >
        <IconButton icon={<PencilIcon />} />
      </h5>
      <h5
        className={`tab ${activeTab === "preview" ? "tab-active" : ""}`}
        onClick={() => changeTab("preview")}
      >
        <IconButton icon={<EyeIcon />} />
      </h5>
      <IconButton icon={<DownloadIcon />} onClick={downloadFile} />
      <IconButton icon={<DeleteIcon />} onClick={clearCurrentFile} />
      <div className="files-button-container" onClick={toggleFilesShow}>
        <IconButton icon={<FolderIcon />} />
        {!!numberOfFiles && (
          <div className="files-button-badge">{numberOfFiles}</div>
        )}
      </div>
    </div>
  );
};

export default Sidenav;

import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";

import "./Files.css";
import IconButton from "./IconButton";

const Files = ({ closeFiles, isOpen, files }) => {
  return (
    <div className={`files ${isOpen ? "files-open" : ""}`}>
      <h5 className="files-header">
        Files
        <IconButton icon={<CloseIcon />} onClick={closeFiles} />
      </h5>
      <hr />
      <div className="files-list">
        {files ? (
          files.map((file) => <div>{file.name}</div>)
        ) : (
          <span className="file-text">No files</span>
        )}
      </div>
    </div>
  );
};

export default Files;

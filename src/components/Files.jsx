import { useState } from "react";
import IconButton from "./IconButton";
import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/trash.svg";
import { ReactComponent as FolderIcon } from "../assets/icons/folder.svg";

import "./Files.css";

const Files = ({ files, selectFile, deleteFile }) => {
  const [showFiles, setShowFiles] = useState(false);

  return (
    <>
      <div className="files-button">
        {files.length > 0 && <div className="files-amount">{files.length}</div>}
        <IconButton
          icon={<FolderIcon />}
          onClick={() => setShowFiles((prevState) => !prevState)}
        />
      </div>

      <div className={`files ${showFiles ? "files-open" : ""}`}>
        <h5 className="files-header">
          Files
          <IconButton
            icon={<CloseIcon />}
            onClick={() => setShowFiles(false)}
          />
        </h5>
        <div className="files-list">
          {files.length ? (
            files.map((file, i) => (
              <div className="file" key={i}>
                <span onClick={() => selectFile(file.name)}>{file.name}</span>
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => deleteFile(file.name)}
                />
              </div>
            ))
          ) : (
            <span className="file-text">No files</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Files;

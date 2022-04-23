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
    </>
  );
};

export default Files;

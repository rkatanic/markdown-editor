import IconButton from "./IconButton";
import { MarkdownFile } from "../types/markdown";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";

import "./Files.css";

interface Props {
  files: MarkdownFile[];
  currentFile: MarkdownFile;
  showFiles: boolean;
  closeFiles: () => void;
  selectFile: (fileName: string) => void;
  deleteFile: (fileName: string) => void;
}

const Files = ({
  files,
  currentFile,
  showFiles,
  closeFiles,
  selectFile,
  deleteFile,
}: Props): JSX.Element => {
  return (
    <div className={`files ${showFiles ? "files-open" : ""}`}>
      <div className="files-header-content">
        <h5 className="files-header">
          Files
          <IconButton icon={<CloseIcon />} onClick={closeFiles} />
        </h5>
        <hr />
      </div>
      <div className="files-list">
        {files.length ? (
          files.map(({ name, markdown }) => (
            <div
              className={`file ${
                name === currentFile.name ? "file-active" : ""
              }`}
              key={name}
            >
              <div className="file-header">
                <span className="file-name" onClick={() => selectFile(name)}>
                  {name}
                </span>
                <IconButton
                  icon={<TrashIcon />}
                  onClick={() => deleteFile(name)}
                  size="small"
                />
              </div>
              <div className="file-content" onClick={() => selectFile(name)}>
                {markdown}
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p className="file-text">No files saved yet</p>
        )}
      </div>
    </div>
  );
};

export default Files;

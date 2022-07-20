import IconButton from "./IconButton";
import { MarkdownFile } from "../types/markdown";
import { ReactComponent as TrashIcon } from "../assets/icons/trash.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";

import "./Files.css";

interface Props {
  files: MarkdownFile[];
  currentFile?: MarkdownFile;
  selectFile: (fileName: string) => void;
  deleteFile: (fileName: string) => void;
  toggleFilesShow: () => void;
  showFiles: boolean;
}

const Files = ({
  files,
  currentFile,
  selectFile,
  deleteFile,
  toggleFilesShow,
  showFiles,
}: Props): JSX.Element => {
  const handleFilesSelect = (name: string): void => {
    selectFile(name);
    toggleFilesShow();
  };

  return (
    <>
      <div
        className={`files-overlay ${showFiles ? "files-overlay-visible" : ""}`}
        onClick={toggleFilesShow}
      ></div>
      <div className={`files ${showFiles ? "files-open" : ""}`}>
        <h5 className="files-header">
          Files {files.length > 0 && `(${files.length})`}
          <div className="files-close">
            <IconButton icon={<CloseIcon />} onClick={toggleFilesShow} />
          </div>
        </h5>
        <div className="files-list">
          {files.length ? (
            files.map(({ name, markdown }) => (
              <div
                className={`file ${
                  name === currentFile?.name ? "file-active" : ""
                }`}
                key={name}
              >
                <div className="file-header">
                  <span
                    className="file-name"
                    onClick={() => handleFilesSelect(name)}
                  >
                    {name}
                  </span>
                  <IconButton
                    icon={<TrashIcon />}
                    onClick={() => deleteFile(name)}
                    size="small"
                  />
                </div>
                <div
                  className="file-content"
                  onClick={() => handleFilesSelect(name)}
                >
                  {markdown}
                </div>
              </div>
            ))
          ) : (
            <p className="file-text">No files saved yet</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Files;

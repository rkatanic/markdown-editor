import { ChangeEvent } from "react";
import IconButton from "./IconButton";
import { ReactComponent as SaveIcon } from "../assets/icons/save.svg";

import "./FileSave.css";

interface Props {
  fileName: string;
  saveFile: () => void;
  changeFileName: (fileName: string) => void;
}

const FileSave = ({
  saveFile,
  fileName,
  changeFileName,
}: Props): JSX.Element => {
  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    changeFileName(e.target.value);
  };

  return (
    <div className="file-save" data-testid="file-save">
      <div className="file-save-input-wrapper">
        <input
          placeholder="File name"
          className="file-save-input"
          type="text"
          value={fileName}
          onChange={handleFileNameChange}
        />
      </div>
      <IconButton icon={<SaveIcon />} disabled={!fileName} onClick={saveFile} />
    </div>
  );
};

export default FileSave;

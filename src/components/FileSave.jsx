import { useState } from "react";
import Button from "./Button";
import IconButton from "./IconButton";
import { ReactComponent as SaveIcon } from "../assets/icons/save.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";

import "./FileSave.css";

const FileSave = ({ saveFile, fileName, changeFileName }) => {
  const [state, setState] = useState({
    showDialog: false,
    error: "",
  });

  const handleValidation = (event) => {
    changeFileName(event.target.value);
    if (!event.target.value) {
      setState({
        ...state,
        error: "Must not be blank",
      });
    } else {
      setState({ ...state, error: "" });
    }
  };

  const handleFileSave = () => {
    saveFile();
    setState({ showDialog: false, error: "" });
  };

  return (
    <div className="file-save">
      <IconButton
        icon={<SaveIcon />}
        onClick={() =>
          setState({ ...state, showDialog: !state.showDialog, error: "" })
        }
      />
      {state.showDialog && (
        <div className="file-save-dialog">
          <div className="file-save-dialog-header">
            <div>Name your file</div>
            <IconButton
              icon={<CloseIcon />}
              onClick={() => setState({ showDialog: false, erorr: "" })}
            />
          </div>
          <div className="file-name-input">
            <input
              placeholder="File name"
              className="file-name-input-field"
              type="text"
              value={fileName}
              onChange={handleValidation}
            />
            {state.error && (
              <span className="file-name-error">{state.error}</span>
            )}
          </div>
          <div className="file-save-dialog-buttons">
            <Button
              disabled={!fileName}
              label="Save"
              variant="primary"
              onClick={handleFileSave}
            />
            <Button
              label="Cancel"
              variant="ghost"
              onClick={() => setState({ showDialog: false, error: "" })}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSave;

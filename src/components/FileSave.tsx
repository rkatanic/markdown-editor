import {
  ChangeEvent,
  EffectCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "./Button";
import IconButton from "./IconButton";
import { ReactComponent as CloseIcon } from "../assets/icons/x.svg";
import { ReactComponent as PlusIcon } from "../assets/icons/save.svg";

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
  const dialog = useRef<any>();
  const [state, setState] = useState<{ showDialog: boolean; error: string }>({
    showDialog: false,
    error: "",
  });

  const handleValidation = (event: ChangeEvent<HTMLInputElement>): void => {
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

  const handleFileSave = (): void => {
    saveFile();
    setState({ showDialog: false, error: "" });
  };

  useEffect((): ReturnType<EffectCallback> => {
    const handleClickOutside = (event: Event): void => {
      if (dialog.current && !dialog.current.contains(event.target)) {
        setState({ showDialog: false, error: "" });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return (): void =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="file-save" ref={dialog}>
      <IconButton
        icon={<PlusIcon />}
        onClick={() =>
          setState({ ...state, showDialog: !state.showDialog, error: "" })
        }
        tooltip="Save file"
      />
      {state.showDialog && (
        <div className="file-save-dialog">
          <div className="file-save-dialog-header">
            Name File
            <IconButton
              icon={<CloseIcon />}
              onClick={() => setState({ showDialog: false, error: "" })}
            />
          </div>
          <div className="file-save-dialog-input-wrapper">
            <input
              placeholder="File name"
              className="file-save-dialog-input-field"
              type="text"
              value={fileName}
              onChange={handleValidation}
            />
            {state.error && (
              <span className="file-save-dialog-input-error">
                {state.error}
              </span>
            )}
          </div>
          <div className="file-save-dialog-button">
            <Button
              disabled={!fileName}
              label="Save"
              onClick={handleFileSave}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSave;

import { ChangeEvent } from "react";
import { FiSave } from "react-icons/fi";

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
    <div className="bg-white w-full border-b h-16 flex items-center justify-center text-lg font-semibold dark:text-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex items-center justify-between gap-8 w-full max-w-5xl px-8 ">
        <input
          className="focus:outline-none bg-transparent w-full"
          onChange={handleFileNameChange}
          value={fileName}
          placeholder="File name"
        />
        <FiSave
          data-testid="save-icon"
          onClick={saveFile}
          className="dark:stroke-zinc-400 cursor-pointer hover:stroke-emerald-500 dark:hover:stroke-emerald-500"
        />
      </div>
    </div>
  );
};

export default FileSave;

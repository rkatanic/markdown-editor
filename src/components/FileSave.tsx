import { ChangeEvent, FormEvent } from "react";
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

  const handleFileSave = (e: FormEvent): void => {
    e.preventDefault();
    saveFile();
  };

  return (
    <div className="bg-white w-full border-b h-16 flex items-center justify-center text-lg font-semibold dark:text-neutral-200 dark:border-neutral-800 dark:bg-neutral-900">
      <form
        className="flex items-center justify-between gap-8 w-full max-w-5xl px-4 sm:px-8"
        onSubmit={handleFileSave}
      >
        <input
          required
          type="text"
          className="focus:outline-none bg-transparent w-full"
          onChange={handleFileNameChange}
          value={fileName}
          placeholder="File name"
        />
        <button type="submit">
          <FiSave
            data-testid="save-icon"
            className="dark:stroke-neutral-400 cursor-pointer hover:stroke-cyan-600 dark:hover:stroke-cyan-500"
          />
        </button>
      </form>
    </div>
  );
};

export default FileSave;

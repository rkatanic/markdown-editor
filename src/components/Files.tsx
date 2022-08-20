import { MarkdownFile } from "../types/markdown";
import { FiTrash2, FiX } from "react-icons/fi";

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
    <div
      className={`${
        showFiles ? "left-0 sm:ml-20" : "-left-full "
      } overflow-y-auto z-10 h-full transition-[left] duration-300 absolute lg:relative lg:left-0 lg:ml-0 shadow-sm border-r bg-white dark:bg-zinc-800 dark:border-zinc-700 w-full max-w-sm`}
    >
      <div className="border-b h-16 flex items-center justify-between px-6 text-lg font-semibold dark:text-zinc-200 dark:border-zinc-700">
        <div>
          Notes{" "}
          <span className="text-sm text-zinc-400 font-normal ml-2">
            {`${files.length} ${files.length === 1 ? "File" : "Files"}`}
          </span>
        </div>
        <FiX
          onClick={toggleFilesShow}
          size="1.375rem"
          className="lg:hidden dark:stroke-zinc-400 stroke-zinc-500"
        />
      </div>
      <div className="w-full max-w-sm">
        {files.map((file) => (
          <div
            className={`${
              currentFile?.name === file.name
                ? "bg-zinc-50 dark:bg-zinc-700/25"
                : ""
            } border-b px-6 py-4 dark:border-zinc-700`}
          >
            <p className="cursor-pointer mb-2 font-semibold flex items-center gap-2 justify-between dark:text-zinc-200">
              <span onClick={(): void => handleFilesSelect(file.name)}>
                {file.name}
              </span>
              <FiTrash2
                onClick={() => deleteFile(file.name)}
                size="1.125rem"
                className="stroke-zinc-300 hover:stroke-rose-500 hover:cursor-pointer dark:stroke-zinc-500 dark:hover:stroke-rose-800"
              />
            </p>
            <p
              onClick={(): void => handleFilesSelect(file.name)}
              className="cursor-pointer overflow-hidden text-ellipsis max-h-16 text-sm text-zinc-500 dark:text-zinc-400"
            >
              {file.markdown}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;

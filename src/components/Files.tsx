import { MarkdownFile } from "../types/markdown";
import { FiFilePlus, FiX } from "react-icons/fi";
import File from "./File";

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
      {showFiles && (
        <div
          data-testid="files-overlay"
          onClick={toggleFilesShow}
          className="z-10 ml-20 lg:ml-0 lg:hidden fixed inset-0 w-full h-full bg-neutral-900/70"
        ></div>
      )}
      <div
        className={`${
          showFiles ? "left-0 sm:ml-20" : "-left-full "
        } overflow-y-auto z-10 h-full transition-[left] duration-300 absolute lg:relative lg:left-0 lg:ml-0 shadow-sm border-r bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 w-full max-w-sm`}
      >
        <div className="border-b dark:border-b-neutral-700/50 h-16 flex items-center justify-between px-4 text-xl font-semibold dark:text-neutral-200">
          <div>
            Notes{" "}
            <span className="text-sm text-neutral-400 font-normal ml-1">
              {`${files.length} ${files.length === 1 ? "File" : "Files"}`}
            </span>
          </div>
          <FiX
            data-testid="x-icon"
            onClick={toggleFilesShow}
            size="1.375rem"
            className="lg:hidden dark:stroke-neutral-400 stroke-neutral-500"
          />
        </div>
        {files.length ? (
          <div className="w-full max-w-sm">
            {files.map(
              (file, i): JSX.Element => (
                <File
                  key={i}
                  currentFileName={currentFile?.name}
                  file={file}
                  deleteFile={deleteFile}
                  selectFile={handleFilesSelect}
                />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1 mt-8">
            <FiFilePlus
              size="2.5rem"
              className="stroke-1 stroke-neutral-300 mb-1 dark:stroke-neutral-400"
            />
            <div className="text-neutral-700 font-semibold dark:text-neutral-100">
              No notes saved
            </div>
            <div className="text-sm text-neutral-400">
              Get started by saving your first note.
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Files;

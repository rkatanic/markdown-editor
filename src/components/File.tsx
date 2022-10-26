import { MarkdownFile } from "../types/markdown";
import { FiTrash2 } from "react-icons/fi";
import DeleteFileModal from "./DeleteFileModal";
import { useState } from "react";

interface Props {
  currentFileName: any;
  file: MarkdownFile;
  deleteFile: (name: string) => void;
  selectFile: (name: string) => void;
}

const File = ({
  currentFileName,
  file: { name, markdown },
  deleteFile,
  selectFile,
}: Props): JSX.Element => {
  const [showDeleteFileModal, setShowDeleteFileModal] = useState(false);

  const handleFileDelete = (name: string) => {
    deleteFile(name);
    handleDeleteFileModalToggle();
  };

  const handleDeleteFileModalToggle = (): void => {
    setShowDeleteFileModal((prevState) => !prevState);
  };

  return (
    <div
      className={`${
        currentFileName === name ? "bg-yellow-50/70 dark:bg-yellow-800/10" : ""
      } border-b p-4 py-2 dark:border-neutral-700/50`}
    >
      <p className="cursor-pointer mb-1 font-semibold flex items-center gap-2 justify-between dark:text-neutral-200">
        <span onClick={(): void => selectFile(name)}>
          {name ? name : "Untitled"}
        </span>
        <FiTrash2
          data-testid="trash-icon"
          onClick={handleDeleteFileModalToggle}
          size="1.125rem"
          className="stroke-neutral-300 hover:stroke-red-500 hover:cursor-pointer dark:stroke-neutral-400 dark:hover:stroke-red-600"
        />
      </p>
      <p
        onClick={(): void => selectFile(name)}
        className="cursor-pointer overflow-hidden text-ellipsis max-h-16 h-[4rem] text-sm text-neutral-400 dark:text-neutral-400"
      >
        {markdown ? markdown : "Empty note"}
      </p>
      <DeleteFileModal
        isOpen={showDeleteFileModal}
        onClose={handleDeleteFileModalToggle}
        onSubmit={(): void => handleFileDelete(name)}
      />
    </div>
  );
};

export default File;

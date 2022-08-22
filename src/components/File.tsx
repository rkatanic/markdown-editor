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
        currentFileName === name ? "bg-zinc-50 dark:bg-zinc-700/25" : ""
      } border-b px-6 py-4 dark:border-zinc-700`}
    >
      <p className="cursor-pointer mb-2 font-semibold flex items-center gap-2 justify-between dark:text-zinc-200">
        <span onClick={(): void => selectFile(name)}>{name}</span>
        <FiTrash2
          data-testid="trash-icon"
          onClick={handleDeleteFileModalToggle}
          size="1.125rem"
          className="stroke-zinc-300 hover:stroke-rose-500 hover:cursor-pointer dark:stroke-zinc-500 dark:hover:stroke-rose-800"
        />
      </p>
      <p
        onClick={(): void => selectFile(name)}
        className="cursor-pointer overflow-hidden text-ellipsis max-h-16 text-sm text-zinc-500 dark:text-zinc-400"
      >
        {markdown}
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

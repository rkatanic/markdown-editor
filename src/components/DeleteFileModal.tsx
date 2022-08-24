import { FiX, FiAlertTriangle } from "react-icons/fi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteFileModal = ({
  isOpen,
  onClose,
  onSubmit,
}: Props): JSX.Element | null =>
  isOpen ? (
    <>
      <div
        data-testid="delete-file-modal-overlay"
        onClick={onClose}
        className="fixed inset-0 bg-zinc-500/50 dark:bg-zinc-900"
      ></div>
      <div
        data-testid="delete-file-modal"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed bg-white shadow-lg p-4 rounded-md w-full max-w-lg dark:bg-zinc-800"
      >
        <div className="flex flex-col justify-center items-center gap-4 mb-8 sm:flex-row sm:items-start">
          <div className="p-3 bg-rose-100 rounded-full dark:bg-rose-900 dark:bg-opacity-30">
            <FiAlertTriangle size="1.5rem" className="stroke-rose-500" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h5 className="flex items-start justify-center font-semibold sm:justify-between dark:text-zinc-100">
              Delete note
              <FiX
                data-testid="x-icon"
                onClick={onClose}
                size="1.5rem"
                className="hidden stroke-zinc-400 cursor-pointer sm:block"
              />
            </h5>
            <p className="text-zinc-500 text-md dark:text-zinc-400">
              Are you sure you want to delete this note?
              <br /> This action can not be undone.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-end sm:flex-row">
          <button
            onClick={onClose}
            type="button"
            className="order-2 shadow-sm font-semibold text-sm border bg-zinc-50 border-zinc-300 px-4 py-2 rounded-md text-zinc-900 hover:bg-zinc-100 sm:order-1 dark:shadow-md dark:text-zinc-100 dark:hover:bg-zinc-700 dark:border-zinc-500"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            type="button"
            className="order-1 shadow-sm font-semibold text-sm border border-rose-700 bg-rose-600 px-4 py-2 rounded-md text-white hover:bg-rose-700 hover:border-rose-800 dark:shadow-md dark:bg-rose-800 dark:hover:bg-rose-900"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  ) : null;

export default DeleteFileModal;

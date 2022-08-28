import { FiX, FiAlertTriangle } from "react-icons/fi";
import Button from "./Button";

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
        className="fixed inset-0 bg-zinc-500/50 dark:bg-zinc-900/90"
      ></div>
      <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed w-full max-w-lg p-4">
        <div
          data-testid="delete-file-modal"
          className=" bg-white shadow-lg p-4 rounded-md w-full max-w-lg dark:bg-zinc-800"
        >
          <div className="flex flex-col justify-center items-center gap-4 mb-8 sm:flex-row sm:items-start">
            <div className="p-3 bg-red-100 rounded-full dark:bg-red-900 dark:bg-opacity-30">
              <FiAlertTriangle size="1.5rem" className="stroke-red-500" />
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
            <Button
              className="order-2 sm:order-1"
              variant="secondary"
              text="Cancel"
              onClick={onClose}
            />
            <Button
              className="order-1"
              variant="danger"
              text="Delete"
              onClick={onSubmit}
            />
          </div>
        </div>
      </div>
    </>
  ) : null;

export default DeleteFileModal;

import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { VscColorMode } from "react-icons/vsc";
import { Tab } from "../types/markdown";
import { MdModeEdit, MdFolder } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import { IoIosDownload } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

interface Props {
  activeTab: Tab;
  changeTab: (tab: Tab) => void;
  clearCurrentFile: () => void;
  downloadFile: () => void;
  toggleShowFiles: () => void;
}

const Sidenav = ({
  activeTab,
  changeTab,
  clearCurrentFile,
  downloadFile,
  toggleShowFiles,
}: Props): JSX.Element => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuOpen = (): void => {
    setShowMenu(true);
  };

  const handleMenuClose = (): void => {
    setShowMenu(false);
  };

  const handleTabChange = (tab: Tab): void => {
    changeTab(tab);
    handleMenuClose();
  };

  const handleFileClear = (): void => {
    clearCurrentFile();
    handleMenuClose();
  };

  const handleFileDownload = (): void => {
    downloadFile();
    handleMenuClose();
  };

  const handleFilesShowToggle = (): void => {
    toggleShowFiles();
    handleMenuClose();
  };

  const handleDarkThemeSwitch = (): void => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  return (
    <>
      {showMenu && (
        <div
          data-testid="sidenav-overlay"
          onClick={handleMenuClose}
          className="z-10 sm:hidden fixed inset-0 w-full h-full bg-neutral-900/90 z-100"
        ></div>
      )}
      <div className="overflow-y-auto w-full sm:max-w-[5rem] bg-neutral-50 dark:bg-neutral-800 flex flex-col items-center gap-4 sm:border-r dark:border-r-neutral-700">
        <div className="bg-neutral-50 dark:bg-neutral-800 p-4 justify-between flex items-center sm:justify-center sm:px-0 w-full z-10">
          <div className="w-8 h-8 border-neutral-800 dark:border-white border-8 rounded-full"></div>
          {showMenu ? (
            <FiX
              data-testid="x-icon"
              onClick={handleMenuClose}
              size="1.5rem"
              className="stroke-neutral-800 dark:stroke-white sm:hidden"
            />
          ) : (
            <FiMenu
              data-testid="menu-icon"
              onClick={handleMenuOpen}
              size="1.5rem"
              className="stroke-neutral-800 dark:stroke-white sm:hidden"
            />
          )}
        </div>
        <div
          data-testid="sidenav-menu"
          className={`${
            showMenu ? "top-0" : "-top-full"
          } sm:h-full sm:bg-none z-10 transition-[top] duration-300 absolute sm:relative sm:mt-0 py-2 sm:py-0 sm:top-0 mt-16 bg-neutral-50 dark:bg-neutral-800 flex flex-col items-center gap-1 sm:gap-4 w-full px-2 sm:px-4`}
        >
          <div
            onClick={(): void => handleTabChange("editor")}
            className={`${
              activeTab === "editor"
                ? "bg-neutral-200 dark:bg-neutral-700/50"
                : ""
            } hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700/50 flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full`}
          >
            <MdModeEdit
              data-testid="edit-icon"
              size="1.5rem"
              className="fill-neutral-500"
            />
            <span className="text-neutral-800 dark:text-neutral-50 sm:hidden">
              Editor
            </span>
          </div>
          <div
            onClick={(): void => handleTabChange("preview")}
            className={`${
              activeTab === "preview"
                ? "bg-neutral-200 dark:bg-neutral-700/50"
                : ""
            } hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700/50 flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full`}
          >
            <AiFillEye
              data-testid="eye-icon"
              size="1.5rem"
              className="fill-neutral-500"
            />
            <span className="text-neutral-800 dark:text-neutral-50 sm:hidden">
              Preview
            </span>
          </div>
          <div
            onClick={handleFileDownload}
            className="hover:bg-neutral-200 dark:hover:bg-neutral-700/50 hover:cursor-pointer flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full"
          >
            <IoIosDownload
              data-testid="download-icon"
              size="1.5rem"
              className="fill-neutral-500"
            />
            <span className="text-neutral-800 dark:text-neutral-50 sm:hidden">
              Download
            </span>
          </div>
          <div
            onClick={handleFileClear}
            className="hover:bg-neutral-200 dark:hover:bg-neutral-700/50 hover:cursor-pointer flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full"
          >
            <TiDelete
              data-testid="x-circle-icon"
              size="1.5rem"
              className="fill-neutral-500"
            />
            <span className="text-neutral-800 dark:text-neutral-50 sm:hidden">
              Clear
            </span>
          </div>
          <div
            onClick={handleFilesShowToggle}
            className="lg:hidden hover:bg-neutral-200 dark:hover:bg-neutral-700/50 hover:cursor-pointer flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full"
          >
            <MdFolder
              data-testid="folder-icon"
              size="1.5rem"
              className="fill-neutral-500"
            />
            <span className="text-neutral-800 dark:text-neutral-50 sm:hidden">
              Files
            </span>
          </div>
          <div className="hidden sm:block bg-neutral-200 dark:bg-neutral-700 h-px w-8"></div>
          <div
            onClick={handleDarkThemeSwitch}
            className="hover:bg-neutral-200 dark:hover:bg-neutral-700/50 hover:cursor-pointer flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full"
          >
            <VscColorMode
              data-testid="theme-switch-icon"
              size="1.125rem"
              className="fill-neutral-500"
            />
            <span className="text-neutral-800 dark:text-neutral-50 sm:hidden">
              Theme
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;

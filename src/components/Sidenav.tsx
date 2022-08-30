import { useState } from "react";
import {
  FiEdit2,
  FiEye,
  FiDownload,
  FiXCircle,
  FiFolder,
  FiX,
  FiMenu,
} from "react-icons/fi";
import { VscColorMode } from "react-icons/vsc";
import { Tab } from "../types/markdown";

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
          className="z-10 sm:hidden fixed inset-0 w-full h-full bg-zinc-900/90 z-100"
        ></div>
      )}
      <div className="overflow-y-auto w-full sm:max-w-[5rem] bg-zinc-800 dark:bg-zinc-900 flex flex-col items-center gap-6">
        <div className="p-4 justify-between flex items-center sm:justify-center sm:px-0 bg-emerald-600 dark:bg-emerald-600 w-full z-10">
          <div className="w-8 h-8 border-white border-8 rounded-full"></div>
          {showMenu ? (
            <FiX
              data-testid="x-icon"
              onClick={handleMenuClose}
              size="1.25rem"
              className="stroke-white sm:hidden"
            />
          ) : (
            <FiMenu
              data-testid="menu-icon"
              onClick={handleMenuOpen}
              size="1.25rem"
              className="stroke-white sm:hidden"
            />
          )}
        </div>
        <div
          data-testid="sidenav-menu"
          className={`${
            showMenu ? "top-0" : "-top-full"
          } sm:h-full sm:bg-none z-10 transition-[top] duration-300 absolute sm:relative sm:mt-0 py-2 sm:py-0 sm:top-0 mt-16 bg-zinc-800 flex flex-col items-center gap-1 sm:gap-4 w-full px-2 sm:px-4`}
        >
          <div
            onClick={(): void => handleTabChange("editor")}
            className={`${
              activeTab === "editor" ? "bg-zinc-600" : ""
            } hover:cursor-pointer hover:bg-zinc-600/50 bg-opacity-50 flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full`}
          >
            <FiEdit2
              data-testid="edit-icon"
              size="1.25rem"
              className="stroke-zinc-100"
            />
            <span className="text-zinc-50 sm:hidden">Editor</span>
          </div>
          <div
            onClick={(): void => handleTabChange("preview")}
            className={`${
              activeTab === "preview" ? "bg-zinc-600" : ""
            } hover:cursor-pointer hover:bg-zinc-600/50 bg-opacity-50 flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full`}
          >
            <FiEye
              data-testid="eye-icon"
              size="1.25rem"
              className="stroke-zinc-100"
            />
            <span className="text-zinc-50 sm:hidden">Preview</span>
          </div>
          <div
            onClick={handleFileDownload}
            className="hover:bg-opacity-50 hover:bg-zinc-600 hover:cursor-pointer flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full"
          >
            <FiDownload
              data-testid="download-icon"
              size="1.25rem"
              className="stroke-zinc-100"
            />
            <span className="text-zinc-50 sm:hidden">Download</span>
          </div>
          <div
            onClick={handleFileClear}
            className="hover:bg-opacity-50 hover:bg-zinc-600 hover:cursor-pointer flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full"
          >
            <FiXCircle
              data-testid="x-circle-icon"
              size="1.25rem"
              className="stroke-zinc-100"
            />
            <span className="text-zinc-50 sm:hidden">Clear</span>
          </div>
          <div
            onClick={handleFilesShowToggle}
            className="lg:hidden hover:bg-opacity-50 hover:bg-zinc-600 hover:cursor-pointer flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full"
          >
            <FiFolder
              data-testid="folder-icon"
              size="1.25rem"
              className="stroke-zinc-100"
            />
            <span className="text-zinc-50 sm:hidden">Files</span>
          </div>
          <div className="hidden sm:block bg-zinc-500 h-px w-8"></div>
          <div
            onClick={handleDarkThemeSwitch}
            className="hover:bg-opacity-50 hover:bg-zinc-600 hover:cursor-pointer flex gap-4 items-center justify-start sm:justify-center px-4 py-2 sm:px-0 sm:py-3 rounded-md w-full"
          >
            <VscColorMode
              data-testid="theme-switch-icon"
              size="1.25rem"
              className="fill-zinc-100"
            />
            <span className="text-zinc-50 sm:hidden">Theme</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;

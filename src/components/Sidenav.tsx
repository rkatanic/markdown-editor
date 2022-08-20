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

  const handleShowMenuToggle = (): void => {
    setShowMenu((prevState) => !prevState);
  };

  const handleTabChange = (tab: Tab): void => {
    changeTab(tab);
    handleShowMenuToggle();
  };

  const handleFileClear = (): void => {
    clearCurrentFile();
    handleShowMenuToggle();
  };

  const handleFileDownload = (): void => {
    downloadFile();
    handleShowMenuToggle();
  };

  const handleFilesShowToggle = (): void => {
    toggleShowFiles();
    handleShowMenuToggle();
  };

  return (
    <>
      {showMenu && (
        <div
          onClick={handleShowMenuToggle}
          className="z-10 sm:hidden fixed inset-0 w-full h-full bg-zinc-900/70 z-100"
        ></div>
      )}
      <div className="overflow-y-auto w-full sm:max-w-[5rem] bg-gradient-to-b from-emerald-600 to-teal-600 flex flex-col items-center gap-6 sm:z-10">
        <div className="px-8 justify-between flex items-center sm:justify-center sm:px-0 h-16 bg-emerald-700 w-full z-10">
          <div className="w-8 h-8 border-emerald-50 border-8 rounded-full"></div>
          {showMenu ? (
            <FiX
              onClick={handleShowMenuToggle}
              size="1.375rem"
              className="stroke-white sm:hidden"
            />
          ) : (
            <FiMenu
              onClick={handleShowMenuToggle}
              size="1.375rem"
              className="stroke-white sm:hidden"
            />
          )}
        </div>
        <div
          className={`${
            showMenu ? "top-0" : "-top-full"
          } z-10 transition-[top] duration-300 absolute sm:relative sm:mt-0 sm:py-0 sm:top-0 mt-16 py-4 bg-gradient-to-b from-emerald-600 to-teal-600  flex flex-col items-center gap-4 w-full px-4`}
        >
          <div
            onClick={(): void => handleTabChange("editor")}
            className={`${
              activeTab === "editor" ? "bg-emerald-700" : ""
            } hover:cursor-pointer hover:bg-emerald-700/50 bg-opacity-50 flex gap-4 items-center justify-center py-3 rounded-md w-full`}
          >
            <FiEdit2 size="1.375rem" className="stroke-emerald-100" />
            <span className="text-white text-lg sm:hidden">Editor</span>
          </div>
          <div
            onClick={(): void => handleTabChange("preview")}
            className={`${
              activeTab === "preview" ? "bg-emerald-700" : ""
            } hover:cursor-pointer hover:bg-emerald-700/50 bg-opacity-50 flex gap-4 items-center justify-center py-3 rounded-md w-full`}
          >
            <FiEye size="1.375rem" className="stroke-emerald-100" />
            <span className="text-white text-lg sm:hidden">Preview</span>
          </div>
          <div
            onClick={handleFileDownload}
            className="hover:bg-opacity-50 hover:bg-emerald-700 hover:cursor-pointer flex gap-4 items-center justify-center py-3 rounded-md w-full"
          >
            <FiDownload size="1.375rem" className="stroke-emerald-100" />
            <span className="text-white text-lg sm:hidden">Download</span>
          </div>
          <div
            onClick={handleFileClear}
            className="hover:bg-opacity-50 hover:bg-emerald-700 hover:cursor-pointer flex gap-4 items-center justify-center py-3 rounded-md w-full"
          >
            <FiXCircle size="1.375rem" className="stroke-emerald-100" />
            <span className="text-white text-lg sm:hidden">Clear</span>
          </div>
          <div
            onClick={handleFilesShowToggle}
            className="lg:hidden hover:bg-opacity-50 hover:bg-emerald-700 hover:cursor-pointer flex gap-4 items-center justify-center py-3 rounded-md w-full"
          >
            <FiFolder size="1.375rem" className="stroke-emerald-100" />
            <span className="text-white text-lg sm:hidden">Files</span>
          </div>
          <div className="bg-emerald-500 h-px w-8"></div>
          <div className="hover:bg-opacity-50 hover:bg-emerald-700 hover:cursor-pointer flex gap-4 items-center justify-center py-3 rounded-md w-full">
            <VscColorMode size="1.375rem" className="fill-emerald-100" />
            <span className="text-white text-lg sm:hidden">Theme</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidenav;

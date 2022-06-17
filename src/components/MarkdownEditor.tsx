import { EffectCallback, useEffect, useState } from "react";
import MarkdownOutput from "./MarkdownOutput";
import Editor from "./Editor";
import Sidenav from "./Sidenav";
import { downloadFile } from "../util/markdownEditorUtils";
import { MarkdownFile } from "../types/markdown";

import "./MarkdownEditor.css";

const MarkdownEditor = (): JSX.Element => {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [currentFile, setCurrentFile] = useState<MarkdownFile>({
    name: "Untitled",
    markdown: "",
  });
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

  useEffect((): ReturnType<EffectCallback> => {
    const savedFiles = handleReadSavedFilesFromLocalStorage();

    if (savedFiles.length) {
      setFiles(savedFiles);
      setCurrentFile({ ...savedFiles[0] });
    } else {
      handleReadIntroductionFile();
    }
  }, []);

  const handleReadSavedFilesFromLocalStorage = (): MarkdownFile[] => {
    return (
      Object.entries(localStorage)
        .filter((item) => item[0].includes("md:"))
        .map((storage) => {
          return {
            name: storage[0].substring(3, storage[0].length),
            markdown: storage[1],
          };
        }) || []
    );
  };

  const handleReadIntroductionFile = (): void => {
    //@ts-ignore
    import(`../text.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => {
            return res.text();
          })
          .then((res) => {
            setCurrentFile({ ...currentFile, markdown: res });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleFileSelect = (name: string): void => {
    setCurrentFile({
      name,
      markdown: localStorage.getItem(`md:${name}`) || "",
    });
  };

  const handleFileDelete = (name: string): void => {
    const updatedFiles = [...files].filter((f) => f.name !== name);
    setFiles(updatedFiles);

    localStorage.removeItem(`md:${name}`);
  };

  const handleFileSave = (): void => {
    const fileAlreadyExists = files.some(
      (f: MarkdownFile) => f.name === currentFile.name
    );

    if (fileAlreadyExists) {
      const updatedFiles = files.map((f: MarkdownFile) =>
        f.name === currentFile.name
          ? { ...f, markdown: currentFile.markdown }
          : f
      );
      setFiles(updatedFiles);
    } else {
      setFiles([
        ...files,
        { name: currentFile.name, markdown: currentFile.markdown },
      ]);
      setCurrentFile({ ...currentFile, name: currentFile.name });
    }

    localStorage.setItem(`md:${currentFile.name}`, currentFile.markdown);
  };

  const handleFileNameChange = (name: string): void => {
    setCurrentFile({ ...currentFile, name });
  };

  return (
    <div className="markdown-editor">
      <Sidenav
        files={files}
        currentFile={currentFile}
        activeTab={activeTab}
        changeTab={(tab) => setActiveTab(tab)}
        clearCurrentFile={() =>
          setCurrentFile({ ...currentFile, markdown: "" })
        }
        changeFileName={handleFileNameChange}
        saveFile={handleFileSave}
        downloadFile={() => downloadFile(currentFile)}
        selectFile={handleFileSelect}
        deleteFile={handleFileDelete}
      />
      <div className="output">
        {activeTab === "editor" ? (
          <Editor file={currentFile} updateCurrentFile={setCurrentFile} />
        ) : (
          <MarkdownOutput markdown={currentFile.markdown} />
        )}
      </div>
    </div>
  );
};

export default MarkdownEditor;

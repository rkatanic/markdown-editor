import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import EditControls from "../components/EditControls";
import Markdown from "../components/Markdown";
import { ReactComponent as DownloadIcon } from "../assets/icons/download.svg";
import { ReactComponent as DeleteIcon } from "../assets/icons/delete.svg";
import { ReactComponent as UploadIcon } from "../assets/icons/upload.svg";

import "./Editor.css";

const Editor = ({ markdown, setMarkdown }) => {
  const [page, setPage] = useState("markdown");
  const textareaRef = useRef();

  const handleMarkdownPrefixInsert = (text) => {
    const selectStart = textareaRef.current.selectionStart;

    const front = markdown.substring(0, selectStart);
    const back = markdown.substring(selectStart, markdown.length);

    setMarkdown(front + text + back);
  };

  const handleMarkdownSuffixInsert = (text) => {
    const selectEnd = textareaRef.current.selectionEnd;
    const front = markdown.substring(0, selectEnd);
    const back = markdown.substring(selectEnd, markdown.length);

    setMarkdown(front + text + back);
  };

  const handleMarkdownInsert = (
    fullMarkdown,
    markdownPrefix,
    markdownSuffix
  ) => {
    const selectStart = textareaRef.current.selectionStart;
    const selectEnd = textareaRef.current.selectionEnd;

    const front = markdown.substring(0, selectStart);
    var back = markdown.substring(selectStart, markdown.length);

    if (selectStart !== selectEnd) {
      const middle = markdown.slice(selectStart, selectEnd);
      back = back.substring(middle.length, markdown.length);
      setMarkdown(front + markdownPrefix + middle + markdownSuffix + back);
    } else {
      setMarkdown(front + fullMarkdown + back);
    }
  };

  const handleMarkdownUpload = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      setMarkdown(e.target.result);
    };
  };

  const handleMarkdownDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([markdown], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "markdown.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const checkWindowWidth = () => {
    if (window.innerWidth > 1200) {
      setPage("markdown");
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);

    return () => window.removeEventListener("resize", checkWindowWidth);
  }, []);

  return (
    <div className="editor">
      <div className="editor-header">
        <div className="editor-header-pages">
          <div
            onClick={() => setPage("markdown")}
            className={`editor-header-page-txt ${
              page === "markdown" ? "editor-header-page-txt-active" : ""
            }`}
          >
            Markdown
          </div>
          <div
            onClick={() => setPage("preview")}
            className={`editor-header-page-txt ${
              page === "preview" ? "editor-header-page-txt-active" : ""
            }`}
          >
            Preview
          </div>
        </div>
        <EditControls
          isMarkdownEmpty={markdown.length <= 0}
          insertMarkdown={handleMarkdownInsert}
          insertMarkdownPrefix={handleMarkdownPrefixInsert}
          insertMarkdownSuffix={handleMarkdownSuffixInsert}
        />
      </div>
      {page === "markdown" ? (
        <div className="editor-input-container">
          <textarea
            placeholder="Enter markdown"
            ref={textareaRef}
            autoFocus
            className="editor-input"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          <div className="editor-input-footer">
            <span>
              Total characters:{" "}
              <span className="markdown-length">{markdown.length}</span>
            </span>
            <div className="markdown-options">
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => setMarkdown("")}
              />
              <IconButton
                {...{ disabled: markdown.length <= 0 }}
                icon={<DownloadIcon />}
                downloadMarkdown={handleMarkdownDownload}
              />
              <button className="markdown-file-upload">
                <UploadIcon />
                <input type="file" title="" onChange={handleMarkdownUpload} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Markdown markdown={markdown} />
      )}
    </div>
  );
};

export default Editor;

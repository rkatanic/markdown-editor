import { MarkdownFile } from "../types/markdown";

export const downloadFile = (currentFile: MarkdownFile): void => {
  const element = document.createElement("a");
  const file = new Blob([currentFile.markdown], {
    type: "text/plain",
  });
  element.href = URL.createObjectURL(file);
  element.download = `${currentFile.name}.md`;
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
};

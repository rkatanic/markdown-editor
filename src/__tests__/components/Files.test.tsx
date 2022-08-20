import { fireEvent, render, RenderResult } from "@testing-library/react";
import Files from "../../components/Files";
import { MarkdownFile } from "../../types/markdown";

describe("Files", (): void => {
  const mockFiles = [
    { name: "File 1", markdown: "content" },
    { name: "File 2", markdown: "" },
  ] as MarkdownFile[];

  const mockSelectFile = jest.fn();
  const mockDeleteFile = jest.fn();
  const mockToggleFilesShow = jest.fn();

  const renderTestComponent = (
    files = mockFiles,
    showFiles = false
  ): RenderResult =>
    render(
      <Files
        files={files}
        currentFile={mockFiles[0]}
        selectFile={mockSelectFile}
        deleteFile={mockDeleteFile}
        toggleFilesShow={mockToggleFilesShow}
        showFiles={showFiles}
      />
    );

  it("should render", (): void => {
    const { baseElement } = renderTestComponent();

    expect(baseElement).toMatchSnapshot();
  });

  it("should render with overlay", (): void => {
    const { baseElement } = renderTestComponent(mockFiles, true);

    expect(baseElement).toMatchSnapshot();
  });

  it("should render without files", (): void => {
    const { baseElement } = renderTestComponent([]);

    expect(baseElement).toMatchSnapshot();
  });

  it("should call selectFile on file name", (): void => {
    const { getByText } = renderTestComponent();

    fireEvent.click(getByText("File 1"));

    expect(mockSelectFile).toHaveBeenNthCalledWith(1, "File 1");
  });

  it("should call selectFile on file content", (): void => {
    const { getByText } = renderTestComponent();

    fireEvent.click(getByText("content"));

    expect(mockSelectFile).toHaveBeenNthCalledWith(1, "File 1");
  });

  it("should call deleteFile", (): void => {
    const { getAllByTestId } = renderTestComponent();

    fireEvent.click(getAllByTestId("trash-icon")[0]);

    expect(mockDeleteFile).toHaveBeenCalledTimes(1);
  });

  it("should call toggleFilesShow", (): void => {
    const { getByTestId } = renderTestComponent();

    fireEvent.click(getByTestId("x-icon"));

    expect(mockToggleFilesShow).toHaveBeenCalledTimes(1);
  });
});

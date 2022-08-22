import { fireEvent, render, RenderResult } from "@testing-library/react";
import File from "../../components/File";

describe("File", (): void => {
  const mockFile = { name: "File name", markdown: "markdown text" };

  const mockDeleteFile = jest.fn();
  const mockSelectFile = jest.fn();

  const renderTestComponent = (currentFileName: string): RenderResult =>
    render(
      <File
        currentFileName={currentFileName}
        file={mockFile}
        deleteFile={mockDeleteFile}
        selectFile={mockSelectFile}
      />
    );

  it("should render", (): void => {
    const { baseElement } = renderTestComponent("");

    expect(baseElement).toMatchSnapshot();
  });

  it("should render current select file", (): void => {
    const { baseElement } = renderTestComponent("File name");

    expect(baseElement).toMatchSnapshot();
  });

  it("should delete file", (): void => {
    const { getByTestId, getByText, queryByTestId } = renderTestComponent("");

    fireEvent.click(getByTestId("trash-icon"));
    fireEvent.click(getByText("Delete"));

    expect(mockDeleteFile).toHaveBeenCalledWith("File name");
    expect(queryByTestId("delete-file-modal")).not.toBeInTheDocument();
  });

  it("should select file when clicked on file name", (): void => {
    const { getByText } = renderTestComponent("");

    fireEvent.click(getByText("File name"));

    expect(mockSelectFile).toHaveBeenCalledWith("File name");
  });

  it("should select file when clicked on file markdown", (): void => {
    const { getByText } = renderTestComponent("");

    fireEvent.click(getByText("markdown text"));

    expect(mockSelectFile).toHaveBeenCalledWith("File name");
  });
});

import { fireEvent, render } from "@testing-library/react";
import Files from "../../components/Files";

describe("Files", (): void => {
  const files = [
    { name: "File 1", markdown: "content" },
    { name: "File 2", markdown: "" },
  ];
  it("should render", () => {
    const { baseElement } = render(
      <Files
        files={files}
        currentFile={files[0]}
        selectFile={jest.fn()}
        deleteFile={jest.fn()}
        closeSidenav={jest.fn()}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should render without files", () => {
    const { baseElement } = render(
      <Files
        files={[]}
        currentFile={undefined as any}
        selectFile={jest.fn()}
        deleteFile={jest.fn()}
        closeSidenav={jest.fn()}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should call selectFile on file name", (): void => {
    const mockSelectFile = jest.fn();
    const { getByText } = render(
      <Files
        files={files}
        currentFile={files[0]}
        selectFile={mockSelectFile}
        deleteFile={jest.fn()}
        closeSidenav={jest.fn()}
      />
    );

    fireEvent.click(getByText("File 1"));

    expect(mockSelectFile).toHaveBeenNthCalledWith(1, "File 1");
  });

  it("should call selectFile on file content", (): void => {
    const mockSelectFile = jest.fn();
    const { getByText } = render(
      <Files
        files={files}
        currentFile={files[0]}
        selectFile={mockSelectFile}
        deleteFile={jest.fn()}
        closeSidenav={jest.fn()}
      />
    );

    fireEvent.click(getByText("content"));

    expect(mockSelectFile).toHaveBeenNthCalledWith(1, "File 1");
  });

  it("should call deleteFile", (): void => {
    const mockDeleteFile = jest.fn();
    const { getAllByText } = render(
      <Files
        files={files}
        currentFile={files[0]}
        selectFile={jest.fn()}
        deleteFile={mockDeleteFile}
        closeSidenav={jest.fn()}
      />
    );

    fireEvent.click(getAllByText("trash.svg")[0]);

    expect(mockDeleteFile).toHaveBeenCalledTimes(1);
  });
});

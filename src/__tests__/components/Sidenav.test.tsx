import { fireEvent, render } from "@testing-library/react";
import Sidenav from "../../components/Sidenav";

describe("Sidenav", (): void => {
  const files = [
    { name: "File 1", markdown: "content" },
    { name: "File 2", markdown: "" },
  ];

  it("should render", () => {
    const { baseElement } = render(
      <Sidenav
        files={files}
        currentFile={files[0]}
        activeTab="editor"
        changeTab={jest.fn()}
        changeFileName={jest.fn()}
        clearCurrentFile={jest.fn()}
        selectFile={jest.fn()}
        deleteFile={jest.fn()}
        saveFile={jest.fn()}
        downloadFile={jest.fn()}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should open sidenav", (): void => {
    const { getByText, baseElement } = render(
      <Sidenav
        files={files}
        currentFile={files[0]}
        activeTab="editor"
        changeTab={jest.fn()}
        changeFileName={jest.fn()}
        clearCurrentFile={jest.fn()}
        selectFile={jest.fn()}
        deleteFile={jest.fn()}
        saveFile={jest.fn()}
        downloadFile={jest.fn()}
      />
    );

    fireEvent.click(getByText("menu.svg"));

    expect(baseElement.querySelector(".sidenav")).toHaveClass("sidenav-open");
  });

  it("should close sidenav", (): void => {
    const { getByText, baseElement } = render(
      <Sidenav
        files={files}
        currentFile={files[0]}
        activeTab="preview"
        changeTab={jest.fn()}
        changeFileName={jest.fn()}
        clearCurrentFile={jest.fn()}
        selectFile={jest.fn()}
        deleteFile={jest.fn()}
        saveFile={jest.fn()}
        downloadFile={jest.fn()}
      />
    );

    fireEvent.click(getByText("x.svg"));

    expect(baseElement.querySelector(".sidenav")).not.toHaveClass(
      "sidenav-open"
    );
  });

  it.each([
    ["editor", "pencil.svg"],
    ["preview", "eye.svg"],
  ])(
    "should change active tab to %s when clicked on %s",
    (tabName: string, icon: string): void => {
      const mockChangeTab = jest.fn();
      const { getByText } = render(
        <Sidenav
          files={files}
          currentFile={files[0]}
          activeTab="editor"
          changeTab={mockChangeTab}
          changeFileName={jest.fn()}
          clearCurrentFile={jest.fn()}
          selectFile={jest.fn()}
          deleteFile={jest.fn()}
          saveFile={jest.fn()}
          downloadFile={jest.fn()}
        />
      );

      fireEvent.click(getByText(icon));

      expect(mockChangeTab).toHaveBeenNthCalledWith(1, tabName);
    }
  );

  it("should call deleteFile", (): void => {
    const mockDeleteFile = jest.fn();
    const { getAllByText } = render(
      <Sidenav
        files={files}
        currentFile={files[0]}
        activeTab="editor"
        changeTab={jest.fn()}
        changeFileName={jest.fn()}
        clearCurrentFile={jest.fn()}
        selectFile={jest.fn()}
        deleteFile={mockDeleteFile}
        saveFile={jest.fn()}
        downloadFile={jest.fn()}
      />
    );

    fireEvent.click(getAllByText("trash.svg")[0]);

    expect(mockDeleteFile).toHaveBeenNthCalledWith(1, files[0].name);
  });

  it("should call selectFile", (): void => {
    const mockSelectFile = jest.fn();
    const { getByText } = render(
      <Sidenav
        files={files}
        currentFile={files[0]}
        activeTab="editor"
        changeTab={jest.fn()}
        changeFileName={jest.fn()}
        clearCurrentFile={jest.fn()}
        selectFile={mockSelectFile}
        deleteFile={jest.fn()}
        saveFile={jest.fn()}
        downloadFile={jest.fn()}
      />
    );

    fireEvent.click(getByText(files[0].name));

    expect(mockSelectFile).toHaveBeenNthCalledWith(1, files[0].name);
  });

  it("should call changeFileName", (): void => {
    const mockChangeFileName = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <Sidenav
        files={files}
        currentFile={files[0]}
        activeTab="editor"
        changeTab={jest.fn()}
        changeFileName={mockChangeFileName}
        clearCurrentFile={jest.fn()}
        selectFile={jest.fn()}
        deleteFile={jest.fn()}
        saveFile={jest.fn()}
        downloadFile={jest.fn()}
      />
    );

    fireEvent.click(getByText("save.svg"));
    fireEvent.change(getByPlaceholderText("File name"), {
      target: { value: "new value" },
    });

    expect(mockChangeFileName).toHaveBeenCalledTimes(1);
  });
});

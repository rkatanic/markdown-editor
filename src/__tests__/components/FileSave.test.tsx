import { fireEvent, render } from "@testing-library/react";
import FileSave from "../../components/FileSave";

describe("FileSave", (): void => {
  it("should render", () => {
    const { baseElement } = render(
      <FileSave
        fileName="File Name"
        saveFile={jest.fn()}
        changeFileName={jest.fn()}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should render with popup", (): void => {
    const { getByText, baseElement } = render(
      <FileSave
        fileName="File Name"
        saveFile={jest.fn()}
        changeFileName={jest.fn()}
      />
    );

    fireEvent.click(getByText("save.svg"));

    expect(baseElement).toMatchSnapshot();
  });

  it("should close file save popup", (): void => {
    const { getByText, queryByTestId } = render(
      <FileSave
        fileName="File Name"
        saveFile={jest.fn()}
        changeFileName={jest.fn()}
      />
    );

    fireEvent.click(getByText("save.svg"));

    expect(queryByTestId("file-save-dialog")).toBeInTheDocument();

    fireEvent.click(getByText("x.svg"));

    expect(queryByTestId("file-save-dialog")).not.toBeInTheDocument();
  });

  it("should close file save popup when clicked outside", (): void => {
    const { getByText, queryByTestId } = render(
      <FileSave
        fileName="File Name"
        saveFile={jest.fn()}
        changeFileName={jest.fn()}
      />
    );

    fireEvent.click(getByText("save.svg"));

    expect(queryByTestId("file-save-dialog")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(queryByTestId("file-save-dialog")).not.toBeInTheDocument();
  });

  it("should call saveFile", (): void => {
    const mockSaveFile = jest.fn();
    const { getByText } = render(
      <FileSave
        fileName="File Name"
        saveFile={mockSaveFile}
        changeFileName={jest.fn()}
      />
    );

    fireEvent.click(getByText("save.svg"));
    fireEvent.click(getByText("Save"));

    expect(mockSaveFile).toHaveBeenCalledTimes(1);
  });

  it("should call changeFileName", (): void => {
    const mockChangeFileName = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <FileSave
        fileName="File Name"
        saveFile={jest.fn()}
        changeFileName={mockChangeFileName}
      />
    );

    fireEvent.click(getByText("save.svg"));
    fireEvent.change(getByPlaceholderText("File name"), {
      target: { value: "new value" },
    });

    expect(mockChangeFileName).toHaveBeenCalledTimes(1);
  });

  it("should display error message when file name is empty", (): void => {
    const { getByText, getByPlaceholderText } = render(
      <FileSave
        fileName="File Name"
        saveFile={jest.fn()}
        changeFileName={jest.fn()}
      />
    );

    fireEvent.click(getByText("save.svg"));
    fireEvent.change(getByPlaceholderText("File name"), {
      target: { value: "" },
    });

    expect(getByText("Must not be blank")).toBeInTheDocument();
  });
});

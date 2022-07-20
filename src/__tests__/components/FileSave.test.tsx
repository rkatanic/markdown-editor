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
});

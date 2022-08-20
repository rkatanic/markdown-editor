import { fireEvent, render, RenderResult } from "@testing-library/react";
import FileSave from "../../components/FileSave";

describe("FileSave", (): void => {
  const mockSaveFile = jest.fn();
  const mockChangeFileName = jest.fn();

  const renderTestComponent = (): RenderResult =>
    render(
      <FileSave
        fileName="File Name"
        saveFile={mockSaveFile}
        changeFileName={mockChangeFileName}
      />
    );

  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it("should render", (): void => {
    const { baseElement } = renderTestComponent();

    expect(baseElement).toMatchSnapshot();
  });

  it("should save file", (): void => {
    const { getByTestId } = renderTestComponent();

    fireEvent.click(getByTestId("save-icon"));

    expect(mockSaveFile).toHaveBeenCalledTimes(1);
  });

  it("should change file name", (): void => {
    const { getByDisplayValue } = renderTestComponent();

    fireEvent.change(getByDisplayValue("File Name"), {
      target: { value: "new value" },
    });

    expect(mockChangeFileName).toHaveBeenCalledTimes(1);
    expect(mockChangeFileName).toHaveBeenCalledWith("new value");
  });
});

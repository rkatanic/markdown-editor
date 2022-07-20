import { fireEvent, render } from "@testing-library/react";
import Sidenav from "../../components/Sidenav";

describe("Sidenav", (): void => {
  it("should render", () => {
    const { baseElement } = render(
      <Sidenav
        activeTab="editor"
        changeTab={jest.fn()}
        clearCurrentFile={jest.fn()}
        downloadFile={jest.fn()}
        numberOfFiles={4}
        toggleFilesShow={jest.fn()}
      />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should call toggleFilesShow", (): void => {
    const mockToggleFilesShow = jest.fn();
    const { getByText, baseElement } = render(
      <Sidenav
        activeTab="editor"
        changeTab={jest.fn()}
        clearCurrentFile={jest.fn()}
        downloadFile={jest.fn()}
        numberOfFiles={0}
        toggleFilesShow={mockToggleFilesShow}
      />
    );

    fireEvent.click(getByText("folder.svg"));

    expect(mockToggleFilesShow).toHaveBeenCalled();
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
          activeTab="preview"
          changeTab={mockChangeTab}
          clearCurrentFile={jest.fn()}
          downloadFile={jest.fn()}
          numberOfFiles={0}
          toggleFilesShow={jest.fn()}
        />
      );

      fireEvent.click(getByText(icon));

      expect(mockChangeTab).toHaveBeenNthCalledWith(1, tabName);
    }
  );
});

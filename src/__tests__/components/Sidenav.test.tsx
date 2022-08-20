import { fireEvent, render, RenderResult } from "@testing-library/react";
import Sidenav from "../../components/Sidenav";

describe("Sidenav", (): void => {
  const mockChangeTab = jest.fn();
  const mockClearCurrentFile = jest.fn();
  const mockDownloadFile = jest.fn();
  const mockToggleShowFiles = jest.fn();

  const renderTestComponent = (): RenderResult =>
    render(
      <Sidenav
        activeTab="editor"
        changeTab={mockChangeTab}
        clearCurrentFile={mockClearCurrentFile}
        downloadFile={mockDownloadFile}
        toggleShowFiles={mockToggleShowFiles}
      />
    );

  beforeEach((): void => {
    jest.clearAllMocks();
  });

  it("should render", (): void => {
    const { baseElement } = renderTestComponent();

    expect(baseElement).toMatchSnapshot();
  });

  it("should open menu", (): void => {
    const { getByTestId } = renderTestComponent();

    fireEvent.click(getByTestId("menu-icon"));
    expect(getByTestId("sidenav-overlay")).toBeInTheDocument();
    expect(getByTestId("x-icon")).toBeInTheDocument();
    expect(getByTestId("sidenav-menu").className).toContain("top-0");
  });

  it("should close menu when clicked on x icon", (): void => {
    const { getByTestId, queryByTestId } = renderTestComponent();

    fireEvent.click(getByTestId("menu-icon"));
    fireEvent.click(getByTestId("x-icon"));

    expect(queryByTestId("sidenav-overlay")).not.toBeInTheDocument();
    expect(queryByTestId("x-icon")).not.toBeInTheDocument();
    expect(getByTestId("sidenav-menu").className).toContain("-top-full");
  });

  it("should close menu when clicked on sidenav overlay", (): void => {
    const { getByTestId, queryByTestId } = renderTestComponent();

    fireEvent.click(getByTestId("menu-icon"));
    fireEvent.click(getByTestId("sidenav-overlay"));

    expect(queryByTestId("sidenav-overlay")).not.toBeInTheDocument();
    expect(queryByTestId("x-icon")).not.toBeInTheDocument();
    expect(getByTestId("sidenav-menu").className).toContain("-top-full");
  });

  it("should toggle files show", (): void => {
    const { getByTestId } = renderTestComponent();

    fireEvent.click(getByTestId("folder-icon"));

    expect(mockToggleShowFiles).toHaveBeenCalled();
  });

  it("should download file", (): void => {
    const { getByTestId } = renderTestComponent();

    fireEvent.click(getByTestId("download-icon"));

    expect(mockDownloadFile).toHaveBeenCalledTimes(1);
  });

  it("should clear current file", (): void => {
    const { getByTestId } = renderTestComponent();

    fireEvent.click(getByTestId("x-circle-icon"));

    expect(mockClearCurrentFile).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["editor", "edit-icon"],
    ["preview", "eye-icon"],
  ])(
    "should change active tab to %s when clicked on %s",
    (tabName: string, icon: string): void => {
      const { getByTestId } = renderTestComponent();

      fireEvent.click(getByTestId(icon));

      expect(mockChangeTab).toHaveBeenNthCalledWith(1, tabName);
    }
  );
});

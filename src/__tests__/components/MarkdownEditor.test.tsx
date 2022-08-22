import { fireEvent, render } from "@testing-library/react";
import MarkdownEditor from "../../components/MarkdownEditor";
import { downloadFile } from "../../util/markdownEditorUtils";

jest.mock("react-markdown", () => (props: any): JSX.Element => {
  return <div>{props.children}</div>;
});
jest.mock("remark-gfm", () => () => {});
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => () => {});
jest.mock("../../util/markdownEditorUtils", () => ({
  downloadFile: jest.fn(),
}));

describe("MarkdownEditor", (): void => {
  afterEach((): void => {
    jest.clearAllMocks();
  });

  it("should render", (): void => {
    const { baseElement } = render(<MarkdownEditor />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should render with output", (): void => {
    const { baseElement, getByTestId } = render(<MarkdownEditor />);

    fireEvent.click(getByTestId("eye-icon"));

    expect(baseElement).toMatchSnapshot();
  });

  it("should save file", (): void => {
    Storage.prototype.setItem = jest.fn();
    const { getByTestId, getByDisplayValue } = render(<MarkdownEditor />);

    fireEvent.change(getByDisplayValue("Untitled"), {
      target: { value: "New file" },
    });
    fireEvent.click(getByTestId("save-icon"));

    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "md:New file", "");
  });

  it("should delete file", (): void => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
    const { getByTestId, getByDisplayValue, getByText } = render(
      <MarkdownEditor />
    );

    fireEvent.change(getByDisplayValue("Untitled"), {
      target: { value: "New file" },
    });
    fireEvent.click(getByTestId("save-icon"));
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "md:New file", "");

    fireEvent.click(getByTestId("trash-icon"));
    fireEvent.click(getByText("Delete"));
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, "md:New file");
  });

  it("should toggle files menu", (): void => {
    const { getByTestId, queryByTestId } = render(<MarkdownEditor />);

    fireEvent.click(getByTestId("folder-icon"));
    expect(getByTestId("files-overlay")).toBeInTheDocument();

    fireEvent.click(getByTestId("x-icon"));
    expect(queryByTestId("files-overlay")).not.toBeInTheDocument();
  });

  it("should download file", (): void => {
    Object.defineProperty(window, "localStorage", {
      value: {
        key: "md:something",
        value: "markdown",
      },
    });
    (downloadFile as jest.Mock).mockReturnValue("file");
    const { getByTestId } = render(<MarkdownEditor />);

    fireEvent.click(getByTestId("download-icon"));

    expect(downloadFile).toHaveBeenNthCalledWith(1, {
      name: "Untitled",
      markdown: "",
    });
  });
});

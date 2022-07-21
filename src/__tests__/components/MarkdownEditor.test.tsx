import { fireEvent, render } from "@testing-library/react";
import MarkdownEditor from "../../components/MarkdownEditor";
import { downloadFile } from "../../util/markdownEditorUtils";

jest.mock("react-markdown", () => (props: any) => {
  return <div>{props.children}</div>;
});
jest.mock("remark-gfm", () => () => {});
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => () => {});
jest.mock("../../util/markdownEditorUtils", () => ({
  downloadFile: jest.fn(),
}));

describe("MarkdownEditor", (): void => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", (): void => {
    const { baseElement } = render(<MarkdownEditor />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should render with output", (): void => {
    const { baseElement, getByText } = render(<MarkdownEditor />);

    fireEvent.click(getByText("eye.svg"));

    expect(baseElement).toMatchSnapshot();
  });

  it("should save file", (): void => {
    Storage.prototype.setItem = jest.fn();
    const { baseElement, getByText, getByDisplayValue } = render(
      <MarkdownEditor />
    );

    fireEvent.change(getByDisplayValue("Untitled"), {
      target: { value: "New file" },
    });
    fireEvent.click(getByText("save.svg"));

    expect(baseElement.querySelector(".file-name")).toHaveTextContent(
      "New file"
    );
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "md:New file", "");
  });

  it("should delete file", (): void => {
    Storage.prototype.setItem = jest.fn();
    Storage.prototype.removeItem = jest.fn();
    const { baseElement, getByText, queryByText, getByDisplayValue } = render(
      <MarkdownEditor />
    );

    fireEvent.change(getByDisplayValue("Untitled"), {
      target: { value: "New file" },
    });
    fireEvent.click(getByText("save.svg"));
    expect(baseElement.querySelector(".file-name")).toHaveTextContent(
      "New file"
    );
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, "md:New file", "");

    fireEvent.click(getByText("trash.svg"));
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, "md:New file");
    expect(queryByText("New file")).not.toBeInTheDocument();
  });

  it("should toggle files menu", (): void => {
    const { baseElement, getByText } = render(<MarkdownEditor />);

    fireEvent.click(getByText("folder.svg"));
    expect(baseElement.querySelector(".files")).toHaveClass("files-open");

    fireEvent.click(getByText("x.svg"));
    expect(baseElement.querySelector(".files")).not.toHaveClass("files-open");
  });

  it("should downlaod file", (): void => {
    Object.defineProperty(window, "localStorage", {
      value: {
        key: "md:something",
        value: "markdown",
      },
    });
    (downloadFile as jest.Mock).mockReturnValue("file");
    const { getByText } = render(<MarkdownEditor />);

    fireEvent.click(getByText("download.svg"));

    expect(downloadFile).toHaveBeenNthCalledWith(1, {
      name: "Untitled",
      markdown: "",
    });
  });
});

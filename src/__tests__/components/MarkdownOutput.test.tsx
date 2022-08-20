import { render } from "@testing-library/react";
import MarkdownOutput from "../../components/MarkdownOutput";

jest.mock("react-markdown", () => (props: any): JSX.Element => {
  return <div>{props.children}</div>;
});
jest.mock("remark-gfm", () => () => {});
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => () => {});
jest.mock("../../util/markdownEditorUtils", () => ({
  downloadFile: jest.fn(),
}));

describe("MarkdownOutput", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <MarkdownOutput markdown="markdown content" />
    );

    expect(baseElement).toMatchSnapshot();
  });
});

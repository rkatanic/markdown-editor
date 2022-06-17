import { render } from "@testing-library/react";
import MarkdownOutput from "../../components/MarkdownOutput";

describe("MarkdownOutput", () => {
  it("should render", () => {
    const { baseElement } = render(<MarkdownOutput markdown="markdown" />);

    expect(baseElement).toMatchSnapshot();
  });
});

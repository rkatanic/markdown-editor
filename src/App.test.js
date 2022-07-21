import { render } from "@testing-library/react";
import App from "./App";

jest.mock("react-markdown", () => () => {});
jest.mock("remark-gfm", () => () => {});
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => () => {});

describe("App", () => {
  it("should render", () => {
    const { baseElement } = render(<App />);

    expect(baseElement.querySelector(".App")).toBeInTheDocument();
  });
});

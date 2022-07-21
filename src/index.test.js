import ReactDOM from "react-dom";
import { ReactStrictMode, rootElement } from "./index";

jest.mock("react-dom", () => ({ render: jest.fn() }));
jest.mock("react-markdown", () => () => {});
jest.mock("remark-gfm", () => () => {});
jest.mock("react-syntax-highlighter/dist/esm/styles/prism", () => () => {});

describe("index.js", () => {
  it("should render without crashing", () => {
    ReactDOM.render(ReactStrictMode, rootElement);

    expect(ReactDOM.render).toHaveBeenCalledWith(ReactStrictMode, rootElement);
  });
});

import { fireEvent, render, RenderResult } from "@testing-library/react";
import Button from "../../components/Button";

describe("Button", (): void => {
  const mockOnClick = jest.fn();

  const renderTestComponent = (
    variant?: "secondary" | "danger"
  ): RenderResult =>
    render(<Button variant={variant} text="button" onClick={mockOnClick} />);

  it("should render as secondary by default", (): void => {
    const { baseElement } = renderTestComponent();

    expect(baseElement).toMatchSnapshot();
  });

  it("should render as danger button", (): void => {
    const { baseElement } = renderTestComponent("danger");

    expect(baseElement).toMatchSnapshot();
  });

  it("should call onClick handler", (): void => {
    const { getByText } = renderTestComponent();

    fireEvent.click(getByText("button"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

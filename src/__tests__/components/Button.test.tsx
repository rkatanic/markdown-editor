import { render, fireEvent } from "@testing-library/react";
import Button from "../../components/Button";

describe("Button", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(<Button onClick={jest.fn} label="label" />);

    expect(baseElement).toMatchSnapshot();
  });

  it("should call onClick", (): void => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button onClick={mockOnClick} label="label" />
    );

    fireEvent.click(getByText("label"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

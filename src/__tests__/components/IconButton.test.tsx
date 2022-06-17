import { render, fireEvent } from "@testing-library/react";
import IconButton from "../../components/IconButton";

describe("IconButton", (): void => {
  it("should render", (): void => {
    const { baseElement } = render(
      <IconButton icon={<>icon</>} tooltip="tooltip text" />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should call onClick", (): void => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <IconButton icon={<>icon</>} onClick={mockOnClick} />
    );

    fireEvent.click(getByText("icon"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});

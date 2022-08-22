import { fireEvent, render, RenderResult } from "@testing-library/react";
import DeleteFileModal from "../../components/DeleteFileModal";

describe("DeleteFileModal", (): void => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();
  const renderTestComponent = (isOpen: boolean): RenderResult =>
    render(
      <DeleteFileModal
        isOpen={isOpen}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

  it("should render", (): void => {
    const { baseElement } = renderTestComponent(true);

    expect(baseElement).toMatchSnapshot();
  });

  it("should not render when is not open", (): void => {
    const { baseElement } = renderTestComponent(false);

    expect(baseElement).toMatchSnapshot();
  });

  it("should close modal when clicked on x icon", (): void => {
    const { getByTestId } = renderTestComponent(true);

    fireEvent.click(getByTestId("x-icon"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should close modal when clicked on modal overlay", (): void => {
    const { getByTestId } = renderTestComponent(true);

    fireEvent.click(getByTestId("delete-file-modal-overlay"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should close modal when clicked on cancel button", (): void => {
    const { getByText } = renderTestComponent(true);

    fireEvent.click(getByText("Cancel"));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should confirm deletion when clicked on delete button", (): void => {
    const { getByText } = renderTestComponent(true);

    fireEvent.click(getByText("Delete"));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});

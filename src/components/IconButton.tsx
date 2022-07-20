import "./IconButton.css";

interface Props {
  icon: JSX.Element;
  onClick?: () => void;
  size?: "small" | "medium";
  disabled?: boolean;
}

const IconButton = ({
  icon,
  onClick,
  size = "medium",
  disabled,
}: Props): JSX.Element => {
  return (
    <button
      disabled={disabled}
      className={`icon-button icon-button-${size}`}
      type="button"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default IconButton;

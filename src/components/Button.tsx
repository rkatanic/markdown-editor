import "./Button.css";

interface Props {
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  label: string;
  disabled?: boolean;
}

const Button = ({
  variant = "primary",
  onClick,
  label,
  disabled,
}: Props): JSX.Element => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={`button button-${variant}`}
    >
      {label}
    </button>
  );
};

export default Button;

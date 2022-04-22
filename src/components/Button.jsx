import "./Button.css";

const Button = ({ variant, onClick, label, disabled }) => {
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

import "./IconButton.css";

interface Props {
  icon: JSX.Element;
  onClick?: () => void;
  tooltip?: string;
  size?: "small" | "medium";
}

const IconButton = ({ icon, onClick, tooltip, size = "medium" }: Props) => {
  return (
    <button
      className={`icon-button icon-button-${size}`}
      type="button"
      onClick={onClick}
    >
      {icon}
      {tooltip && <div className="icon-button-tooltip">{tooltip}</div>}
    </button>
  );
};

export default IconButton;

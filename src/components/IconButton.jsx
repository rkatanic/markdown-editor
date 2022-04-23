import "./IconButton.css";

const IconButton = ({ icon, onClick, tooltip, size = "medium", ...props }) => {
  return (
    <button
      {...props}
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

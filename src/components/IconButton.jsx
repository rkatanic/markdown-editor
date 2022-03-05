import "./IconButton.css";

const IconButton = ({ icon, onClick, ...props }) => {
  return (
    <button {...props} className="icon-button" type="button" onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;

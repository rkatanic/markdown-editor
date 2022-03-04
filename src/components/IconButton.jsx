import "./IconButton.css";

const IconButton = ({ icon, onClick }) => {
  return (
    <button className="icon-button" type="button" onClick={onClick}>
      {icon}
    </button>
  );
};

export default IconButton;

interface Props {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  variant?: "secondary" | "danger";
  className?: string;
}

const Button = ({
  text,
  type = "button",
  onClick,
  disabled,
  variant = "secondary",
  className,
}: Props) => {
  const getButtonStyle = (): string => {
    switch (variant) {
      case "danger":
        return "border-red-600 bg-red-500 text-white hover:bg-red-600 hover:border-red-700 dark:bg-red-700 dark:hover:bg-red-600 dark:hover:border-red-500";
      case "secondary":
        return "border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-600 dark:hover:bg-neutral-600 dark:hover:border-neutral-500";
      default:
        return "border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300 dark:border-neutral-600 dark:hover:bg-neutral-600 dark:hover:border-neutral-500";
    }
  };

  return (
    <button
      className={`${className} py-1.5 shadow-sm font-semibold text-sm border px-4 rounded-md dark:shadow-md ${getButtonStyle()}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

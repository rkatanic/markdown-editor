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
        return "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 dark:hover:bg-zinc-600 dark:hover:border-zinc-500";
      default:
        return "border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 dark:hover:bg-zinc-600 dark:hover:border-zinc-500";
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

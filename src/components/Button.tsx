interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  addTailwindClasses?: string;
  textColor?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      className={`
        ${props.disabled ? "bg-gray-500" : "bg-pink"}
        ${props.textColor || "text-white"}
         rounded px-2 py-2 font-rajdhani font-semibold cursor-pointer transition duration-200 ease-in-out hover:text-yellow hover:scale-102
        ${props.addTailwindClasses}
      `}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

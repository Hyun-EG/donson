import React from "react";

const Button = ({
  children,
  onClick,
  className,
  type = "button",
}: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;

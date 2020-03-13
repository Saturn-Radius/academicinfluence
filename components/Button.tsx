import React, { CSSProperties } from "react";

type ButtonProps = {
  style?: CSSProperties;
  onClick?: () => void;
  color: string;
  text: string;
};

const Button = React.forwardRef(({ onClick, ...props }: ButtonProps, ref) => {
  return (
    <div
      onClick={onClick}
      css={{
        width: 140,
        borderRadius: 30,
        color: "white",
        padding: 8,
        fontSize: 14,
        textAlign: "center",
        boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.25)",
        backgroundColor: props.color,
        ...props.style
      }}
    >
      {props.text}
    </div>
  );
});

export default Button;

import { ReactChild } from "react";
import { PRIMARY_DARK } from "./styles";

type Props = {
  tool: string;
  children?: React.ReactNode;
};

export default function ToolPage(props: Props) {
  return (
    <div
      css={{
        paddingLeft: "80px",
        paddingRight: "80px",
        "@media (max-width: 1024px)": {
          paddingLeft: "20px",
          paddingRight: "20px"
        }
      }}
    >
      <div
        css={{
          display: "inline-block",
          backgroundColor: PRIMARY_DARK,
          color: "white",
          paddingLeft: "10px",
          paddingRight: "10px",
          paddingTop: "7px",
          paddingBottom: "5px",
          marginBottom: "10px",
          fontWeight: "bold",
          fontSize: "16px",
          lineHeight: "20px"
        }}
      >
        {props.tool}
      </div>
      {props.children}
    </div>
  );
}

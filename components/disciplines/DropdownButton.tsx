import React, { CSSProperties, ReactNode, useState } from "react";
import { GRAY, MAIN } from "../../styles";

type DropdownButtonProps = {
  onClick?: () => void;
  image_url: string;
  style?: CSSProperties;
  text: string;
  disciplines: ReactNode[];
};
const DropdownButton = React.forwardRef(
  ({ onClick, ...props }: DropdownButtonProps, ref) => {
    const [isMore, setIsMore] = useState(true);

    const clickButton = () => {
      setIsMore(!isMore);
    };

    return (
      <div>
        <div
          onClick={() => clickButton()}
          style={{ ...styles.button, ...props.style }}
        >
          <img src={props.image_url} style={{ width: 75 }} />
          <span>{props.text}</span>
          {isMore && <img src="/images/arrow-down.png" />}
          {!isMore && <img src="/images/small-arrow-up.png" />}
        </div>
        {!isMore && <div>{props.disciplines}</div>}
      </div>
    );
  }
);
const styles = {
  button: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: 120,
    padding: 12,
    fontSize: 29,
    color: MAIN,
    fontWeight: "bold",
    borderBottomColor: GRAY,
    borderBottomStyle: "solid",
    borderBottomWidth: "thin"
  } as CSSProperties
};

export default DropdownButton;

import React, { useState } from "react";
import styled from "@emotion/styled";
import { PRIMARY_DARK, GRAY_MID } from "../styles";

const StyledButton = styled.button`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  color: ${PRIMARY_DARK};
  font-size: 29px;
  font-weight: bold;
  border: none;
  border-bottom: thin solid ${GRAY_MID};
  outline: none;
`;

const PrependIcon = styled.img`
  height: 80%;
`;

const AppendIcon = styled.img`
  width: 20px;
`;

const DropdownButton = React.forwardRef(
  ({ onClick, href, ...props }: any, ref) => {
    const [isMore, setIsMore] = useState(true);

    const clickButton = () => {
      setIsMore(!isMore);
    };

    return (
      <>
        <StyledButton onClick={() => clickButton()}>
          <PrependIcon src={props.image_url} />
          <span>{props.text}</span>
          {isMore && <AppendIcon src="/images/arrow-down.png" />}
          {!isMore && <AppendIcon src="/images/small-arrow-up.png" />}
        </StyledButton>
        {!isMore &&
          props.items.map((item: any, index: number) => (
            <li key={index}>{item.name}</li>
          ))}
      </>
    );
  }
);

export default DropdownButton;

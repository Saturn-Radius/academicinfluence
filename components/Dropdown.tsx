import React, { useState } from "react";
import styled from "@emotion/styled";
import { Spacer } from "./grid";
import { PRIMARY_DARK, GRAY_MID } from "../styles";

const StyledButton = styled.button`
  width: 100%;
  height: 66px;
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

const Title = styled.span`
  font-family: "Montserrat Bold";
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GRAY_MID};
  margin-left: 10px;
`;

const PrependIcon = styled.img`
  width: 20px;
`;

const ListItem = styled.li`
  padding: 12px;
  font-family: "SF UI Display Medium";
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GRAY_MID};
  list-style: none;
  border-bottom: thin solid ${GRAY_MID};
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
          {isMore && <PrependIcon src="/images/arrow-down.png" />}
          {!isMore && <PrependIcon src="/images/small-arrow-up.png" />}
          <Title>{props.title}</Title>
          <Spacer />
        </StyledButton>
        {!isMore &&
          props.items.map((item: any, index: number) => (
            <ListItem key={index}>{item.name}</ListItem>
          ))}
      </>
    );
  }
);

export default DropdownButton;

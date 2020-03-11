import styled from "@emotion/styled";
import React, { useState } from "react";
import { GRAY, MAIN } from "../styles";
import { Spacer } from "./grid";

const StyledButton = styled.button`
  width: 100%;
  height: 66px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  font-size: 29px;
  font-weight: bold;
  border: none;
  border-bottom: thin solid ${GRAY};
  outline: none;
`;

interface TitleProps {
  readonly isMore: boolean;
}
const Title = styled.span<TitleProps>`
  font-family: "Montserrat Bold";
  font-size: 20px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${props => (props.isMore ? GRAY : MAIN)};
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
  color: ${GRAY};
  list-style: none;
  border-bottom: thin solid ${GRAY};
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
          <Title isMore={isMore}>{props.title}</Title>
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

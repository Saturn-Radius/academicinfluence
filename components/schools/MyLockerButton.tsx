import React, { useState } from "react";
import styled from "@emotion/styled";
import { PRIMARY_DARK, GRAY_MID, GRAY_DARK } from "../../styles";
import DropdownButton from "../Dropdown";
import { Spacer } from "../grid";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledButton = styled.button`
  width: 100%;
  height: 53px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 2px;
  box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.25);
  border: solid 0.5px ${GRAY_DARK};
  background-color: #ffffff;
  padding: 12px;
  outline: none;
`;

const PrependIcon = styled.img`
  height: 100%;
`;

const Title = styled.span`
  color: ${props => GRAY_MID};
  font-family: "SF UI Display Bold";
  font-size: 14px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  margin-left: 10px;
`;

const AppendIcon = styled.img`
  width: 20px;
`;

const CloseIcon = styled(FontAwesomeIcon)`
  width: 20px !important;
  height: 20px !important;
  color: ${GRAY_MID};
`;

const MyLockerButton = React.forwardRef(
  ({ onClick, href, ...props }: any, ref) => {
    const [isMore, setIsMore] = useState(true);

    const clickButton = () => {
      setIsMore(!isMore);
    };

    return (
      <>
        <StyledButton onClick={() => clickButton()}>
          <PrependIcon src={props.image_url} />
          <Title>{props.title}</Title>
          <Spacer />
          {isMore && <AppendIcon src="/images/arrow-down.png" />}
          {!isMore && <CloseIcon icon={faTimes} />}
        </StyledButton>
        {!isMore &&
          props.items.map((item: any, index: number) => (
            <DropdownButton
              key={`my-locker-${item.name}-${index}`}
              items={item.items}
              title={item.name}
              image_url={""}
            />
          ))}
      </>
    );
  }
);

export default MyLockerButton;

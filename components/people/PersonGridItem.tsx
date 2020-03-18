import styled from "@emotion/styled";
import { PersonPartialData } from "../../schema";
import { MAIN_DARKER } from "../../styles";
import { InfluentialCard } from "../school/Influential";

const InfoValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 20px;
  margin-bottom: 0;
`;

const InfoLabel = styled.span`
  font-weight: light;
  font-size: 12px;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`;

const Value = styled.span`
  font-size: 16px;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
`;

const HSpacer = styled.div`
  flex: 1;
`;

interface InfoValueProps {
  readonly label: string;
  readonly value: number | null;
}
const InfoValue = (props: InfoValueProps) =>
  props.value === null ? null : (
    <InfoValueWrapper>
      <InfoLabel>{props.label}</InfoLabel>
      <Value>${props.value.toLocaleString()}</Value>
    </InfoValueWrapper>
  );

interface PersonGridItemProps {
  person: PersonPartialData;
}
const PersonGridItem = (props: PersonGridItemProps) => {
  const { person } = props;

  return <InfluentialCard person={person} />;
};

export default PersonGridItem;

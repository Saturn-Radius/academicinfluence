import styled from "@emotion/styled";
import { PersonLink } from "../../links";
import { PersonPartialData } from "../../schema";
import { GRAY_DARKEST, MAIN_DARKER, MAIN_LIGHTER } from "../../styles";
import { YearRange } from "../../utils/years";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 18px;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 0.5px ${GRAY_DARKEST};
  background-color: #ededed;
  padding: 30px;
`;

const Logo = styled.img`
  width: 93px;
  height: 120px;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  background: #ffffff;
  padding: 18px 27px;
`;

const BodyCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const BodyLeftCol = styled(BodyCol)`
  flex: 4;
`;

const BodyMidCol = styled(BodyCol)`
  flex: 5;
  padding: 0 48px;
`;

const BodyRightCol = styled(BodyCol)`
  flex: 3;
  padding-top: 20px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PersonName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
  margin: 0;
`;

const Location = styled.p`
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  margin: 5px 0;
`;

const InfoValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 5px;
  margin-bottom: 0;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
`;

const Value = styled.span`
  font-size: 20px;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
`;

interface InfoValueProps {
  readonly label: string;
  readonly value: string;
}
const InfoValue = (props: InfoValueProps) =>
  props.value === null ? null : (
    <InfoValueWrapper>
      <InfoLabel>{props.label}</InfoLabel>
      <Value>{props.value}</Value>
    </InfoValueWrapper>
  );

const RankingLabel = styled.span`
  font-size: 15x;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const RankText = styled.span`
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
`;

const PersonDescription = styled.p`
  font-size: 12px;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
`;

const FullDetailsButton = styled.button`
  width: 111px;
  height: 27px;
  border-radius: 30px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  background-color: ${MAIN_LIGHTER};
  margin-top: 4px;
  color: #ffffff;
  outline: none;
`;

interface PersonListItemProps {
  person: PersonPartialData;
  index: number;
}
const PersonListItem = (props: PersonListItemProps) => {
  const { person } = props;

  return (
    <Wrapper>
      <Header>
        <div
          css={{
            position: "absolute",
            left: 0,
            top: 0,
            padding: "10px"
          }}
        >
          #{props.index + 1}
        </div>
        <Logo src={person.image_url || undefined} />
      </Header>
      <Body>
        <BodyLeftCol>
          <PersonName>{person.name}</PersonName>
          <YearRange person={props.person} />
        </BodyLeftCol>
        <BodyMidCol>
          <RankingLabel>Overall Influence</RankingLabel>
          <RankText>#{person.overall.world_rank}</RankText>
          <PersonDescription>{person.short_description}</PersonDescription>
        </BodyMidCol>
        <BodyRightCol>
          <InfoValue
            label="IR Score"
            value={(props.person.overall.influence * 100).toFixed(2)}
          />
          <PersonLink person={person}>
            <FullDetailsButton>See Profile</FullDetailsButton>
          </PersonLink>
        </BodyRightCol>
      </Body>
    </Wrapper>
  );
};

export default PersonListItem;

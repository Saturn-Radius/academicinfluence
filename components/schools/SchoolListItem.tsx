import styled from "@emotion/styled";
import {
  GRAY,
  GRAY_DARKEST,
  GRAY_LIGHTEST,
  MAIN_DARKER,
  MAIN_LIGHTER
} from "../../styles";
import SchoolStatus from "./SchoolStatus";
import { SchoolLink } from "../../links";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 18px;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 0.5px ${GRAY_DARKEST};
  background-color: #ededed;
  padding: 21px;
`;

const Logo = styled.img`
  width: 103px;
  height: 122px;
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

const SchoolName = styled.h2`
  font-family: "Montserrat";
  font-size: 24px;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
  margin: 0;
`;

const Location = styled.p`
  font-family: "SF UI Display Medium";
  font-size: 16px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GRAY};
  margin: 5px 0;
`;

const LawImage = styled.img`
  width: 51px;
  height: 51px;
`;

const LawRank = styled.p`
  font-family: "SF UI Display Bold";
  font-size: 8px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  margin-top: 5px;
  text-align: center;
`;

const LawBadgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const InfoValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 5px;
  margin-bottom: 0;
`;

const InfoLabel = styled.span`
  font-family: "SF UI Display Light";
  font-size: 12px;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${GRAY};
`;

const Value = styled.span`
  font-family: "SF UI Display Medium";
  font-size: 20px;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
`;

interface InfoValueProps {
  readonly label: string;
  readonly value: number;
}
const InfoValue = (props: InfoValueProps) => (
  <InfoValueWrapper>
    <InfoLabel>{props.label}</InfoLabel>
    <Value>${props.value}</Value>
  </InfoValueWrapper>
);

const LawBadge = () => (
  <LawBadgeWrapper>
    <LawImage src={``} />
    <LawRank>#1 for Law</LawRank>
  </LawBadgeWrapper>
);

const RankingLabel = styled.span`
  font-family: "SF UI Display Medium";
  font-size: 15x;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GRAY};
`;

const RankText = styled.span`
  font-family: "Montserrat";
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
`;

const SchoolDescription = styled.p`
  font-family: "SF UI Display Medium";
  font-size: 12px;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${GRAY_LIGHTEST};
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

interface SchoolListItemProps {
  mode: string;
  school: any;
}
const SchoolListItem = (props: SchoolListItemProps) => {
  const { school } = props;
  const {
    slug,
    logo_url,
    overall,
    name,
    city,
    state,
    graduation_rate,
    acceptance_rate,
    short_description,
    undergrad_tuition_in_state,
    average_earnings
  } = school || {};
  const { world_rank } = overall || 1;

  return (
    <Wrapper>
      <Header>
        <Logo src={logo_url} />
      </Header>
      <Body>
        <BodyLeftCol>
          <SchoolName>{name}</SchoolName>
          <Location>
            {city}, {state}
          </Location>
          <Row>
            <SchoolStatus
              graduationRate={graduation_rate}
              acceptanceRate={acceptance_rate}
              size={51}
              fontSize={7}
            />
            <LawBadge />
          </Row>
        </BodyLeftCol>
        <BodyMidCol>
          <RankingLabel>Ranking</RankingLabel>
          <RankText>#{world_rank}</RankText>
          <SchoolDescription>{short_description}</SchoolDescription>
        </BodyMidCol>
        <BodyRightCol>
          <InfoValue label="Tuition" value={undergrad_tuition_in_state} />
          <InfoValue label="Avg. Earnings" value={average_earnings} />
          <SchoolLink school={school}>
            <FullDetailsButton>Full Details</FullDetailsButton>
          </SchoolLink>
        </BodyRightCol>
      </Body>
    </Wrapper>
  );
};

export default SchoolListItem;

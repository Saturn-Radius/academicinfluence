import styled from "@emotion/styled";
import { disciplineName, lookupDiscipline } from "../../disciplines";
import { SchoolLink } from "../../links";
import {
  DisciplinesResponse,
  SchoolData,
  SchoolPartialData
} from "../../schema";
import { GRAY, GRAY_LIGHTEST, MAIN_DARKER, MAIN_LIGHTER } from "../../styles";
import DisciplineIcon from "../DisciplineIcon";
import SchoolStatus from "./SchoolStatus";

const Wrapper = styled.div`
  margin: 10px;
  width: 31%;
  height: 300px;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  padding: 32px 12px 12px 12px;
  height: 90%;
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const Logo = styled.img`
  width: 50px;
  height: 59px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 6px;
`;

const SchoolName = styled.h2`
  font-family: "Montserrat";
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${MAIN_DARKER};
  margin: 0;
`;

const Location = styled.p`
  font-family: "SF UI Display Medium";
  font-size: 12px;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: ${GRAY};
  margin-top: 1px;
  margin-bottom: 0;
`;

const FullDetailsButton = styled.button`
  width: 110px;
  height: 19px;
  border-radius: 30px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
  background-color: ${MAIN_LIGHTER};
  margin-top: 7px;
  color: #ffffff;
  outline: none;
`;

const SchoolDescription = styled.p`
  font-family: "SF UI Display Medium";
  font-size: 12px;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${GRAY_LIGHTEST};
  margin-top: 8px;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  margin-top: 10px;
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
  margin-top: 8px;
  text-align: center;
`;

const LawBadgeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const LawBadge = (props: {
  disciplines: DisciplinesResponse;
  school: SchoolPartialData;
}) =>
  props.school.top_discipline === null ? null : (
    <LawBadgeWrapper>
      <DisciplineIcon
        style={{ fontSize: "51px" }}
        discipline={lookupDiscipline(
          props.disciplines,
          props.school.top_discipline
        )}
      />
      <LawRank>
        #{props.school.top_discipline_rank} for{" "}
        {disciplineName(props.disciplines, props.school.top_discipline)}
      </LawRank>
    </LawBadgeWrapper>
  );

const RankingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const RankingLabel = styled.span`
  font-family: "SF UI Display Medium";
  font-size: 12x;
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

const InfoValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 20px;
  margin-bottom: 0;
`;

const InfoLabel = styled.span`
  font-family: "SF UI Display Light";
  font-size: 12px;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${GRAY};
`;

const Value = styled.span`
  font-family: "SF UI Display Medium";
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

interface SchoolGridItemProps {
  mode: string;
  school: SchoolData;
  disciplines: DisciplinesResponse;
}
const SchoolGridItem = (props: SchoolGridItemProps) => {
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
      <InnerWrapper>
        <HeaderWrapper>
          <Logo src={logo_url || undefined} />
          <Header>
            <SchoolName>{name}</SchoolName>
            <Location>
              {city}, {state}
            </Location>
            <SchoolLink school={school}>
              <FullDetailsButton>Full Details</FullDetailsButton>
            </SchoolLink>
          </Header>
        </HeaderWrapper>
        <Body>
          <SchoolDescription>{short_description}</SchoolDescription>
          <Row>
            <SchoolStatus
              graduationRate={graduation_rate}
              acceptanceRate={acceptance_rate}
              size={51}
              fontSize={8}
            />
            <LawBadge school={school} disciplines={props.disciplines} />
          </Row>
          <Row>
            <RankingWrapper>
              <RankingLabel>Ranking</RankingLabel>
              <RankText>#{world_rank}</RankText>
            </RankingWrapper>
            <HSpacer />
            <InfoValue label="Tuition" value={undergrad_tuition_in_state} />
            <InfoValue label="Avg. Earnings" value={average_earnings} />
          </Row>
        </Body>
      </InnerWrapper>
    </Wrapper>
  );
};

export default SchoolGridItem;

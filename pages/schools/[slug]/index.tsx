import { NextPage, NextPageContext } from "next";
import { useMediaQuery } from "react-responsive";
import { apiSchoolPage } from "../../../api";
import ContentCard from "../../../components/ContentCard";
import Description from "../../../components/Description";
import {
  Accreditation,
  Admissions,
  AfterGrad,
  CampusSafety,
  CollegeHeader,
  Cost,
  InfluentialCard,
  Sidebar,
  Weather
} from "../../../components/school";
import DisciplineContainer from "../../../components/school/Discipline";
import Rankings from "../../../components/school/Rankings";
import { SchoolData } from "../../../schema";
import {
  PRIMARY_DARK,
  SectionTitle,
  SectionDescription
} from "../../../styles";

type SchoolProps = {
  school: SchoolData;
};

const School: NextPage<SchoolProps> = (props: SchoolProps) => {
  let {
    logo_url,
    name,
    city,
    state,
    description,
    acceptance_rate,
    graduation_rate
  } = props.school;

  const isBigScreen = useMediaQuery({ query: "(min-width: 1069px)" });

  return (
    <div style={{ display: "flex", marginTop: 60 }}>
      <style jsx>
        {`
          .cardContainer {
            margin-left: 16px;
            width: 300px;
          }
          @media (max-width: 1050px) {
            .cardContainer {
              margin-left: 0px;
            }
          }
        `}
      </style>

      <div style={{ maxWidth: 950, minWidth: 375, marginLeft: "4%" }}>
        <section id="school-header">
          <CollegeHeader
            logo_url={logo_url}
            name={name}
            city={city}
            state={state}
          />

          <ContentCard style={{ marginBottom: 40 }}>
            <Description entity={props.school} />
          </ContentCard>

          <Rankings
            acceptance_rate={acceptance_rate}
            graduation_rate={graduation_rate}
          />
        </section>

        <DisciplineContainer school={props.school} />

        <InfluentialContainer school={props.school} />

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Cost school={props.school} />
          <Admissions school={props.school} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Accreditation />
          <AfterGrad school={props.school} />
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="cardContainer" style={{ marginRight: 0 }}>
            <NotableAlumni />
          </div>

          <div className="cardContainer">
            <Weather data={props.school.weather} />
          </div>

          <div className="cardContainer">
            <CampusSafety school={props.school} />
          </div>
        </div>

        {!isBigScreen && <Sidebar style={{ marginLeft: 0, marginTop: 30 }} />}
        <BackToTop />
      </div>

      {isBigScreen && <Sidebar />}
    </div>
  );
};

const BackToTop = (props: any) => {
  return (
    <div
      style={{ padding: "20px 0px", textAlign: "center" }}
      onClick={() => window.scrollTo(0, 0)}
    >
      BACK TO TOP <img style={{ width: 20 }} src="/images/arrow-up.png" />
    </div>
  );
};

const InfluentialContainer = (props: any) => {
  const { name, people } = props.school;
  const LoremIpsum =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  return (
    <section>
      <SectionTitle id="alumni">
        Who are {name}'s Most influential alumni?
      </SectionTitle>
      <SectionDescription>{LoremIpsum}</SectionDescription>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {people.map((person: any, index: number) => (
          <InfluentialCard
            key={index}
            name={person.name}
            description={person.description}
            short_description={person.short_description}
            ir_score={person.overall.influence}
            slug={person.slug}
          />
        ))}
      </div>
    </section>
  );
};

const NotableAlumni = (props: any) => {
  return (
    <div style={{ minWidth: 300 }}>
      <h4 style={styles.subheaderText}>Notable Alumni</h4>
      <ContentCard style={{ padding: 20 }}>
        <div>Bill Gates</div>
        <div>Bill Gates</div>
        <div>Bill Gates</div>
        <div>Bill Gates</div>
      </ContentCard>
    </div>
  );
};

const styles = {
  subheaderText: {
    color: PRIMARY_DARK,
    fontSize: 22
  }
};

School.getInitialProps = async function(context: NextPageContext) {
  const data = await apiSchoolPage({
    slug: context.query.slug as string
  });

  console.log(data);

  return {
    school: data.school
  };
};
(School as any).currentSection = "influential-schools";

export default School;

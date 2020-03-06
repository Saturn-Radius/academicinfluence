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
import ContactInfo from "../../../components/school/ContactInfo";
import DisciplineContainer from "../../../components/school/Discipline";
import Rankings from "../../../components/school/Rankings";
import { SchoolData } from "../../../schema";
import { SectionDescription, SectionTitle } from "../../../styles";
import LocationMap from "../../../components/school/LocationMap";

type SchoolProps = {
  school: SchoolData;
};

const School: NextPage<SchoolProps> = (props: SchoolProps) => {
  const { school } = props;
  let {
    logo_url,
    name,
    city,
    state,
    description,
    acceptance_rate,
    graduation_rate,
    weather
  } = school;
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
            <Description entity={school} />
          </ContentCard>

          <Rankings
            acceptance_rate={acceptance_rate}
            graduation_rate={graduation_rate}
          />
        </section>

        <DisciplineContainer school={school} />

        <InfluentialContainer school={school} />

        <section>
          <SectionTitle>{name} Admissions & ROI Stats</SectionTitle>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Cost school={school} />
            <Admissions school={school} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Accreditation />
            <AfterGrad school={school} />
          </div>
        </section>

        <section>
          <SectionTitle>{name} Contact & Location</SectionTitle>
          <ContactInfo school={school} />
          <LocationMap />
        </section>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="cardContainer">
            <Weather data={weather} />
          </div>

          <div className="cardContainer">
            <CampusSafety school={school} />
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
  const { school } = props;
  const { name, people } = school;
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

School.getInitialProps = async function(context: NextPageContext) {
  const data = await apiSchoolPage({
    slug: context.query.slug as string
  });

  return {
    school: data.school
  };
};
(School as any).currentSection = "influential-schools";

export default School;

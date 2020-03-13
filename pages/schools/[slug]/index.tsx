import { NextPage, NextPageContext } from "next";
import { apiSchoolPage } from "../../../api";
import ContentCard from "../../../components/ContentCard";
import Description from "../../../components/Description";
import HtmlContent from "../../../components/HtmlContent";
import {
  Admissions,
  AfterGrad,
  CampusSafety,
  CollegeHeader,
  Cost,
  InfluentialCard,
  Weather
} from "../../../components/school";
import ContactInfo from "../../../components/school/ContactInfo";
import DisciplineContainer from "../../../components/school/Discipline";
import LocationMap from "../../../components/school/LocationMap";
import Rankings from "../../../components/school/Rankings";
import { SchoolData } from "../../../schema";
import { SectionDescription, SectionTitle } from "../../../styles";
import StandardPage from "../../../templates/StandardPage";

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

  return (
    <StandardPage title={name}>
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

      <section id="school-header">
        <CollegeHeader school={school} />

        <ContentCard style={{ marginBottom: 40 }}>
          <Description entity={school} />
        </ContentCard>

        <Rankings school={school} />
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
          {/*TODO <Accreditation /> */}
          <AfterGrad school={school} />
        </div>
      </section>

      <section>
        <SectionTitle>{name} Contact & Location</SectionTitle>
        <ContactInfo school={school} />
        {school.location && <LocationMap location={school.location} />}
      </section>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className="cardContainer">
          <Weather data={weather} />
        </div>

        <div className="cardContainer">
          <CampusSafety school={school} />
        </div>
      </div>
    </StandardPage>
  );
};

const InfluentialContainer = (props: { school: SchoolData }) => {
  const { school } = props;
  const { name } = school;

  return (
    <section>
      <SectionTitle id="alumni">
        Who are {name}'s Most influential alumni?
      </SectionTitle>
      <SectionDescription>
        <HtmlContent html={props.school.influential_alumni_text} />
      </SectionDescription>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {school.alumni.map((person, index) => (
          <InfluentialCard key={index} person={person} />
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

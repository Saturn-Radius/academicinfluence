import fetch from "isomorphic-unfetch";
import { NextPage, NextPageContext } from "next";
import { apiHomePage, HomePageResponse, apiFeaturesPage, FeaturesPageResponse, FeaturesPageArticleSummary, apiSchoolPage, SchoolData } from "../../api";
import { ACTION_COLOR, SECONDARY_DARK } from "../../styles";
import Link from "next/link";
import { Article } from "../../components/FeaturePage";

type SchoolProps = {
    school: SchoolData
    
};

const School: NextPage<SchoolProps> = (props: SchoolProps) => (
  <div>
      <img src={props.school.logo_url || ""}/>
      <div>
          Name: {props.school.name}
      </div>
      <div>
          Description: {props.school.description}
      </div>
      <div>
          City: {props.school.city}, {props.school.state}
      </div>
      <div>
          Influence Score: {props.school.influence_score}
      </div>
      <div>
          Acceptance Rate: {props.school.acceptance_rate}
      </div>
      <div>
          Graduation Rate: {props.school.graduation_rate}
      </div>
  </div>
);

School.getInitialProps = async function(context: NextPageContext) {
  const data = await apiSchoolPage({
      slug: context.query.slug as string
  })

  return {
      school: data.school
  };
};

export default School;

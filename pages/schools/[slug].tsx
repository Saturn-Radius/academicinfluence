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
      Why?
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

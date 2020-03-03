import { NextPage } from "next";
import { apiPage } from "../api";
import HtmlContent from "../components/HtmlContent";
import { PageResponse } from "../schema";

type AboutProps = PageResponse;

const About: NextPage<AboutProps> = (props: AboutProps) => (
  <div>
    <HtmlContent html={props.content} />
  </div>
);

About.getInitialProps = async function({ req }) {
  const aboutPage = apiPage("about");

  return await aboutPage;
};

export default About;

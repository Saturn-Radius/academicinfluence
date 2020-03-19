import { NextPage, NextPageContext } from "next";
import { apiPage } from "../api";
import { PageResponse } from "../schema";
import "../styles/features.css";
import StandardPage from "../templates/StandardPage";

type AboutProps = PageResponse;

const About: NextPage<AboutProps> = (props: AboutProps) => {
  return (
    <StandardPage title={props.title} section="about" blurb={props.content}>
      <style jsx>
        {`
          .aboutPage {
            display: flex;
            margin-top: 65px;
          }
          .aboutContent {
            margin-left: 8%;
            padding-right: 30px;
            max-width: 900px;
          }
          .righSideBar {
            margin-right: 5%;
          }
          .locationContact {
            display: flex;
            flex-direction: row;
          }
          .contact {
            margin-left: 30%;
          }
          .subscribe {
            display: none;
          }
          @media (max-width: 700px) {
            .aboutPage {
              flex-direction: column;
            }
            .aboutContent {
              margin-left: 8%;
              display: flex;
              flex-direction: column;
            }
            .righSideBar {
              margin-right: 0px;
              margin-top: 30px;
            }
            .locationContact {
              display: flex;
              flex-direction: column;
            }
            .contact {
              margin-left: 0;
            }
            .topSidebar {
              display: none !important;
            }
            .subscribe {
              display: block;
            }
          }
        `}
      </style>
    </StandardPage>
  );
};

About.getInitialProps = async function(context: NextPageContext) {
  const aboutPage = apiPage(context.query.slug as string);

  return (await aboutPage) as PageResponse;
};

export default About;

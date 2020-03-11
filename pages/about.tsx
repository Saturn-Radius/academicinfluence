import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { apiPage } from "../api";
import BacktotopButton from "../components/BacktotopButton";
import HtmlContent from "../components/HtmlContent";
import { Sidebar } from "../components/school";
import { PageResponse } from "../schema";
import "../styles/features.css";

type AboutProps = PageResponse;

const About: NextPage<AboutProps> = (props: AboutProps) => {
  return (
    <div>
      <NextSeo title="About" />
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
      <div className="aboutPage">
        <div className="aboutContent">
          <HtmlContent html={props.content} />
        </div>
        <div className="righSideBar">
          <div className="sidebar">
            <Sidebar />
          </div>
        </div>
      </div>
      <BacktotopButton />
    </div>
  );
};

About.getInitialProps = async function({ req }) {
  const aboutPage = apiPage("about");

  return await aboutPage;
};

export default About;

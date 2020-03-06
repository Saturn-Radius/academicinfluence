import { NextPage } from "next";
import { apiPage } from "../api";
import BacktotopButton from "../components/BacktotopButton";
import HtmlContent from "../components/HtmlContent";
import { Sidebar } from "../components/school";
import Subscribe from "../components/Subscribe";
import { PageResponse } from "../schema";
import "../styles/features.css";

type AboutProps = PageResponse;

const About: NextPage<AboutProps> = (props: AboutProps) => {
  return (
    <div>
      <title>About | Academic Influence</title>
      <style jsx>
        {`
          .aboutPage {
            display: flex;
            margin-top: 65px;
          }
          .aboutContent {
            margin-left: 8%;
            padding-right: 30px;
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
          <div>
            <HtmlContent html={props.content} />
          </div>
          <div className="locationContact">
            <div>
              <h2 className="head">Location</h2>
              <p>Our company is headquartered in Pella, Iowa</p>
            </div>
            <div className="contact">
              <h2 className="head">Contact</h2>
              <p>
                682.302.4945
                <br /> connect@academicinfluence.com
              </p>
            </div>
          </div>
        </div>
        <div className="righSideBar">
          {/* <div className="topSidebar"><TopSidebar/></div> */}
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

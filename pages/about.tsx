import { NextPage } from "next";
import { apiPage } from "../api";
import HtmlContent from "../components/HtmlContent";
import { Html } from "next/document";
import { PageResponse } from "../schema";
import '../styles/features.css';
import { Sidebar } from "../components/school";
import { TopSidebar } from "../components/people";
import BacktotopButton from "../components/BacktotopButton";
import Subscribe from "../components/Subscribe";

type AboutProps = PageResponse;

const About: NextPage<AboutProps> = (props: AboutProps) => {
  return(
    <div>
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
          margin-right: 5%
        }
        .locationContact {
          display: flex;
          flex-direction: row;
        }
        .contact {
          margin-left: 30%;
        }
        .subscribe{
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
              <p>Our office is located at<br /> 123 Sesame Street<br /> Boulder, Co 81009</p>
            </div>
            <div className="contact">
              <h2 className="head">Contact</h2>
              <p>123.456.7890<br /> email@email.com</p>
            </div>
          </div>
        </div>
        <div className="subscribe">
          <div style={{ textAlign: 'center'}}>
            <h3 className="head">Subscribe</h3>
            <p style={{ fontSize: 12 }}>Receive updates and latest news direct from our team</p>
            <p style={{ fontSize: 12 }}>Simply enter your email below</p>
          </div>
          <div>
            <Subscribe />
          </div>
        </div>
        <div className="righSideBar">
          <div className="topSidebar"><TopSidebar/></div>
          <div className="sidebar"><Sidebar /></div>
        </div>
      </div>
      <BacktotopButton />
    </div>

  )
}

About.getInitialProps = async function({ req }) {
  const aboutPage = apiPage("about");

  return await aboutPage;
};

export default About;

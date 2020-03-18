import { jsx } from "@emotion/core";
import { DefaultSeo } from "next-seo";
import App from "next/app";
import { AppContextType } from "next/dist/next-server/lib/utils";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import CookieConsent from "react-cookie-consent";
import ReactGA from "react-ga";
import "typeface-montserrat/index.css";
import { apiBasicContext } from "../api";
import { BasicContextReactContext } from "../components/BasicContext";
import Logo from "../components/Logo";
import Sidebar from "../components/school/Sidebar";
import { SectionLink } from "../links";
import { BasicContextResponse } from "../schema";
import { PAGE_WIDTH_STYLE } from "../styles";
import "../styles/colors.css";

type HamburgerIconProps = {
  onClick?: () => void;
  closeIcon: boolean;
};

const HamburgerIcon = React.forwardRef(
  ({ onClick, ...props }: HamburgerIconProps, ref) => {
    return (
      <div onClick={onClick}>
        <div>
          {!props.closeIcon && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="15"
              fill="none"
              viewBox="0 0 20 15"
            >
              <path
                fill="#038C8C"
                fillRule="evenodd"
                d="M0 15h20v-1H0v1zM0 1h20V0H0v1zm0 7h20V7H0v1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div>
          {props.closeIcon && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 12 12"
            >
              <line
                x1="1"
                y1="11"
                x2="11"
                y2="1"
                stroke="#999999"
                strokeWidth="2"
              />
              <line
                x1="1"
                y1="1"
                x2="11"
                y2="11"
                stroke="#999999"
                strokeWidth="2"
              />
            </svg>
          )}
        </div>
      </div>
    );
  }
);

function SiteHeader(props: { currentSection?: string }) {
  const [isMobileMenu, SetisMobileMenu] = useState(false);

  const onClick = React.useCallback(() => {
    SetisMobileMenu(false);
  }, []);

  const setMobileMenu = () => {
    SetisMobileMenu(!isMobileMenu);
  };

  return (
    <>
      <style jsx>
        {`
      .mainMenu {
        display: flex;
        justify-content: space-around;
        margin-top: 22px;
      }
      .mainSearch {
        display: none;
      }
      .siteLogo {
        display: flex;
      }
      @media (max-width: 800px) {
        .mainMenu {
          display: none;
        }
        .mobileSearch {
          display: block;
          padding: 10px 10px;
        }
        .searchSVG {
          position: absolute;
          width: 20px;
          height: 20px;
          margin-top: 5px;
          margin-left: 5px;
        }
        .searchInput {
          height: 25px;
          padding-left: 28px;
          border: 0px;
          border-bottom: 1px solid #999999;
          background: none;
          width: 90%;
        }
        .siteLogo {
          padding: 10px;
          1px solid #999999;
        }
      }
    `}
      </style>
      <nav
        css={[
          PAGE_WIDTH_STYLE,
          {
            display: "flex",
            flexDirection: "column",
            borderBottom: "0.5px solid #666666",

            "@media (min-width: 992px)": {
              padding: "27px 80px"
            },

            "@media (max-width: 991px)": {
              padding: "20px 40px"
            },

            "@media (max-width: 767px)": {
              padding: "10px 20px"
            }
          }
        ]}
      >
        <div className="siteLogo">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>

          <div
            css={{
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: "20px",
              lineHeight: "51px",

              color: "#999999",
              borderLeft: "0.5px solid #000000",

              paddingLeft: "19px",
              marginLeft: "30px",
              alignSelf: "center",

              whiteSpace: "nowrap",

              display: "none",
              "@media(min-width: 800px)": {
                display: "block"
              }
            }}
          >
            Connecting Learners to Leaders
          </div>
          <div
            css={{
              flexGrow: 1
            }}
          />
          <div
            css={{
              alignSelf: "center",
              "@media(min-width: 800px)": {
                display: "none"
              }
            }}
          >
            <HamburgerIcon
              onClick={() => setMobileMenu()}
              closeIcon={isMobileMenu}
            />
          </div>
        </div>
        <div
          className={!isMobileMenu ? "mainMenu" : "mobileMenu"}
          onClick={onClick}
        >
          <SectionLink
            href="/schools"
            id="influential-schools"
            label="INFLUENTIAL SCHOOLS"
            currentSection={props.currentSection}
          />
          <SectionLink
            href="/people"
            id="influential-people"
            label="INFLUENTIAL PEOPLE"
            currentSection={props.currentSection}
          />
          <SectionLink
            href="/disciplines"
            id="by-discipline"
            label="BY DISCIPLINE"
            currentSection={props.currentSection}
          />
          <SectionLink
            href="/features"
            id="features"
            label="FEATURES"
            currentSection={props.currentSection}
          />
          <SectionLink
            href="/[slug]"
            as="/about"
            id="about"
            label="ABOUT"
            currentSection={props.currentSection}
          />
          {isMobileMenu && <Sidebar />}
        </div>
      </nav>
    </>
  );
}

function Footer() {
  return (
    <footer
      css={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#333333",
        ".upper": {
          display: "flex",
          paddingLeft: "92px",
          paddingTop: "51px"
        },
        ".logo": {
          paddingRight: "118px"
        },
        ".sections": {
          display: "flex",
          flexWrap: "wrap"
        },
        ".section": {
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          paddingTop: "22px",
          paddingRight: "44px"
        },
        "@media (max-width: 1250px)": {
          ".connect": {
            order: 10
          },
          ".connect .label": {
            textAlign: "center",
            width: "100%",
            minWidth: "75vw"
          },
          ".connect .icons": {
            alignSelf: "center"
          },
          ".upper": {
            flexDirection: "column"
          },
          ".logo": {
            alignSelf: "center",
            paddingRight: "0px"
          },
          ".copyright": {
            marginTop: "10px"
          }
        },
        ".section a": {
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "20px",
          alignItems: "center",
          textDecoration: "none",

          color: "#ffffff",

          paddingTop: "17px"
        },
        ".label": {
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "29px",
          alignItems: "flex-end",
          fontVariant: "small-caps",

          color: "#ffffff",

          borderBottom: "1px solid #ffffff",

          marginBottom: "5px",

          minWidth: "220px"
        },
        ".icons": {
          display: "flex"
        },
        ".icons a": {
          marginRight: "29.9px"
        },
        ".copyright": {
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "16px",
          lineHeight: "20px",
          alignItems: "center",
          textAlign: "center",
          alignSelf: "center",

          color: "#ffffff",
          width: "100%",

          marginBottom: "17px",
          marginTop: "175px"
        }
      }}
    >
      <div className="upper">
        <div className="logo">
          <Logo />
        </div>
        <div className="sections">
          <div className="section">
            <div className="label">EXPLORE</div>
            <a href="/schools">INFLUENTIAL SCHOOLS</a>
            <a href="/people">INFLUENTIAL PEOPLE</a>
            <a href="/disciplines">BY DISCIPLINE</a>
            <a href="/features">FEATURES</a>
            <a href="/college-ranking">FIND YOUR SCHOOL</a>
            <a href="/about">ABOUT</a>
          </div>
          <div className="section connect">
            <div className="label">CONNECT WITH US</div>
            <div className="icons">
              <a href="https://www.facebook.com/AcademicInfluence">
                <svg
                  width="10"
                  height="20"
                  viewBox="0 0 10 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.82128 20V11H9.55369L10 7H6.82128V5.052C6.82128 4.022 6.84759 3 8.28688 3H9.74469V0.14C9.74469 0.097 8.4925 0 7.22569 0C4.58 0 2.92341 1.657 2.92341 4.7V7H0V11H2.92341V20H6.82128Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="https://www.instagram.com/AcademicInfluence/">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.86965 0.122727C4.24177 0.196177 2.8308 0.5942 1.69149 1.72871C0.548187 2.86918 0.155147 4.28558 0.0815141 5.89653C0.0357424 6.90201 -0.231923 14.4982 0.544207 16.4903C1.0676 17.8342 2.09846 18.8675 3.45469 19.3926C4.08754 19.6387 4.80994 19.8055 5.86965 19.8541C14.7305 20.2551 18.0151 20.0367 19.4002 16.4903C19.646 15.859 19.8151 15.1374 19.8619 14.0803C20.2669 5.19677 19.7962 3.27117 18.2519 1.72871C17.027 0.506853 15.5862 -0.324924 5.86965 0.122727ZM5.95124 18.0675C4.98108 18.0238 4.45471 17.862 4.10346 17.726C3.21986 17.3826 2.55617 16.7215 2.21488 15.8431C1.62382 14.3294 1.81985 7.14023 1.87258 5.97693C1.92432 4.83745 2.15517 3.79624 2.95916 2.99226C3.9542 1.99968 5.23979 1.51332 13.9931 1.90837C15.1354 1.95998 16.1792 2.19026 16.9852 2.99226C17.9803 3.98483 18.4738 5.28014 18.0718 13.9999C18.028 14.9677 17.8658 15.4927 17.7295 15.8431C16.829 18.1509 14.7573 18.4715 5.95124 18.0675ZM14.0897 4.68956C14.0897 5.34665 14.624 5.88065 15.2837 5.88065C15.9434 5.88065 16.4788 5.34665 16.4788 4.68956C16.4788 4.03248 15.9434 3.49847 15.2837 3.49847C14.624 3.49847 14.0897 4.03248 14.0897 4.68956ZM4.86267 9.98792C4.86267 12.8029 7.15027 15.0848 9.97219 15.0848C12.7941 15.0848 15.0817 12.8029 15.0817 9.98792C15.0817 7.17298 12.7941 4.89205 9.97219 4.89205C7.15027 4.89205 4.86267 7.17298 4.86267 9.98792ZM6.65573 9.98792C6.65573 8.16159 8.14033 6.67967 9.97219 6.67967C11.8041 6.67967 13.2887 8.16159 13.2887 9.98792C13.2887 11.8153 11.8041 13.2972 9.97219 13.2972C8.14033 13.2972 6.65573 11.8153 6.65573 9.98792Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a href="https://twitter.com/AcademicInfluen">
                <svg
                  width="20"
                  height="16"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.29 16C13.837 16 17.965 9.84365 17.965 4.50546C17.965 4.33021 17.965 4.15595 17.953 3.98267C18.756 3.41163 19.449 2.70276 20 1.8915C19.252 2.21837 18.457 2.433 17.644 2.52751C18.5 2.02244 19.141 1.2289 19.448 0.292602C18.642 0.763214 17.761 1.095 16.842 1.27321C15.288 -0.353258 12.689 -0.432021 11.036 1.09796C9.971 2.08447 9.518 3.55538 9.849 4.95835C6.55 4.79492 3.476 3.261 1.392 0.737616C0.303 2.58363 0.86 4.94457 2.663 6.12996C2.01 6.11125 1.371 5.93797 0.8 5.62489V5.67608C0.801 7.5989 2.178 9.2549 4.092 9.63591C3.488 9.79836 2.854 9.82199 2.24 9.70483C2.777 11.351 4.318 12.4783 6.073 12.5108C4.62 13.6351 2.825 14.2455 0.977 14.2436C0.651 14.2426 0.325 14.2239 0 14.1855C1.877 15.3709 4.06 16 6.29 15.997"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="section">
            <div className="label">OUR NETWORK</div>
            <a href="https://influencenetworks.com">INFLUENCE NETWORKS</a>
            <a href="https://intelligenteducation.com">INTELLIGENT EDUCATION</a>
            <a href="https://influencepublishers.com">INFLUENCE PUBLISHERS</a>
          </div>
        </div>
      </div>
      <div className="copyright">
        Copyright © 2019 Academic Influence. All Rights Reserved
      </div>
    </footer>
  );
}

function AddSeo() {
  const router = useRouter();
  return (
    <DefaultSeo
      canonical={"https://academicinfluence.com" + router.pathname}
      titleTemplate="%s | Academic Influence"
    />
  );
}

function AddAnalytics() {
  const [activated, setActivated] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    if (!activated) {
      ReactGA.initialize("UA-109343547-1");
      setActivated(false);
    }
    ReactGA.pageview(router.pathname);
  }, [router.pathname, activated, setActivated]);

  return <></>;
}

async function fetchContext() {
  if (typeof window == "undefined") {
    return await apiBasicContext({});
  } else {
    return (window as any).__NEXT_DATA__.props.basicContext;
  }
}

class AIApp extends App<{ basicContext: BasicContextResponse }> {
  render() {
    const { Component, pageProps } = this.props;

    const currentSection: string | undefined = (Component as any)
      .currentSection;
    return (
      <>
        <CookieConsent acceptOnScroll>
          This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>
        <AddSeo />
        <AddAnalytics />
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#F9FBFA",
            fontFamily: "Montserrat"
          }}
        >
          <div className="body">
            <SiteHeader currentSection={currentSection} />
            <BasicContextReactContext.Provider value={this.props.basicContext}>
              <Component {...pageProps} />
            </BasicContextReactContext.Provider>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  static async getInitialProps(context: AppContextType<Router>) {
    const basicContext = fetchContext();
    const initialProps = await App.getInitialProps(context);

    return {
      ...initialProps,
      basicContext: await basicContext
    };
  }
}

export default AIApp;

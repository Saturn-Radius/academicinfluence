import { jsx } from "@emotion/core";
import Link from "next/link";
import * as React from "react";
import { useState } from "react";
import "typeface-montserrat/index.css";
import Logo from "../components/Logo";
import Sidebar from "../components/school/Sidebar";
import { ACCENT, BG_PAGE, PAGE_WIDTH_STYLE } from "../styles";
import "../styles/colors.css";
import "../styles/features.css";

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

export type SectionId =
  | "influential-schools"
  | "influential-people"
  | "by-discipline"
  | "features"
  | "about"
  | "none";

function SectionLink(props: {
  id: SectionId;
  href: string;
  as?: string;
  currentSection: SectionId;
  label: string;
}) {
  const active = props.id === props.currentSection;
  return (
    <Link href={props.href} as={props.as}>
      <a
        css={{
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "18px",
          lineHeight: "20px",
          alignItems: "center",
          textAlign: "left",
          textDecoration: "none",
          display: "block",
          color: active ? "white" : "inherit",
          padding: "10px",
          backgroundColor: active ? ACCENT : BG_PAGE,
          cursor: "pointer"
        }}
      >
        {props.label}
      </a>
    </Link>
  );
}

function SiteHeader(props: { currentSection: SectionId }) {
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

export default function BasicPage(props: {
  section: SectionId;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader currentSection={props.section} />
      {props.children}
    </>
  );
}

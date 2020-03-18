import Link from "next/link";
import React from "react";
import { MAIN } from "../../styles";

const Sidebar = () => {
  return (
    <>
      <style jsx>
        {`
          .sidebar {
            width: 311px;
            background: white;
            padding: 12px;
          }
        `}
      </style>
      <div className="sidebar">
        <Link href="/college-ranking">
          <SidebarButton
            img="/images/ranking-icon.png"
            text="College Rankings"
          />
        </Link>
        {/* <SidebarButton img="/images/match-icon.png" text="College Match" /> */}
        {/* <SidebarButton img="/images/compare-icon.png" text="College Compare" /> */}
      </div>
    </>
  );
};

const SidebarButton = React.forwardRef(
  (
    props: {
      img: string;
      text: string;
      onClick?: () => void;
    },
    ref: any
  ) => {
    return (
      <>
        <style jsx>
          {`
            .sidebar {
              display: flex;
              align-items: center;
              box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
              padding: 12px 17px;
              margin-bottom: 20px;
              cursor: pointer;
            }
          `}
        </style>
        <div className="sidebar" onClick={props.onClick} ref={ref}>
          <img style={{ width: 60, height: 60 }} src={props.img} />
          <span style={styles.sidebarText}>{props.text}</span>
        </div>
      </>
    );
  }
);

const styles = {
  sidebarText: {
    color: MAIN,
    fontSize: 20,
    fontWeight: 500,
    paddingLeft: 8
  }
};

export default Sidebar;

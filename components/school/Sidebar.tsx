import Link from "next/link";
import { MAIN } from "../../styles";

const Sidebar = () => {
  return (
    <div
      css={{
        width: 311,
        background: "white",
        padding: 12
      }}
    >
      <Link href="/college-ranking">
        <SidebarButton img="/images/ranking-icon.png" text="College Rankings" />
      </Link>
      {/* <SidebarButton img="/images/match-icon.png" text="College Match" /> */}
      {/* <SidebarButton img="/images/compare-icon.png" text="College Compare" /> */}
    </div>
  );
};

const SidebarButton = (props: {
  img: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        padding: "12px 17px",
        marginBottom: 20
      }}
      onClick={props.onClick}
    >
      <img style={{ width: 60, height: 60 }} src={props.img} />
      <span style={styles.sidebarText}>{props.text}</span>
    </div>
  );
};

const styles = {
  sidebarText: {
    color: MAIN,
    fontSize: 20,
    fontWeight: 500,
    paddingLeft: 8
  }
};

export default Sidebar;

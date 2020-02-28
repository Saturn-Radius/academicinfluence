import { PRIMARY_DARK } from "../../styles";

const Sidebar = (props: any) => {
    return (
        <div style={{ ...{ maxWidth: 311, width: "100%", height: "38%", marginLeft: 30, background: 'white', padding: 12 }, ...props.style }}>
            <SidebarButton img="/images/ranking-icon.png" text="College Rankings" />
            <SidebarButton img="/images/match-icon.png" text="College Match" />
            <SidebarButton img="/images/compare-icon.png" text="College Compare" />
        </div>
    );
};

const SidebarButton = (props: any) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)", padding: "12px 17px", marginBottom: 20 }}>
            <img style={{ width: 60, height: 60 }} src={props.img} />
            <span style={styles.sidebarText}>{props.text}</span>
        </div>
    )
}

const styles = {
    sidebarText: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 500,
        paddingLeft: 8
    },
}

export default Sidebar
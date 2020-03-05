import { GRAY_MID } from "../../styles";

const TopSidebar = (props: any) => {
    return(
      <div style={ styles.TopSidebarStyle }>
        <img style={{ width:20, height:20 }} src="/images/my-locker.png" />
        <span style= {{ fontSize: 14, color: GRAY_MID }}>My Locker</span>
        <img style={{ width:20, height:10, marginLeft: 173 }} src="/images/arrow-down.png" />
      </div>
    )
}

const styles = {
    TopSidebarStyle: {
        display: 'flex',
        alignItems: 'center',
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
        padding: "12px 17px",
        marginLeft: 30,
        marginBottom: 13,
        width: 300,
        height: 38,
        background: 'white'
    }
}

export default TopSidebar
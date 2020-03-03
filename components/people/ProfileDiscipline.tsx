import { GRAY_MID, PRIMARY_DARK } from "../../styles"


const ProfileDiscipline = (props: any) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 170, fontFamily: 'SF UI Display Light' }}>
            <div style={styles.sidebarText}>Disciplines</div>
            <div style={styles.bodyText}>
                {Object.entries(props.disciplines).map(([discipline, data]) => (<li key={discipline}>
                  {discipline}
                </li>))}
            </div>
        </div>
    )
}

const styles = {
    sidebarText: {
        color: GRAY_MID,
        lineHeight: 1,
        fontSize: 16,
        fontWeight: 500
    },
    bodyText: {
        color: PRIMARY_DARK,
        fontSize:24,
        listStyleType: "none",
        fontWeight: 600
    }
}

export default ProfileDiscipline
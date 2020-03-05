import { GRAY_MID, PRIMARY_DARK } from "../../styles"


const ProfileDiscipline = (props: any) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 300 }}>
            <div style={styles.sidebarText}>Top Disciplines Influenced:</div>
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
        listStyleType: "disc",
        fontWeight: 600
    }
}

export default ProfileDiscipline
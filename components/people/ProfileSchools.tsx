import { GRAY_MID, PRIMARY_DARK } from "../../styles"

interface SchoolsData {
    schools: {name: string, slug: string }[];
}

const ProfileSchools = (props: SchoolsData) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 450 }}>
            <div style={styles.sidebarText}>Schools Associated With:</div>
            <div style={styles.bodyText}>
                {props.schools.map((school, i) =><li key={i}>{school.name}</li>)}
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

export default ProfileSchools
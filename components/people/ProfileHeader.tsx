import { GRAY_LIGHT, GRAY_MID, PRIMARY_DARK } from "../../styles"
import CheckBox from "../Checkbox"

const AddToLocker = (props: any) => (
    <div style={{ ...{ display: 'flex', marginLeft: 'auto', paddingBottom: 20 }, ...props.style }}>
        <span style={{ color: '#666666', marginRight: 10, fontSize: 12, paddingTop: 2 }}>Add to My Locker</span>
        <CheckBox />
    </div>
)

const ProfileHeader = (props: any) =>{
    return (
        <div>
            <div style={{ display: "flex" }}>
                <ProfileInfo name={ props.name } image_url={props.image_url} birth_year={props.birth_year} death_year={props.death_year} short_description={props.short_description} />
                <AddToLocker />
            </div>
        </div>
    )
}

const ProfileInfo = (props: any) => {
    return (
        <div style={ {...{display: 'flex' }, ...props.style}}>
            <img style={ styles.headerImg} src={props.image_url} />
            <div style={{ marginLeft: 20 }}>
                <h3 style={styles.name}>{props.name}</h3>
                <div style={styles.lifePeriod}>
                    <div style= {{ marginBottom: 10 }}> ( {props.birth_year}-{props.death_year})</div>
                    <div style={styles.profileTitle}>{props.short_description}</div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    name: {
        color: PRIMARY_DARK,
        fontSize: 28,
        margin: 0
    },
    lifePeriod: {
        color: GRAY_MID,
        fontSize: 20,
        fontFamily: 'SF UI Display Ultralight',
    },
    headerImg: {
        //width:80,
        width: 104,
        height: 104,
    },
    profileTitle: {
        fontSize: 20,
        fontFamily: 'SF UI Display Semibold',
        color: GRAY_LIGHT,
        fontWeight: 600
    }

}

export default ProfileHeader
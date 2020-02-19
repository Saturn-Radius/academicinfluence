import CircularProgress from "../CircularProgress"
import { PRIMARY_DARK } from "../../styles"
import CheckBox from "../Checkbox"
import { Desktop, TabletOrMobile } from '../../utils/responsive'



const AddToLocker = (props: any) => (
    <div style={{ ...{ display: 'flex', marginLeft: 'auto', paddingBottom: 20 }, ...props.style }}>
        <span style={{ color: '#666666', marginRight: 10 }}>Add to My Locker</span>
        <CheckBox />
    </div>
)

const CollegeHeader = (props: any) => {

    return (
        <div>

            <Desktop>
                <div style={{ display: 'flex'}}>

                    <CollegeInfo name={props.name} logo_url={props.logo_url} city={props.city} state={props.state} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <AddToLocker />
                        <RankGauges size={95} acceptance_rate={props.acceptance_rate} graduation_rate={props.graduation_rate} />
                    </div>
                </div>
            </Desktop>


            <TabletOrMobile>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <div>
                        <CollegeInfo style={{paddingBottom:10}} name={props.name} logo_url={props.logo_url} city={props.city} state={props.state} />
                        <RankGauges fontSize={12} size={70} acceptance_rate={props.acceptance_rate} graduation_rate={props.graduation_rate} />
                    </div>
                </div>
                        <AddToLocker style={{margin:'auto',width:200}}/>
            </TabletOrMobile>


        </div>

    )
}
const CollegeInfo = (props: any) => {
    return (

        <div style={ {...{display: 'flex' }, ...props.style}}>
            <img style={styles.headerImg} src={props.logo_url} />
            <div style={{ paddingTop: 10 }}>
                <h3 style={styles.name}>{props.name}</h3>
                <div style={styles.locationText}>
                    <div style={{ marginBottom: 10 }}>{props.city}, {props.state}</div>
                    <div>#1 in Overall Influence Ranking</div>
                    <div>#3 in Overall Desirability Index</div>
                </div>
            </div>
        </div>
    )

}


const RankGauges = (props: any) => {
    return (
        <div style={{ display: 'flex' }}>
            <CircularProgress
                style={{ paddingRight: 20 }}
                percentage={95}
                size={props.size}
                fontSize={props.fontSize}
                text={<span>Overall<br /> IR</span>}
            />

            <CircularProgress
                style={{ paddingRight: 20 }}
                percentage={95}
                size={props.size}
                fontSize={props.fontSize}
                text="Discipline IR"
            />

            <CircularProgress
                style={{ paddingRight: 20 }}
                percentage={props.acceptance_rate * 100}
                size={props.size}
                fontSize={props.fontSize}
                text="Acceptance Rate"
            />

            <CircularProgress
                percentage={props.graduation_rate * 100}
                size={props.size}
                fontSize={props.fontSize}
                text="Graduation Rate"
            />
        </div>

    )
}



const styles = {
    name: {
        color: PRIMARY_DARK,
        fontSize: 28,
        margin: 0
    },
    locationText: {
        color: 'black',
        fontSize: 16
    },
    headerImg: {
        //width:80,
        maxWidth: 121,
        maxHeight: 121,
    }

}


export default CollegeHeader
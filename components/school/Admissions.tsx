import { GREEN_MID, PRIMARY_DARK } from "../../styles"
import Button from "../Button"
import CircularProgress from "../CircularProgress"
import ContentCard from "../ContentCard"


const Admissions = (props: any) => {

    return (
        //<div style={{flex:"1 1 100%", marginLeft:40}}>
        <div style={{}}>
        <h4 style={styles.subheaderText}>Admissions</h4>
        <ContentCard style={{padding:20}}>

        <div style={{display:'flex', justifyContent:'space-between', padding:20}}>
                <CircularProgress
                    percentage={props.school.acceptance_rate * 100}
                    size={95}
                    text="Acceptance Rate"
                />

                <CircularProgress
                    percentage={props.school.graduation_rate * 100}
                    size={95}
                    text="Graduation Rate"
                />

                <CircularProgress
                    percentage={props.school.test_competitiveness * 100}
                    size={95}
                    text="Test
                    Competitivness"
                />
            </div>

            <div style={{display:'flex', justifyContent:'space-evenly'}}>
            <Button style={{width:190, marginRight:24}} color={GREEN_MID} text={`SAT - ${props.school.median_sat}`} />
            <Button style={{width:190}} color={GREEN_MID} text={`ACT - ${props.school.median_act}` }/>
            </div>


        </ContentCard>
        </div>
    )
}

const styles = {
    subheaderText: {
        color: PRIMARY_DARK,
        fontSize: 22
    },

}

export default Admissions
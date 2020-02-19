import { SchoolData } from '../../schema'
import { useState } from 'react'
import CircularProgress from '../CircularProgress'
import ContentCard from '../ContentCard'
import CheckBox from '../Checkbox'

type SchoolProps = {
    school: SchoolData
};



const DisciplineContainer = (props: SchoolProps) => {
    const generateCards = () => (
        Object.entries(props.school.disciplines).filter(([discipline, data]) => discipline != '').map(([discipline, data]) => {
            return (
                <DisciplineCard schoolName={props.school.name} title={discipline} score={data.influence} usa_rank={data.usa_rank} world_rank={data.world_rank} />
            )
        })
    )

    const allCards = generateCards()
    const [cards, setCards] = useState(allCards.slice(0, 9))

    return (
        <>
            <div style={{ display: 'flex', flexWrap: 'wrap' ,justifyContent:'center'}}>
                {cards}
            </div>
            {cards.length < allCards.length &&
                <div onClick={() => setCards(allCards)} style={{ fontWeight: 'bold', textAlign: 'center' }}>MORE <img src="/images/arrow-down.png" /></div>
            }

        </>
    )
}

//TODO: title = uni name: subject (on h4)
const DisciplineCard = (props: any) => {
    let titleTag = `${props.schoolName}:  ${props.title}`

    return (
        <ContentCard style={{ width: 280, height: 150, padding: 8, marginRight: 20, marginBottom: 20, display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ flex: "1 1 100%", display: 'flex', justifyContent: 'space-between' }}>
                <h4 title={titleTag} style={ styles.cardHeader }>{props.title}</h4>
                <CheckBox />
            </div>
            <div>
                <CircularProgress
                    size={95}
                    fontSize={10}
                    percentage={props.score * 100}
                    text="Discipline IR"
                />
            </div>

            <div style={{ marginLeft: 20 }}>
                <p> #{props.usa_rank} in USA</p>
                <p> #{props.world_rank} in Worldwide</p>
            </div>
        </ContentCard>
    )
}

const styles = {
    cardHeader: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        marginTop: 0,
        marginLeft:8
    } as React.CSSProperties

}


export default DisciplineContainer

import { NextPage, NextPageContext } from "next";
import { apiPersonPage } from "../../api";
import { SchoolLink } from "../../links";
import { PersonData } from "../../schema";
import { useMediaQuery } from 'react-responsive';
import { ProfileHeader, InfluentialWorks, OtherResources, InfluenceScore, ProfileSchools, ProfileDescription } from "../../components/people";
import ContentCard from "../../components/ContentCard";
import { Sidebar } from "../../components/school";
import { GRAY_MID, PRIMARY_DARK } from "../../styles";

type PersonProps = {
  person: PersonData

};

const Person: NextPage<PersonProps> = (props: PersonProps) => {

  let { image_url, image_source_url, name, birth_year, death_year, description, overall, disciplines, schools, links, works} = props.person

  const isBigScreen = useMediaQuery({query: '(min-width: 1069px)'})

  return (
    <div>
    <div style={{ display: 'flex', marginTop:65 }}>
      <div style={{ maxWidth: 950, minWidth:375, marginLeft: "6%"}}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <ProfileHeader image_url={image_url} name={name} birth_year={birth_year}
              death_year={death_year}
              disciplines={disciplines} schools={schools}
          />

          <div style={{ display: 'flex', marginLeft: 124, paddingTop: 8 }}>
            <InfluenceScore overall={overall} />
            <ProfileSchools schools={schools} />

            <div style={{ display: 'flex', flexDirection: 'column', width: 170, fontFamily: 'SF UI Display Light' }}>
              <div style={styles.disciplinesidebarText}>Disciplines</div>
              <div style={styles.disciplinebodyText}>
                Computer Science
                {/* {Object.entries(props.person.disciplines).map(([discipline, data]) => (<li key={discipline}>
                  {discipline} {data.influence} #{data.world_rank} #{data.usa_rank} (USA)
                </li>))} */}
              </div>
            </div>
          </div>

          <ProfileDescription style={ styles.descriptionText }>{description}</ProfileDescription>

          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <InfluentialWorks works={works} />
            <OtherResources links={links} />
          </div>

        </div>
        {!isBigScreen &&
          <Sidebar style={{marginLeft:0,marginTop:30}} />
        }
      </div>
      <div style={{marginLeft:0}}>
      <TopSidebar />
      {isBigScreen &&
        <Sidebar/ >
      }
      </div>
    </div>
    <BackToTop />
    </div>
  )
};

const styles = {
  disciplinesidebarText: {
      color: GRAY_MID,
      lineHeight: 1,
      fontSize: 16,
      fontWeight: 500
  },
  disciplinebodyText: {
      color: PRIMARY_DARK,
      fontSize:24,
      listStyleType: "none",
      fontWeight: 600
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: 'SF UI Display Light',
    marginTop:33,
    marginBottom: 40,
    lineHeight: 1.78
  },
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

const TopSidebar = (props: any) => {
  return(
    <div style={styles.TopSidebarStyle}>
      <img style={{ width:20, height:20 }} src="/images/my-locker.png" />
      <span style= {{ fontSize: 14, color: GRAY_MID }}>My Locker</span>
      <img style={{ width:20, height:10, marginLeft: 173 }} src="/images/arrow-down.png" />
    </div>
  )
}

const BackToTop = (props: any) => {
  return (
      <div style={{ padding: "20px 0px", textAlign: 'center' }} onClick={() => window.scrollTo(0, 0)}>
          BACK TO TOP <img style={{ width: 20 }} src="/images/arrow-up.png" /></div>
  )
}

Person.getInitialProps = async function (context: NextPageContext) {
  const data = await apiPersonPage({
    slug: context.query.slug as string
  })

  return {
    person: data.person
  };
};

export default Person;
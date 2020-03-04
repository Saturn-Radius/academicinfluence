import { NextPage, NextPageContext } from "next";
import { useMediaQuery } from 'react-responsive';
import { apiPersonPage } from "../../api";
import { InfluenceScore, InfluentialWorks, OtherResources, ProfileDescription, ProfileDiscipline, ProfileHeader, ProfileSchools } from "../../components/people";
import { Sidebar } from "../../components/school";
import { PersonData } from "../../schema";
import { GRAY_MID } from "../../styles";

type PersonProps = {
  person: PersonData

};

const Person: NextPage<PersonProps> = (props: PersonProps) => {

  let { image_url, image_source_url, name, birth_year, death_year, short_description, description, overall, disciplines, schools, links, works} = props.person

  const isBigScreen = useMediaQuery({query: '(min-width: 1069px)'})

  return (
    <div>
      <div style={{ display: 'flex', marginTop:65 }}>
        <style jsx>
          {`
            .profileSidebar {
              display: flex;
              flex-direction: row;
              margin-left: 6%;
            }
            .profileDetail {
              display: flex;
              margin-left: 124px;
              padding-top: 8px;
            }
            .sideBar {
              margin-left: 0px;
              margin-right: 6%;
            }
            @media (max-width: 1069px) {
              .profileSidebar {
                display: flex;
                flex-direction: column;
                margin-left: 5%;
                margin-right: 4%;
              }
              .profileDetail {
                display: flex;
                margin-left: 0px;
                padding-top: 12px;
              }
              .sideBar {
                margin-left: 0px;
                margin-top: 30px;
              }
            }
          `}
        </style>
        <div className="profileSidebar">
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            <ProfileHeader image_url={image_url} name={name} birth_year={birth_year}
                death_year={death_year} short_description={short_description}
                disciplines={disciplines} schools={schools}
            />

            <div className="profileDetail">
              <InfluenceScore overall={overall} />
              <ProfileSchools schools={schools} />
              <ProfileDiscipline disciplines={disciplines} />
            </div>

            <ProfileDescription style={ styles.DescriptionTextStyle }>{description}</ProfileDescription>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <InfluentialWorks style={ styles.InfluenceWorksStyle } works={works} />
              <OtherResources links={links} />
            </div>

          </div>

          <div className="sideBar">
            <TopSidebar />
            <Sidebar/ >
          </div>

        </div>
      </div>
      <BackToTop />
    </div>
  )
};

const styles = {
  DescriptionTextStyle: {
    fontSize: 18,
    marginTop:33,
    marginBottom: 40,
    lineHeight: 1.78
  },
  InfluenceWorksStyle:{
    display: 'inline-block',
    maxWidth: "100vw",
    minWidth: 320,
    marginRight: 40
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
    <div style={ styles.TopSidebarStyle }>
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
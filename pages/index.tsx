import { NextPage } from "next";
import { apiDisciplines, apiFeaturesPage, apiHomePage, apiInfluentialPeoplePage } from "../api";
import BacktotopButton from "../components/BacktotopButton";
import { Article } from "../components/FeaturePage";
import { CollegeList } from "../components/home";
import { ArticleLink } from "../links";
import { ArticlePartialData, DisciplinesResponse, FeaturesPageResponse, HomePageResponse, PersonPartialData } from "../schema";
import { SECONDARY_DARK } from "../styles";

type IndexProps = {
  homePage: HomePageResponse;
  features: FeaturesPageResponse;
  disciplines: DisciplinesResponse;
  people: PersonPartialData[];
};

type SectionProps = {
  label: string;
  children: React.ReactNode;
};
function Section(props: SectionProps) {
  return (
    <section>
      <h1
        css={{
          color: SECONDARY_DARK,
          fontSize: "15px",
          fontWeight: "bold",
          textAlign: "center",
          marginTop: "32px",
          marginBottom: "23px"
        }}
      >
        {props.label}
      </h1>
      {props.children}
    </section>
  );
}

function FeatureGrid(props: { articles: ArticlePartialData[] }) {
  return (
    <div
      css={{
        display: "grid",
        alignItems: "top",

        ">div:nth-of-type(1)": {
          gridRow: 1,
          gridColumnStart: 1,
          gridColumnEnd: 3,
          ".article": {
            marginBottom: "20px",
            borderBottomStyle: "solid",
            borderBottomColor: "black",
            borderBottomWidth: "0.5px"
          }
        },
        ">div:nth-of-type(2)": {
          gridRow: 2,
          gridColumn: 1
        },
        ">div:nth-of-type(3)": {
          gridRow: 2,
          gridColumn: 2
        }
      }}
    >
      {props.articles.map((article, index) => (
        <Article article={article} key={index} />
      ))}
    </div>
  );
}

const Index: NextPage<IndexProps> = (props: IndexProps) => {
  console.log("11111", props);
  return (
    <div>
      <style jsx>
        {`
          .maincontent {
            display: flex;
            flex-direction: column;
          }
          .logo {
            background-image: url(${props.homePage.currentFeature.bannerUrl});
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 394px;
          }
          .logoContent {
            margin-left: 13%;
            margin-top: 175px;
            max-width: 400px;
          }
          .logoText {
            color: white;
          }
          .exploreBtn {
            border-radius: 30px;
            box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
            background-color: #eb5857;
            height: 36px;
            line-height: 36px;
            font-size: 20px;
            color: white;
            border-width: 0px;
            width: 189px;
          }
          .sidebarSection {
            text-align: center;
            padding-bottom: 55px;
            border-bottom: 0.5px solid black;
          }
          .collegeTitle {
            color: #1e988a;
            margin-top: 27px;
            margin-bottom: 48px;
          }
          .feature {
            text-align: center;
          }
          .featureTitle {
            color: #1e988a;
            margin-top: 25px;
            margin-bottom: 32px;
          }
          @media (max-width: 700px) {
            .logoContent {
              margin-left: 13%;
              margin-top: 210px;
              max-width: 200px;
            }
            .logoText {
              font-size: 20px;
            }
            .collegeTitle {
              font-size: 20px;
            }
          }
        `}
      </style>
      <div className="maincontent">
        <div className="logo">
          <div className="logoContent">
            <h1 className="logoText">{props.homePage.currentFeature.name}</h1>
            <ArticleLink article={props.homePage.currentFeature}>
              <button className="exploreBtn">Explore</button>
            </ArticleLink>
          </div>
        </div>
        <div className="sidebarSection">
          <h1 className="collegeTitle">FIND YOUR SCHOOL</h1>
          <CollegeList />
        </div>
        <div className="feature">
          <h1 className="featureTitle">FEATURE</h1>
        </div>
      </div>
      <BacktotopButton />
    </div>
  );
};

Index.getInitialProps = async function({ req }) {
  const homePageQuery = apiHomePage({});
  const featuresQuery = apiFeaturesPage({
    category: null,
    article: null
  });
  const disciplinesQuery = apiDisciplines({});
  const peopleQuery = apiInfluentialPeoplePage({
    country: null,
    discipline: null,
    gender: null,
    years: {
      min: 1900,
      max: 2020
    }
  });

  return {
    homePage: await homePageQuery,
    features: await featuresQuery,
    disciplines: await disciplinesQuery,
    people: (await peopleQuery).people
  };
};

export default Index;

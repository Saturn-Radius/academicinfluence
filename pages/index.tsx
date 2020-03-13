import { NextPage } from "next";
import { apiFeaturesPage, apiHomePage, apiInfluentialPeoplePage } from "../api";
import BacktotopButton from "../components/BacktotopButton";
import { useBasicContext } from "../components/BasicContext";
import {
  CollegeList,
  FeatureArticles,
  FeatureGrid,
  Influence,
  Influencers
} from "../components/home";
import { ArticleLink } from "../links";
import {
  FeaturesPageResponse,
  HomePageResponse,
  PersonPartialData
} from "../schema";

type IndexProps = {
  homePage: HomePageResponse;
  features: FeaturesPageResponse;
  people: PersonPartialData[];
};

const Index: NextPage<IndexProps> = (props: IndexProps) => {
  const basicContext = useBasicContext();
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
            border-bottom: 0.5px solid #666666;
          }
          .collegeTitle {
            color: #1e988a;
            margin-top: 27px;
            margin-bottom: 48px;
          }
          .feature {
            text-align: center;
            padding-bottom: 55px;
          }
          .influence {
            text-align: center;
            padding-bottom: 55px;
            background-color: white;
          }
          .influenceTitle {
            color: #1e988a;
            margin-top: 27px;
            margin-bottom: 48px;
          }
          .influencers {
            text-align: center;
            padding-bttom: 55px;
          }
          .influencerTitle {
            color: #1e988a;
            margin-top: 27px;
            margin-bottom: 48px;
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
            .influenceTitle {
              font-size: 20px;
            }
            .influencerTitle {
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
          <FeatureArticles label="FEATURE">
            <FeatureGrid articles={props.features.articles.slice(0, 4)} />
          </FeatureArticles>
        </div>
        <div className="influence">
          <h1 className="influenceTitle">Influence by discipline</h1>
          <Influence disciplines={basicContext.disciplines} />
        </div>
        <div className="influencers">
          <h1 className="influencerTitle">NOTABLE INFLUENCERS</h1>
          <Influencers people={props.people} />
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
    people: (await peopleQuery).people
  };
};

export default Index;

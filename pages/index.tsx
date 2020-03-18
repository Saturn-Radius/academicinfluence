import { NextPage } from "next";
import Head from "next/head";
import { apiFeaturesPage, apiHomePage, apiInfluentialPeoplePage } from "../api";
import BacktotopButton from "../components/BacktotopButton";
import { useBasicContext } from "../components/BasicContext";
import {
  FeatureArticles,
  FeatureGrid,
  Influence,
  Influencers,
  SearchCollege
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
      <Head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#e57045" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon-196x196.png" sizes="196x196" />
        <link
          rel="shortcut icon"
          href="/android-chrome-192x192.png"
          sizes="192x192"
        />
        <link
          rel="shortcut icon"
          href="/android-chrome-512x512.png"
          sizes="512x512"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-228x228.png"
          sizes="228x228"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-196x196.png"
          sizes="196x196"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-160x160.png"
          sizes="160x160"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-144x144.png"
          sizes="144x144"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-128x128.png"
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-120x120.png"
          sizes="128x128"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon-180x180.png"
          sizes="180x180"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon-152x152.png"
          sizes="152x152"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-152x152.png"
          sizes="152x152"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-144x144.png"
          sizes="144x144"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon-120x120.png"
          sizes="120x120"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-120x120.png"
          sizes="120x120"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-114x114.png"
          sizes="114x114"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-76x76.png"
          sizes="76x76"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-72x72.png"
          sizes="72x72"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-60x60.png"
          sizes="60x60"
        />
        <link
          rel="apple-touch-icon-precomposed"
          href="/apple-touch-icon-57x57.png"
          sizes="57x57"
        />
        <meta name="msapplication-TileColor" content="#5997A2" />
        <meta name="theme-color" content="#5997A2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta
          name="msapplication-wide310x150logo"
          content="/mstile-310x150.png"
        />
        <meta
          name="msapplication-square310x310logo"
          content="/mstile-310x310.png"
        />
        <meta
          name="msapplication-square150x150logo"
          content="/mstile-150x150.png"
        />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta
          name="msapplication-square70x70logo"
          content="/mstile-70x70.png"
        />
      </Head>
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
          <SearchCollege />
        </div>
        <div className="feature">
          <FeatureArticles label="FEATURE">
            <FeatureGrid articles={props.features.articles.slice(0, 4)} />
          </FeatureArticles>
        </div>
        <div className="influence">
          <h1 className="influenceTitle">INFLUENCE BY DISCIPLINE</h1>
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

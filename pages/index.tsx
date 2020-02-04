import { NextPage } from "next";
import { apiFeaturesPage, apiHomePage } from "../api";
import { Article } from "../components/FeaturePage";
import {
  ArticlePartialData,
  FeaturesPageResponse,
  HomePageResponse
} from "../schema";
import { ACTION_COLOR, SECONDARY_DARK } from "../styles";
import { ArticleLink } from "../links";

type IndexProps = {
  homePage: HomePageResponse;
  features: FeaturesPageResponse;
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

const Index: NextPage<IndexProps> = (props: IndexProps) => (
  <div>
    <div
      css={{
        backgroundImage: `url(${props.homePage.currentFeature.bannerUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        width: "100%",
        height: "394px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div css={{ flexGrow: 1 }} />
      <div
        css={{
          fontSize: "16px",
          lineHeight: "18px",
          color: "white",
          paddingLeft: "20px",
          paddingRight: "75%",
          fontWeight: "bold",
          justifyContent: "end"
        }}
      >
        {props.homePage.currentFeature.name}
      </div>
      <ArticleLink
        article={props.homePage.currentFeature}
      >
        <button
          css={{
            borderRadius: "30px",
            boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.25)",
            backgroundColor: ACTION_COLOR,
            paddingLeft: "56px",
            paddingRight: "56px",
            height: "36px",
            lineHeight: "36px",
            marginLeft: "20px",
            marginTop: "20px",
            fontSize: "20px",
            color: "white",
            borderWidth: "0px",
            width: "189px",
            margin: "20px"
          }}
        >
          Explore
        </button>
      </ArticleLink>
    </div>
    <Section label="FEATURE ARTICLES">
      <FeatureGrid articles={props.features.articles.slice(0, 3)} />
    </Section>
  </div>
);

Index.getInitialProps = async function({ req }) {
  const homePageQuery = apiHomePage({});
  const featuresQuery = apiFeaturesPage({
    category: null,
    article: null
  });

  return {
    homePage: await homePageQuery,
    features: await featuresQuery
  };
};

export default Index;

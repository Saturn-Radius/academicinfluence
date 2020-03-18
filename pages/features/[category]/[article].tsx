import { NextPage, NextPageContext } from "next";
import Link from "next/link";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiFeaturesPage } from "../../../api";
import FeaturePage, { Article } from "../../../components/FeaturePage";
import HtmlContent from "../../../components/HtmlContent";
import { ArticlePartialData, FeaturesPageResponse } from "../../../schema";
import { DescriptionText, Header1 } from "../../../styles";

type FeaturesProps = {
  data: FeaturesPageResponse;
};

function FeatureGrid(props: { articles: ArticlePartialData[] }) {
  return (
    <div
      css={{
        display: "none",
        alignItems: "top",
        borderTopStyle: "solid",
        borderTopColor: "black",
        borderTopWidth: "0.5px",
        marginTop: "1.5in",
        paddingTop: "25px",

        ">div:nth-of-type(2) .article, >div:nth-of-type(3) .article,>div:nth-of-type(5) .article ,>div:nth-of-type(6) .article": {
          borderLeftStyle: "solid",
          borderLeftColor: "black",
          borderLeftWidth: "0.5px"
        },
        "@media(min-width: 1248px)": {
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)"
        }
      }}
    >
      {props.articles.map((article, index) => (
        <Article article={article} key={index} />
      ))}
    </div>
  );
}

function BackArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="20"
      fill="none"
      viewBox="0 0 11 20"
    >
      <path
        fill="#666"
        fillRule="evenodd"
        d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.424l-7.893-7.617a.975.975 0 0 1 0-1.415l7.83-7.557a.974.974 0 0 0 0-1.413z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const Features: NextPage<FeaturesProps> = props => {
  const articles = props.data.articles;
  if (!props.data.article) {
    throw new Error();
  }
  return (
    <FeaturePage data={props.data} title={props.data.article.name}>
      <Link href="/features">
        <a
          css={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center"
          }}
        >
          <BackArrow />
          <span
            css={{
              fontSize: "20px",
              lineHeight: "1.3",
              paddingLeft: "6px"
            }}
          >
            Back to Articles
          </span>
        </a>
      </Link>
      <article role="main">
        <header>
          <Header1>{props.data.article.name}</Header1>
          <DescriptionText>{props.data.article.excerpt}</DescriptionText>
          <img
            css={{
              width: "100%",
              height: "auto",
              display: "block"
            }}
            src={props.data.article.bannerUrl}
          />
        </header>
        <HtmlContent html={props.data.article.content} />
        <FeatureGrid articles={articles.slice(0, 3)} />
      </article>
    </FeaturePage>
  );
};

Features.getInitialProps = async function(context: NextPageContext) {
  const data = await apiFeaturesPage({
    category: context.query.category as string,
    article: context.query.article as string
  });

  return { data };
};

(Features as any).currentSection = "features";

export default Features;

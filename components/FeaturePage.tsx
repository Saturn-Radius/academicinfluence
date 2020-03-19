import { ArticleLink, CategoryLink } from "../links";
import { ArticlePartialData, Category, FeaturesPageResponse } from "../schema";
import { MAIN_DARKER } from "../styles";
import StandardPage from "../templates/StandardPage";

export function Article(props: { article: ArticlePartialData }) {
  if (!props.article) {
    return <></>;
  }
  return (
    <div css={{ display: "flex", alignItems: "top" }}>
      <div
        className="article"
        css={{
          display: "flex",
          flexDirection: "column-reverse",
          paddingLeft: "16px",
          paddingRight: "16px",
          alignItems: "top"
        }}
      >
        <div>
          <ArticleLink article={props.article}>
            <a
              css={{
                textDecoration: "none",
                cursor: "pointer"
              }}
            >
              <h2
                css={{
                  color: MAIN_DARKER,
                  fontSize: "16px",
                  fontWeight: "bold",
                  "@media(min-width: 1248px)": {
                    fontSize: "28px"
                  }
                }}
              >
                {props.article.name}
              </h2>
            </a>
          </ArticleLink>
          <div
            css={{
              fontSize: "12px",
              fontWeight: 250,
              marginBottom: "16px"
            }}
          >
            {props.article.date}
          </div>
          <p
            css={{
              "@media(min-width: 800px)": {
                fontSize: "20px"
              },
              fontSize: "12px"
            }}
          >
            {props.article.excerpt}
          </p>
        </div>
        <div>
          <img
            css={{ width: "100%", height: "auto", display: "block" }}
            src={props.article.thumbnailUrl}
          />
        </div>
      </div>
    </div>
  );
}

function CategoryBar(props: { categories: Category[] }) {
  return (
    <div
      css={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      {props.categories.map(category => (
        <CategoryLink category={category} key={category.slug}>
          <a
            css={{
              marginLeft: "13px",
              marginRight: "13px",
              marginTop: "5px",
              marginBottom: "5px",
              fontSize: "20px",
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            {category.name}
          </a>
        </CategoryLink>
      ))}
    </div>
  );
}

export default function FeaturePage(props: {
  data: FeaturesPageResponse;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <StandardPage title={props.title} section="features" hideTitle>
      {" "}
      <CategoryBar categories={props.data.categories} />
      {props.children}
    </StandardPage>
  );
}

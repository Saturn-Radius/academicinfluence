import { ArticleLink, CategoryLink } from "../links";
import { ArticlePartialData, Category, FeaturesPageResponse } from "../schema";
import { GRAY, GRAY_DARKEST, MAIN_DARKER, PAGE_WIDTH_STYLE } from "../styles";

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
                textDecoration: "none"
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
              color: GRAY,
              fontSize: "12px",
              fontWeight: 250
            }}
          >
            {props.article.author}
          </div>
          <div
            css={{
              color: GRAY_DARKEST,
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
              fontSize: "12px",
              color: GRAY
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
              color: GRAY_DARKEST,
              fontSize: "20px",
              fontWeight: 500
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
}) {
  return (
    <main css={PAGE_WIDTH_STYLE}>
      <CategoryBar categories={props.data.categories} />
      {props.children}
    </main>
  );
}

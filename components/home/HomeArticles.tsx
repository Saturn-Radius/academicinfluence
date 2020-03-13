import { ArticleLink } from "../../links";
import { ArticlePartialData } from "../../schema";

const HomeArticles = (props: { article: ArticlePartialData; type: number }) => {
  if (!props.article) {
    return <></>;
  }
  return (
    <>
      <style jsx>
        {`
          .leftArticle {
            display: flex;
            flex-direction: column;
          }
          .rightArticle {
            display: flex;
          }
          .leftImg {
            width: 100%;
            height: 320px;
          }
          .rightImg {
            width: 140px;
            height: 140px;
          }
          .leftTitle {
            text-decoration: none;
            font-size: 18px;
            color: #666666;
          }
          .rightTitle {
            text-decoration: none;
            font-size: 12px;
            color: #666666;
          }
          .articleContent {
            color: #666666;
          }
          .rightExcerpt {
            margin-left: 20px;
          }
          .setUnderline {
            padding: 20px 0;
            border-bottom: 1px solid #666666;
          }
          @media (max-width: 600px) {
            .rightArticle {
              display: flex;
              flex-direction: column;
            }
            .leftImg {
              width: 100%;
              height: 200px;
            }
            .rightImg {
              width: 160px;
              height: 160px;
            }
            .leftTitle {
              font-size: 16px;
            }
            .leftExcerpt {
              padding: 0 12px;
            }
            .setUnderline {
              padding: 0 !important;
              border: none;
            }
          }
        `}
      </style>
      <div
        className={
          props.type !== 0 && props.type !== 3 ? "setUnderline" : "emptyLine"
        }
        style={props.type === 1 ? styles.removeTop : styles.onTop}
      >
        <div className={props.type === 0 ? "leftArticle" : "rightArticle"}>
          <div>
            <img
              className={props.type === 0 ? "leftImg" : "rightImg"}
              src={props.article.thumbnailUrl}
            />
          </div>
          <div className={props.type === 0 ? "leftExcerpt" : "rightExcerpt"}>
            <div>
              <ArticleLink article={props.article}>
                <a className={props.type === 0 ? "leftTitle" : "rightTitle"}>
                  <h2>{props.article.name}</h2>
                </a>
              </ArticleLink>
            </div>
            <div>
              {props.article.author}, {props.article.date}
            </div>
            <p className="articleContent">
              {props.article.excerpt.length > 130
                ? props.article.excerpt.substring(0, 130) + "...."
                : props.article.excerpt}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  removeTop: {
    paddingTop: 0
  },
  onTop: {
    paddingTop: 20
  }
};

export default HomeArticles;

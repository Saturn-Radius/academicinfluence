import { ArticlePartialData } from "../../schema";
import HomeArticles from "./HomeArticles";

interface GridProps {
  articles: ArticlePartialData[];
}

const FeatureGrid = (props: GridProps) => {
  return (
    <div>
      <style jsx>
        {`
          .featureContent {
            display: flex;
            justify-content: center;
          }
          .leftArticle {
            max-width: 650px;
            padding-right: 35px;
            border-right: 1px solid #666666;
          }
          .rightArticles {
            display: flex;
            flex-direction: column;
            max-width: 650px;
            padding-left: 30px;
          }
          @media (max-width: 600px) {
            .featureContent {
              flex-direction: column;
            }
            .leftArticle {
              width: 100%;
              padding-right: 0px;
              border: none;
              border-bottom: 1px solid #666666;
            }
            .rightArticles {
              flex-direction: row;
              padding-left: 0px;
              justify-content: center;
              margin-top: 18px;
            }
            .showSection {
              width: 45%;
            }
            .hiddenSection {
              display: none;
            }
            #secondArticle {
              border-right: 1px solid #666666;
            }
          }
        `}
      </style>
      <div className="featureContent">
        <div className="leftArticle">
          {props.articles.map(
            (article, index) =>
              index === 0 && (
                <HomeArticles article={article} key={index} type={index} />
              )
          )}
        </div>
        <div className="rightArticles">
          {props.articles.map(
            (article, index) =>
              index !== 0 && (
                <div
                  key={index}
                  className={index === 3 ? "hiddenSection" : "showSection"}
                  id={index === 1 ? "secondArticle" : "extraArticles"}
                >
                  <HomeArticles article={article} key={index} type={index} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;

import { ArticlePartialData } from "../../schema";

interface GridProps {
  articles: ArticlePartialData[];
}

const FeatureGrid = (props: GridProps) => {
  let selectArticel = props.articles.slice(0, 3);
  return (
    <div>
      <style jsx>
        {`
          .featureContent {
            display: flex;
            justify-content: space-evenly;
          }
          .leftArticles {
            display: flex;
            flex-direction: column;
            max-width: 650px;
          }
          .rightArticles {
            max-width: 650px;
          }
          .article {
            display: flex;
          }
          @media (max-width: 600px) {
          }
        `}
      </style>
      <div className="featureContent">
        <div className="leftArticles">
          <img src="/images/tempFeature01.PNG" />
          <h1>Article 3 Headline</h1>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </span>
        </div>
        <div className="rightArticles">
          <div className="article">
            <img src="/images/temp02.PNG" />
            <div>
              <h2>Article Headline</h2>
              <span>
                Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
                fermentum odio.
              </span>
            </div>
          </div>
          <div className="article">
            <img src="/images/temp03.PNG" />
            <div>
              <h2>Article Headline</h2>
              <span>
                Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
                fermentum odio.
              </span>
            </div>
          </div>
          <div className="article">
            <img src="/images/temp04.PNG" />
            <div>
              <h2>Article Headline</h2>
              <span>
                Pellentesque eu tincidunt tortor aliquam nulla facilisi cras
                fermentum odio.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;

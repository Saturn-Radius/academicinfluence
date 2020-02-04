import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiFeaturesPage } from "../../api";
import FeaturePage, { Article } from "../../components/FeaturePage";
import { ArticlePartialData, FeaturesPageResponse } from "../../schema";

type FeaturesProps = {
    data: FeaturesPageResponse
}



function FeatureGrid(props: {articles: ArticlePartialData[]}) {
    return <div css={{
        display: "grid",
        alignItems: "top",
        gridTemplateColumns: "repeat(6, 1fr)",
        ">div:nth-of-type(1)": {
            gridRow: 1,
            gridColumnStart: 1,
            gridColumnEnd: 7,
            "& h2": {
                fontSize: "24px"
            },
            ".article": {
                flexDirection: "column",
            },
            borderBottomStyle: "solid",
            borderBottomColor: "black",
            borderBottomWidth: "0.5px",
            paddingBottom: "32px",
            marginBottom: "16px"

        },
        ">div:nth-of-type(2)": {
            gridRow: 2,
            gridColumnStart: 1,
            gridColumnEnd: 4
        },
        ">div:nth-of-type(3)": {
            gridRow: 2,
            gridColumnStart: 4,
            gridColumnEnd: 7
        },
        ">div:nth-of-type(4)": {
            gridRow: 3,
            gridColumnStart: 1,
            gridColumnEnd: 4
        },
        ">div:nth-of-type(5)": {
            gridRow: 3,
            gridColumnStart: 4,
            gridColumnEnd: 7
        },

        '>div:nth-of-type(2),>div:nth-of-type(3),>div:nth-of-type(4),>div:nth-of-type(5),>div:nth-of-type(6)': {
            display: 'flex',
            paddingTop: '19px',
            '.article': {
                flexDirection: 'column-reverse',
            },
            "& h1": {
                fontSize: '16px'
            },

        },
        '>div:nth-of-type(6)': {
            display: 'none'
        },
        '>div:nth-of-type(2),>div:nth-of-type(4)': {
        },
        '>div:nth-of-type(3) .article,>div:nth-of-type(5) .article ,>div:nth-of-type(6) .article': {
            borderLeftStyle: "solid",
            borderLeftColor: "black",
            borderLeftWidth: "0.5px",
        },
        '@media(min-width: 1248px)': {
            ">div:nth-of-type(1)": {
                ".article": {
                    flexDirection: "row"
                },
                ".article>*": {
                    flexGrow: 1,
                    flexBasis: 0
                },
                ".article>div:nth-of-type(2)": {
                    paddingLeft: "26px"
                },
                "& h2": {
                    fontSize: "48px"
                },

                borderBottomStyle: "solid",
                borderBottomColor: "black",
                borderBottomWidth: "0.5px",
                paddingBottom: "32px",
                marginBottom: "16px"

            },
            ">div:nth-of-type(4)": {
                gridColumnStart: 1,
                gridColumnEnd: 3
            },
            ">div:nth-of-type(5)": {
                gridColumnStart: 3,
                gridColumnEnd: 5,
            },
            '>div:nth-of-type(6)': {
                display: 'flex',
                flexDirection: "column-reverse",
                gridRow: 3,
                gridColumnStart: 5,
                gridColumnEnd: 7
            },           
            '>div:nth-of-type(4),>div:nth-of-type(5),>div:nth-of-type(6)': {
                borderTopStyle: "solid",
                borderTopColor: "black",
                borderTopWidth: "0.5px",
                paddingTop: "32px",
                marginTop: "16px"
            },
            }

    }}>
            {props.articles.map((article, index) => 
                <Article article={article} key={index}/>
            )}
    </div>
}

const Features: NextPage<FeaturesProps> = props => {
    const articles = props.data.articles
  return (
      <FeaturePage data={props.data}>
        <FeatureGrid articles={articles}/>
      </FeaturePage>
  );
};

Features.getInitialProps = async function(context: NextPageContext) {


  const data = await apiFeaturesPage({
      category: null,
      article: null
  })

  return { data };
};

(Features as any).currentSection = 'features'

export default Features;

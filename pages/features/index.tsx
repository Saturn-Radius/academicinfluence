import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { ReactElementLike, resetWarningCache } from "prop-types";
import {
  GRAY_DARK,
  GRAY_MID,
  PRIMARY_DARK,
  GRAY_LIGHT,
  TERTIARY_DARK,
  SECONDARY_DARK,
  BACKGROUND_1,
  PAGE_WIDTH_STYLE
} from "../../styles";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Slider, { Range, HandleProps, Handle } from "rc-slider";
import Tooltip from "rc-tooltip";
import {
 CollegeData,
  apiFeaturesPage,
  apiLocationAutocomplete,
  FeaturesPageResponse,
  FeaturesPageCategory,
  FeaturesPageArticle
} from "../../api";
import { InterpolationWithTheme, css } from "@emotion/core";
import Select from "react-select";
import USAStates from "usa-states";
import Autocomplete from "react-autocomplete";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { find } from "lodash";
import { defaultProps } from "react-select/src/Select";
import { getEnabledCategories } from "trace_events";

type FeaturesProps = {
    data: FeaturesPageResponse
}

function CategoryBar(props: {categories: FeaturesPageCategory[]}) {
    return <div css={{
        display: 'flex',
        justifyContent: 'center'
    }}>
        {props.categories.map(category => (
            <Link  href={"/features/" + category.name} key={category.name}>
                <a css={{
                    marginLeft: '13px',
                    marginRight: '13px',
                    marginTop: '5px',
                    marginBottom: '5px',
                color: GRAY_DARK,
                fontSize: '20px',
                fontWeight: 500,
            }}>{category.name}</a>
            </Link>
        ))}
    </div>
}



function Article(props: {article: FeaturesPageArticle}) {
    if (!props.article) {
        return <></>
    }
    return <div css={{display: "flex", alignItems: "top"}}>
        <div className="article" css={{
            display: "flex",
            paddingLeft: "16px",
            paddingRight: "16px",
            alignItems: "top"
        }}>

        <div>

        <h1 css={{
            color: SECONDARY_DARK,
            fontSize: '48px',
            fontWeight: 'bold',
            margin: 0
        }}>{props.article.title}</h1>
        <div css={{
            color: GRAY_MID,
            fontSize: '12px',
            fontWeight: 250
        }}>{props.article.author}</div>
        <div css={{
            color: GRAY_DARK,
            fontSize: '12px',
            fontWeight: 250,
            marginBottom: '16px'
        }}>{props.article.date}</div>
        <p css={{
            '@media(min-width: 800px)': {
                fontSize: '20px',
            },
            fontSize: '12px',
            color: GRAY_MID
        }}>{props.article.excerpt}</p>
        </div>
        <div>

        <img css={{                width: "100%",
                height: "auto",
                display: "block"}}
 src={"/api/image/" + props.article.featuredImage}/>
        </div>
        </div>
    </div>
}

function FeatureGrid(props: {articles: FeaturesPageArticle[]}) {
    return <div css={{
        display: "grid",
        alignItems: "top",
        gridTemplateColumns: "repeat(6, 1fr)",
        ">div:nth-of-type(1)": {
            gridRow: 1,
            gridColumnStart: 1,
            gridColumnEnd: 7,
            ".article": {
                flexDirection: "column",
            },

            "& h1": {
                fontSize: "24px"
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
                "& h1": {
                    fontSize: "48px"
                },
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
    const articles = [
        props.data.articles[0],
        props.data.articles[0],
        props.data.articles[0],
        props.data.articles[0],
        props.data.articles[0],
        props.data.articles[0],
    ]
  return (
    <div css={PAGE_WIDTH_STYLE}>
    <CategoryBar categories={props.data.categories}/>
    <FeatureGrid articles={articles}/>
   </div>
  );
};

Features.getInitialProps = async function(context: NextPageContext) {


  const data = await apiFeaturesPage(null);

  return { data };
};

(Features as any).currentSection = 'features'

export default Features;

import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { ReactElementLike, resetWarningCache } from "prop-types";
import {
  GRAY_DARK,
  GRAY_MID,
  PRIMARY_DARK,
  Header1
} from "../../../styles";
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
} from "../../../api";
import { InterpolationWithTheme, css } from "@emotion/core";
import Select from "react-select";
import USAStates from "usa-states";
import Autocomplete from "react-autocomplete";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { find } from "lodash";
import { defaultProps } from "react-select/src/Select";
import { getEnabledCategories } from "trace_events";
import FeaturePage from "../../../components/FeaturePage";

type FeaturesProps = {
    data: FeaturesPageResponse
}

function Article(props: {article: FeaturesPageArticle}) {
    if (!props.article) {
        return <></>
    }
    return <div css={{display: "flex", alignItems: "top", paddingTop: "20px", paddingBottom: "40px"}}>
        <div className="article" css={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "16px",
            paddingRight: "16px",
            alignItems: "top"
        }}>
                    <div>

        <img css={{                width: "100%",
                height: "auto",
                display: "block"}}
 src={"/api/image/" + props.article.featuredImage}/>
        </div>


        <h2 css={{
            color: GRAY_MID,
            fontWeight: "bold",
            fontSize: "28px"
        }}>{props.article.title}</h2>
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
    </div>
}

function FeatureGrid(props: {articles: FeaturesPageArticle[]}) {
    return <div css={{
        display: "grid",
        alignItems: "top",
        gridTemplateColumns: "repeat(2, 1fr)",
        '>div:nth-of-type(2) .article, >div:nth-of-type(3) .article,>div:nth-of-type(5) .article ,>div:nth-of-type(6) .article': {
            borderLeftStyle: "solid",
            borderLeftColor: "black",
            borderLeftWidth: "0.5px",
        },
        '@media(min-width: 1248px)': {
            gridTemplateColumns: "repeat(3, 1fr)",
        } 

    }}>
            {props.articles.map((article, index) => 
                <Article article={article} key={index}/>
            )}
    </div>
}



const Features: NextPage<FeaturesProps> = props => {
    const articles = props.data.articles
    if (!props.data.category) {
        throw new Error();
    }
  return (
      <FeaturePage data={props.data}>
          <Header1>{props.data.category.name}</Header1>
          <p css={{
              fontSize: "24px",
              fontWeight: "bold",
              lineHeight: "30px",
              color: GRAY_MID
          }}>{props.data.category.description}</p>
          <FeatureGrid articles={articles}/>
      </FeaturePage>
  );
};

Features.getInitialProps = async function(context: NextPageContext) {


  const data = await apiFeaturesPage({
      category: context.query.category as string
  });

  return { data };
};

(Features as any).currentSection = 'features'

export default Features;

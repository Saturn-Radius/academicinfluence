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
  PAGE_WIDTH_STYLE,
  Header1
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
  FeaturesPageArticleSummary
} from "../../api";
import { InterpolationWithTheme, css } from "@emotion/core";
import Select from "react-select";
import USAStates from "usa-states";
import Autocomplete from "react-autocomplete";
import DropdownTreeSelect from "react-dropdown-tree-select";
import { find } from "lodash";
import { defaultProps } from "react-select/src/Select";
import { getEnabledCategories } from "trace_events";
import FeaturePage, { Article } from "../../components/FeaturePage"

type FeaturesProps = {
    data: FeaturesPageResponse
}



function FeatureGrid(props: {articles: FeaturesPageArticleSummary[]}) {
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

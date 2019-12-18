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

const VARIANTS = {
    primary: css({
        display: "flex",
        width: 0,
        flexGrow: 1,
        flexDirection: "column",
        "& h1": {
            fontSize: '24px'
        },
        "@media(min-width: 800px)": {
            flexDirection: "row",
            "& h1": {
                fontSize: '48px'
            },
            ">*": {
                flexGrow: 1,
                width: 0
            }
        },
    }),
    secondary: css({
        flexGrow: 1,
        display: "flex",
        width: 0,
        flexDirection: "column-reverse",
        "@media(min-width: 800px)": {
            "& h1": {
                fontSize: '48px'
            },
 
        },
        "& h1": {
            fontSize: '16px'
        },
 
    }),
    tertiary: css({
        display: "flex",
        flexGrow: 1,
        width: 0,
        flexDirection: "column-reverse",
        ":nth-child(3)": {
            display: 'none',
        },
       "@media(min-width: 800px)": {
            "& h1": {
                fontSize: '48px'
            },
 
        },
        "& h1": {
            fontSize: '16px'
        },
        '@media(min-width: 1248px)': {
            ":nth-child(3)": {
                display: "flex"
            },
        }
    })
}

function Article(props: {article: FeaturesPageArticle, variant: 'primary' | 'secondary' | 'tertiary'}) {
    if (!props.article) {
        return <></>
    }
    return <div css={VARIANTS[props.variant]}>
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
}

function FeatureGridRow(props: {children: React.ReactNode}) {
    return <div css={{
        display: 'flex',
        '>div': {
            borderLeftStyle: "solid",
            borderLeftColor: "black",
            borderLeftWidth: "0.5px",
            paddingLeft: "16px",
            marginLeft: "32px"
        },
        '>div:nth-child(1)': {
            borderLeft: 'none'
        }
    }}>
        {props.children}
    </div>
}

function FeatureGrid(props: {articles: FeaturesPageArticle[]}) {
    return <div css={{
        '>div': {
            borderTopStyle: "solid",
            borderTopColor: "black",
            borderTopWidth: "0.5px",
            paddingTop: "16px",
            marginTop: "32px"
        },
        '>div:nth-child(1)': {
            borderTop: 'none'
        }
    }}>
        <FeatureGridRow>
            <Article article={props.articles[0]} variant="primary" />
        </FeatureGridRow>
        <FeatureGridRow>
            <Article article={props.articles[1]} variant="secondary" />
            <Article article={props.articles[2]} variant="secondary" />
        </FeatureGridRow>
        <FeatureGridRow>
            <Article article={props.articles[3]} variant="tertiary" />
            <Article article={props.articles[4]} variant="tertiary" />
            <Article article={props.articles[5]} variant="tertiary" />
        </FeatureGridRow>
    </div>
}

const Features: NextPage<FeaturesProps> = props => {
  return (
    <div css={PAGE_WIDTH_STYLE}>
    <CategoryBar categories={props.data.categories}/>
    <FeatureGrid articles={props.data.articles}/>
   </div>
  );
};

Features.getInitialProps = async function(context: NextPageContext) {


  const data = await apiFeaturesPage(null);

  return { data };
};

(Features as any).currentSection = 'features'

export default Features;

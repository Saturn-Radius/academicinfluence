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

function PrimaryArticle(props: {article: FeaturesPageArticle}) {
    if (!props.article) {
        return <></>
    }
    return <div css={{
        display: "flex",
        borderBottomStyle: "solid",
        borderBottomColor: "black",
        borderBottomWidth: "0.5px",
        paddingBottom: "16px",
        marginBottom: "32px"
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
            fontSize: '20px',
            color: GRAY_MID
        }}>{props.article.excerpt}</p>
        </div>
        <img css={{
            maxWidth: '577px',
            maxHeight: '354px',
            marginLeft: '26px'
        }} src={"/api/image/" + props.article.featuredImage}/>
    </div>
}

function SecondayArticle(props: {article: FeaturesPageArticle, first?: boolean}) {
    if (!props.article) {
        return <></>
    }
    return <div css={{
        display: "flex",
        flexDirection: "column-reverse",
        flexGrow: 1,
        borderRight: props.first ? "solid .5px black" : undefined,
        paddingRight: props.first ? "24px" : undefined,
        marginRight: props.first ? "24px" : undefined,
        width: 0
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
            fontSize: '20px',
            color: GRAY_MID
        }}>{props.article.excerpt}</p>
        </div>
        <img css={{
            maxWidth: '450px',
            maxHeight: '250px',
            marginLeft: '26px'
        }} src={"/api/image/" + props.article.featuredImage}/>
    </div>
}

const Features: NextPage<FeaturesProps> = props => {

  return (
    <div css={PAGE_WIDTH_STYLE}>
    <CategoryBar categories={props.data.categories}/>
    <PrimaryArticle article={props.data.articles[0]}/>
    <div css={{display: "flex",
    alignItems: "start",
        
 
}}>
        <SecondayArticle article={props.data.articles[1]} first/>
        <SecondayArticle article={props.data.articles[2]}/>
    </div>
    </div>
  );
};

Features.getInitialProps = async function(context: NextPageContext) {


  const data = await apiFeaturesPage(null);

  return { data };
};

(Features as any).currentSection = 'features'

export default Features;

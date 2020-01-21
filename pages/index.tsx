import fetch from "isomorphic-unfetch";
import { NextPage } from "next";
import { apiHomePage, HomePageResponse } from "../api";
import { ACTION_COLOR } from "../styles";
import Link from "next/link";

type IndexProps = {
  homePage: HomePageResponse
};

const Index: NextPage<IndexProps> = (props: IndexProps) => (
  <div>
    <div css={{
      backgroundImage: `url(/api/image/${props.homePage.currentFeature.image})`,
      width: "100%",
      height: "394px",
    }}>
      <div css={{
        fontSize: "16px",
        lineHeight: "18px",
        color: "white",
        paddingLeft: "20px",
        paddingRight: "75%",
        paddingTop: "251px",
        fontWeight: "bold"
      }}>
        {props.homePage.currentFeature.title}
      </div>
      <Link href={`/features/${props.homePage.currentFeature.category}/${props.homePage.currentFeature.slug}`}>

      <button css={{
        borderRadius: "30px",
        boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.25)",
        backgroundColor: ACTION_COLOR,
        paddingLeft: "56px",
        paddingRight: "56px",
        height: "36px",
        lineHeight: "36px",
        marginLeft: "20px",
        marginTop: "20px",
        fontSize: "20px",
        color: "white",
        borderWidth: "0px"
      }}>Explore</button>
      </Link>
    </div>
    <h1>Hello World!</h1>
    {JSON.stringify(props.homePage)}
  </div>
);

Index.getInitialProps = async function({ req }) {
  const homePageQuery = apiHomePage({})

  const homePage = await homePageQuery

  return {
    homePage
  };
};

export default Index;

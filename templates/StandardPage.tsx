import { NextSeo } from "next-seo";
import { useMediaQuery } from "react-responsive";
import BacktotopButton from "../components/BacktotopButton";
import { Row } from "../components/grid";
import { Sidebar } from "../components/school";
import { LeftCol, RightCol } from "../components/schools/styles";
import PageLayout from "./PageLayout";

export default function StandardPage(props: {
  title: string;
  children: React.ReactNode;
}) {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1200px)" });

  return (
    <>
      <NextSeo title={props.title} />
      <PageLayout>
        <Row>
          <LeftCol>{props.children}</LeftCol>
          <RightCol>{isBigScreen && <Sidebar />}</RightCol>
        </Row>
        {!isBigScreen && <Sidebar />}
        <BacktotopButton />
      </PageLayout>
    </>
  );
}

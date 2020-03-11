import { NextSeo } from "next-seo";
import BacktotopButton from "../components/BacktotopButton";
import { Sidebar } from "../components/school";
import PageLayout from "./PageLayout";

export default function StandardPage(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <NextSeo title={props.title} />
      <PageLayout>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            "@media(min-width: 1200px)": {
              flexDirection: "row"
            }
          }}
        >
          <div
            css={{
              flexGrow: 1
            }}
          >
            {props.children}
          </div>
          <div
            css={{
              flex: "0 0 320px",
              margin: 30
            }}
          >
            <Sidebar />
          </div>
        </div>
        <BacktotopButton />
      </PageLayout>
    </>
  );
}

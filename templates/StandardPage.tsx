import { NextSeo } from "next-seo";
import { Sidebar } from "../components/school";
import { PageTitle } from "../styles";
import BasicPage, { SectionId } from "./BasicPage";
import PageLayout from "./PageLayout";

export default function StandardPage(props: {
  title: string;
  section: SectionId;
  children: React.ReactNode;
  hideTitle?: boolean;
}) {
  return (
    <BasicPage section={props.section}>
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
            {!props.hideTitle && <PageTitle>{props.title}</PageTitle>}
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
      </PageLayout>
    </BasicPage>
  );
}

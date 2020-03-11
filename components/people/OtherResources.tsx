import { GRAY_LIGHTEST, MAIN } from "../../styles";
import ContentCard from "../ContentCard";

interface ResourceData {
  links: string[];
}

const OtherResources = (props: ResourceData) => {
  return (
    <div
      style={{
        display: "inline-block",
        maxWidth: "100vw",
        minWidth: 320,
        marginRight: 40
      }}
    >
      <h2 style={styles.subheaderText}>Other Resources</h2>
      <ContentCard style={styles.container}>
        <div>
          {props.links.map((resource, i) => (
            <div key={i}>
              <a href={resource} style={styles.link}>
                {new URL(resource).host}
              </a>
            </div>
          ))}
        </div>
      </ContentCard>
    </div>
  );
};

const styles = {
  subheaderText: {
    color: MAIN,
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10
  },
  container: {
    fontSize: 18,
    lineHeight: 1.78,
    height: 234,
    padding: 20,
    color: GRAY_LIGHTEST,
    listStyleType: "none"
  },
  link: {
    fontSize: 18,
    lineHeight: 1.78,
    height: 234,
    textDecoration: "underline",
    color: GRAY_LIGHTEST,
    listStyleType: "none"
  }
};

export default OtherResources;

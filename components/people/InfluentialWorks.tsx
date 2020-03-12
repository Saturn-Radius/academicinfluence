import { GRAY, MAIN } from "../../styles";
import ContentCard from "../ContentCard";
import useMoreButton from "../useMoreButton";

interface InfulentialData {
  style: any;
  works: { label: string }[];
}

const InfluentialWorks = (props: InfulentialData) => {
  const { isMore, moreButton } = useMoreButton();
  const displayWorks = !isMore ? props.works.slice(0, 7) : props.works;

  return (
    <div style={props.style}>
      <h2 style={styles.subheaderText}>Notable Books</h2>
      <ContentCard style={styles.container}>
        <div>
          {displayWorks.map((work, i) => (
            <li key={i}>{work.label}</li>
          ))}
        </div>
        {props.works.length > 8 && moreButton}
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
    padding: 20,
    minHeight: 234,
    color: GRAY,
    listStyleType: "none"
  }
};

export default InfluentialWorks;

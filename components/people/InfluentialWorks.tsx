import { InterpolationWithTheme } from "@emotion/core";
import { GRAY, MAIN } from "../../styles";
import ContentCard from "../ContentCard";
import useMoreButton from "../useMoreButton";

interface InfulentialData {
  style: InterpolationWithTheme<any>;
  works: { label: string }[];
}

const InfluentialWorks = (props: InfulentialData) => {
  const { isMore, moreButton } = useMoreButton();
  const displayWorks = !isMore ? props.works.slice(0, 7) : props.works;

  return (
    <div css={props.style}>
      <h2 css={styles.subheaderText}>Notable Books</h2>
      <ContentCard css={styles.container}>
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

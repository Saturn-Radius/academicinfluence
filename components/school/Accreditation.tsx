import { MAIN } from "../../styles";
import ContentCard from "../ContentCard";

const Accreditation = (props: {}) => {
  return (
    <div
      css={{
        display: "inline-block",
        maxWidth: "100vw",
        minWidth: 320,
        marginRight: 40
      }}
    >
      <h4 css={styles.subheaderText}>Accreditation</h4>
      <ContentCard style={styles.container}>
        <div>
          <b>Overall NECHE - Since 1929</b>
        </div>

        <div css={{ paddingTop: 44 }}>
          <b>Programs</b>
        </div>
        <div css={{ paddingTop: 10 }}>American Bar Association (ABA)</div>
        <div css={{ paddingTop: 10 }}>American Bar Association (ABA)</div>
        <div css={{ paddingTop: 10 }}>American Bar Association (ABA)</div>
      </ContentCard>
    </div>
  );
};

const styles = {
  subheaderText: {
    color: MAIN,
    fontSize: 22
  },
  container: {
    height: 234,
    padding: 20
  }
};

export default Accreditation;

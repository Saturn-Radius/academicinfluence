import { InterpolationWithTheme } from "@emotion/core";
import { CSSProperties } from "react";
import { PersonLink } from "../../links";
import { PersonPartialData } from "../../schema";
import { MAIN, MAIN_DARKER } from "../../styles";
import { YearRange } from "../../utils/years";
import Button from "../Button";
import ContentCard from "../ContentCard";

const InfluentialCard = (props: { person: PersonPartialData }) => {
  return (
    <ContentCard style={styles.cardWrapper}>
      <div css={{ width: "100%" }}>
        {props.person.image_url && (
          <img
            css={{ float: "left", marginRight: 20, height: 80, width: 60 }}
            src={props.person.image_url}
          />
        )}
        <div css={styles.influentialName}>{props.person.name}</div>
        <div css={{ paddingBottom: 6 }}>
          <YearRange person={props.person} />
        </div>
        <div css={{ fontWeight: "bold" }}>{props.person.short_description}</div>
      </div>

      <div
        css={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between"
        }}
      >
        <div css={styles.influentialRow}>
          <div>IR Score</div>
          <div css={styles.influentialRowText}>
            {(props.person.overall.influence * 100).toFixed(2)}
          </div>
        </div>

        {/*
          TODO
        <div css={styles.influentialRow}>
          <div>School</div>
          <div css={styles.influentialRowText}>1st School</div>
        </div>
        

        <div css={styles.influentialRow}>
          <div>Disciplines</div>
          <div css={styles.influentialRowText}>Computer Science</div>
        </div>
*/}
      </div>

      <div css={{ marginTop: "auto" }}>
        {/* 
        TODO
        <div css={{ color: MAIN, fontWeight: "bold" }}>Influential Works</div>
        <div css={{ paddingBottom: 8 }}>
          Educated: A Memoir, The Body: A Guide for Occupants, Outliers: The
          Story of Success
        </div>
        */}

        <div css={{ float: "right" }}>
          <PersonLink person={props.person}>
            <Button color={MAIN_DARKER} text="See Profile" />
          </PersonLink>
        </div>
      </div>
    </ContentCard>
  );
};

const styles = {
  cardWrapper: {
    width: 280,
    minWidth: 280,
    height: 250,
    padding: 8,
    marginRight: 20,
    marginBottom: 20,
    display: "flex",
    flexWrap: "wrap",
    fontSize: 12,
    color: "#333333",
    lineHeight: 1.3
  } as CSSProperties,

  influentialRow: {
    //textAlign:'center'
  } as InterpolationWithTheme<any>,
  influentialName: {
    color: MAIN,
    fontSize: 20,
    fontWeight: "bold"
  } as InterpolationWithTheme<any>,
  influentialRowText: {
    color: MAIN,
    fontSize: 14,
    fontWeight: "bold"
  } as InterpolationWithTheme<any>
};

export { InfluentialCard };

import React, { CSSProperties } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ACCENT, GRAY, GRAY_DARKEST, MAIN, MAIN_DARKER } from "../styles";
import RadialSeparators from "./RadialSeparators";

const CircularProgress = (props: {
  percentage: number;
  text?: string;
  style?: CSSProperties;
  size?: number;
  textColor?: string;
  fontSize?: string | number;
}) => {
  let pathColor;
  let { text, percentage } = props;

  if (percentage >= 0 && percentage <= 30) {
    pathColor = ACCENT;
  }
  if (percentage >= 30 && percentage <= 90) {
    pathColor = MAIN;
  }
  if (percentage >= 90) {
    pathColor = MAIN_DARKER;
  }

  return (
    <>
      <div
        style={{
          ...styles.container,
          ...props.style
        }}
      >
        <CircularProgressbarWithChildren
          value={percentage}
          text={`${percentage.toFixed()}%`}
          strokeWidth={20}
          styles={{
            root: {
              width: props.size || 300,
              height: props.size || 300
            },
            path: {
              stroke: pathColor,
              strokeLinecap: "butt"
            },
            text: {
              fontSize: 14,
              fill: props.textColor || GRAY_DARKEST,
              transformOrigin: "center center"
            },
            trail: { stroke: `${GRAY}` }
          }}
        >
          <RadialSeparators
            count={4}
            style={{
              background: `${GRAY}`,
              width: "4px",
              height: `${20}%`
            }}
          />
        </CircularProgressbarWithChildren>
        <p style={{ ...{ fontSize: props.fontSize }, ...styles.text }}>
          {text}
        </p>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    textAlign: "center"
  } as React.CSSProperties,
  text: {
    color: GRAY_DARKEST,
    fontWeight: "bold"
  } as React.CSSProperties
};

export default CircularProgress;

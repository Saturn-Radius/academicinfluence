import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { ACCENT, MAIN, MAIN_DARKER } from "../styles";

const CircularProgress = (props: any) => {
  let pathColor;
  let { text } = props;
  const percentage = props.percentage || 0;

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
          ...{ maxWidth: props.size },
          ...props.style
        }}
      >
        <CircularProgressbar
          value={percentage}
          text={percentage.toFixed() + "%"}
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
              fill: props.textColor || "#666666",
              transformOrigin: "center center"
            },
            trail: { strokeWidth: 4, stroke: "#999999" }
          }}
        />
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
    color: "black",
    fontWeight: "bold"
  } as React.CSSProperties
};

export default CircularProgress;

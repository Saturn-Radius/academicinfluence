import { MAIN_DARKER } from "../styles";

const Subscribe = (props: {}) => {
  return (
    <div css={{ display: "flex", flexDirection: "row", paddingLeft: "7%" }}>
      <div className="input-container">
        <img
          src="/icons/email.svg"
          css={{ position: "absolute", paddingTop: 13, paddingLeft: 10 }}
        />
        <input
          className="input-field"
          type="text"
          name="email"
          placeholder="Email"
          css={{ height: 35, fontSize: 20, paddingLeft: 30 }}
        />
      </div>
      <button css={styles.buttonStyle}>Sign Up Now</button>
    </div>
  );
};

const styles = {
  buttonStyle: {
    backgroundColor: MAIN_DARKER,
    border: "none",
    color: "white",
    textDecoration: "none"
  }
};

export default Subscribe;

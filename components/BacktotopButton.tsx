import { ACCENT_LIGHTEST } from "../styles";
const BackToTop = require("react-back-to-top-button");

const BacktotopButton = () => {
  return (
    <BackToTop.default>
      <div css={{ backgroundColor: ACCENT_LIGHTEST }} style={{ margin: 0 }}>
        <img
          css={{ width: 20, padding: "10px 10px" }}
          src="/images/arrow-up.png"
        />
      </div>
    </BackToTop.default>
  );
};

export default BacktotopButton;

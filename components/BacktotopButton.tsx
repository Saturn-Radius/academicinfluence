const BacktotopButton = () => {
  return (
    <div
      css={{ padding: "20px 0px", textAlign: "center" }}
      onClick={() => window.scrollTo(0, 0)}
    >
      BACK TO TOP <img css={{ width: 20 }} src="/images/arrow-up.png" />
    </div>
  );
};

export default BacktotopButton;

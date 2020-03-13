const BacktotopButton = () => {
  return (
    <div
      style={{ padding: "20px 0px", textAlign: "center" }}
      onClick={() => window.scrollTo(0, 0)}
    >
      BACK TO TOP <img style={{ width: 20 }} src="/images/arrow-up.png" />
    </div>
  );
};

export default BacktotopButton;

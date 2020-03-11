const CollegeList = (props: any) => {
  return (
    <div style={{ ...styles.collegesCard, ...props.style }}>
      <SidebarButton img="/images/ranking-icon.png" text="College Ranking" />
      <SidebarButton img="/images/match-icon.png" text="College Match" />
      <SidebarButton img="/images/compare-icon.png" text="College Compare" />
    </div>
  );
};

const SidebarButton = (props: any) => {
  return (
    <>
      <style jsx>
        {`
          .sidebarButton {
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            align-items: center;
            background-color: white;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px 0px;
            padding: 42px 77px;
          }
          .msidebarButton {
            display: none;
          }
          .sidebarText {
            color: rgb(8, 126, 139);
            font-size: 30px;
            font-weight: 550;
            max-width: 140px;
            margin-bottom: 15px;
          }
          .sidebarImg {
            width: 120px;
            height: 120px;
          }
          @media (max-width: 900px) {
            .sidebarButton {
              display: none;
            }
            .msidebarButton {
              display: flex;
              flex-direction: column;
            }
            .mimgSection {
              box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px 0px;
              background-color: white;
              border-radius: 10px;
              padding: 20px;
              border: 1px solid rgb(8, 126, 139);
            }
            .msidebarImg {
              width: 90px;
              height: 90px;
            }
            .sidebarText {
              margin-top: 15px;
              font-size: 15px;
            }
          }
          @media (max-width: 600px) {
            .msidebarImg {
              width: 60px;
              height: 60px;
            }
            .mimgSection {
              padding: 10px;
            }
            .sidebarText {
              margin-top: 10px;
              font-size: 15px;
              max-width: 90px;
            }
          }
        `}
      </style>
      <div className="sidebarButton">
        <span className="sidebarText">{props.text}</span>
        <img className="sidebarImg" src={props.img} />
      </div>
      <div className="msidebarButton">
        <div className="mimgSection">
          <img className="msidebarImg" src={props.img} />
        </div>
        <span className="sidebarText">{props.text}</span>
      </div>
    </>
  );
};

const styles = {
  collegesCard: {
    display: "flex",
    justifyContent: "space-evenly"
  }
};

export default CollegeList;

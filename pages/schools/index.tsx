import { NextPage, NextPageContext } from "next";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import "react-circular-progressbar/dist/styles.css";
import { apiInfluentialSchoolsPage } from "../../api";
import { InfluentialSchoolsPageResponse } from "../../schema";

type InfluentialSchoolsProps = InfluentialSchoolsPageResponse

const InfluentialSchools: NextPage<InfluentialSchoolsProps> = props => {
  return (
      <div>
          
          <pre>
              {JSON.stringify(props.schools, null, 4)}
          </pre>
    </div>
  );
};

InfluentialSchools.getInitialProps = async function(context: NextPageContext) {
  return await apiInfluentialSchoolsPage({})
};

export default InfluentialSchools;

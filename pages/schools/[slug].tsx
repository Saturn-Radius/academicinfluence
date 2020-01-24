import { NextPage, NextPageContext } from "next";
import { apiSchoolPage, SchoolData } from "../../api";

type SchoolProps = {
    school: SchoolData
    
};

const School: NextPage<SchoolProps> = (props: SchoolProps) => (
  <div>
      <img src={props.school.logo_url || ""}/>
      <div>
          Name: {props.school.name}
      </div>
      <div>
          Description: {props.school.description}
      </div>
      <div>
          City: {props.school.city}, {props.school.state}
      </div>
      <div>
          Influence Score: {props.school.disciplines[''].influence}
      </div>
      <div>
          Acceptance Rate: {props.school.acceptance_rate}
      </div>
      <div>
          Graduation Rate: {props.school.graduation_rate}
      </div>
        <ol>

      {Object.entries(props.school.disciplines).map(([discipline, data]) => (<li>
            {discipline} {data.influence} #{data.world_rank} #{data.usa_rank} (USA)
       </li>))}

        </ol>
  </div>
);

School.getInitialProps = async function(context: NextPageContext) {
  const data = await apiSchoolPage({
      slug: context.query.slug as string
  })

  console.log(data)

  return {
      school: data.school
  };
};

export default School;

import { NextPage, NextPageContext } from "next";
import { apiPersonPage, PersonData } from "../../api";

type PersonProps = {
    person: PersonData
    
};

const Person: NextPage<PersonProps> = (props: PersonProps) => (
  <div>
      <div>
          Name: {props.person.name}
      </div>
      <div>
          Description: {props.person.description}
      </div>
      
        <ol>

      {Object.entries(props.person.disciplines).map(([discipline, data]) => (<li key={discipline}>
            {discipline} {data.influence} #{data.world_rank} #{data.usa_rank} (USA)
       </li>))}

        </ol>
  </div>
);

Person.getInitialProps = async function(context: NextPageContext) {
  const data = await apiPersonPage({
      slug: context.query.slug as string
  })

  return {
      person: data.person
  };
};

export default Person;

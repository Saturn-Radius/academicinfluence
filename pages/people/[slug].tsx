import { NextPage, NextPageContext } from "next";
import Link from "next/link";
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
      <div>
        Influence: {props.person.overall.influence} #{props.person.overall.world_rank} #{props.person.overall.usa_rank} (USA)
        </div> 
        <ol>

      {Object.entries(props.person.disciplines).map(([discipline, data]) => (<li key={discipline}>
            {discipline} {data.influence} #{data.world_rank} #{data.usa_rank} (USA)
       </li>))}

        </ol>

        <ol>

      {props.person.schools.map(school => (<li key={school.slug}>
          <Link href={`/schools/${school.slug}`}>
            <a>{school.name}</a>
          </Link>
       </li>))}

        </ol>
        <pre>
          {JSON.stringify(props.person, null, 4)}
        </pre>
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

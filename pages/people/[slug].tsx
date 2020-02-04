import { NextPage, NextPageContext } from "next";
import { apiPersonPage } from "../../api";
import { PersonData } from "../../schema";

type PersonProps = {
    person: PersonData
    
};

const Person: NextPage<PersonProps> = (props: PersonProps) => (
  <div>
      {props.person.image_url && <img src={props.person.image_url}/>}
      {props.person.image_source_url && <a href={props.person.image_source_url}>Source</a>}
      <div>
          Name: {props.person.name} ({props.person.birth_year} - {props.person.death_year})
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
          <SchoolLink school={school}>
            <a>{school.name}</a>
          </SchoolLink>
       </li>))}

        </ol>
        <ol>

      {props.person.links.map(link => (<li key={link}>
        <a href={link}>{link}</a>
       </li>))}

        </ol>
        <ol>

      {props.person.works.map(work=> (<li key={work.label}>
        {work.label}
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

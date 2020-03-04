import { NextPage, NextPageContext } from "next";
import { apiSchoolSubjectPage } from "../../../api";
import { PersonPartialData, SchoolSubjectPageResponse } from "../../../schema";
type SchoolProps = SchoolSubjectPageResponse

type PeopleListProps = {
    people: PersonPartialData[]
}
function PeopleList(props:PeopleListProps) {
    return <ol>            {props.people.map(person => <li key={person.slug}>
                <h2><a href={"/people/" + person.slug}>{person.name}</a> {person.overall.influence}</h2>
                <p>{person.short_description}</p>
                </li>)}
    </ol>
}

const School: NextPage<SchoolProps> = (props: SchoolProps) => (
  <div>
      <div>
          <h1>Alumni</h1>
          <PeopleList people={props.alumni} />
      </div>
      <div>
          <h1>Staff</h1>
          <PeopleList people={props.staff} />
      </div>
  </div>
);

School.getInitialProps = async function(context: NextPageContext) {
  const data = await apiSchoolSubjectPage({
      slug: context.query.slug as string,
      discipline: context.query.subject as string
  })


  return {
      ...data
  };
};

export default School;

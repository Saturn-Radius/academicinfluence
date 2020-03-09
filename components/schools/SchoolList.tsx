import SchoolListItem from "./SchoolListItem";

interface SchoolListProps {
  mode: String;
  schools: any[];
}
const SchoolList = (props: SchoolListProps) => {
  const { mode, schools } = props;

  return schools.map(item => <SchoolListItem mode={mode} school={item} />);
};

export default SchoolList;

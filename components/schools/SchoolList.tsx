import SchoolListItem from "./SchoolListItem";

interface SchoolListProps {
  mode: string;
  schools: any;
}
const SchoolList = (props: SchoolListProps) => {
  const { mode, schools } = props;

  return schools.map((item: any) => (
    <SchoolListItem mode={mode} school={item} />
  ));
};

export default SchoolList;

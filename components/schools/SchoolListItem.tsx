interface SchoolListItemProps {
  mode: string;
  school: any;
}
const SchoolListItem = (props: SchoolListItemProps) => {
  const { school } = props;

  return <>{school.name}</>;
};

export default SchoolListItem;

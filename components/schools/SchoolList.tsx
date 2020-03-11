import { DISPLAY_MODES } from ".";
import SchoolListItem from "./SchoolListItem";
import SchoolThListItem from "./SchoolThListItem";

interface SchoolListProps {
  mode: string;
  schools: any;
}
const SchoolList = (props: SchoolListProps) => {
  const { mode, schools } = props;

  switch (mode) {
    case DISPLAY_MODES.grid:
      return null;
    case DISPLAY_MODES.thMode:
      return schools.map((item: any, index: number) => (
        <SchoolThListItem key={index} mode={mode} school={item} />
      ));
    case DISPLAY_MODES.listMode:
      return schools.map((item: any, index: number) => (
        <SchoolListItem key={index} mode={mode} school={item} />
      ));
    default:
      return null;
  }
};

export default SchoolList;

import {
  faAtom,
  faBalanceScale,
  faBook,
  faBrain,
  faBriefcase,
  faChalkboard,
  faCircle,
  faCoins,
  faComments,
  faDesktop,
  faDna,
  faFlask,
  faGavel,
  faGlobeAmericas,
  faHdd,
  faInfinity,
  faLandmark,
  faMonument,
  faPeopleCarry,
  faPrayingHands,
  faUserFriends,
  faUserMd,
  faUserNurse,
  faUsers,
  faSquareRootAlt,
  faCog,
  faCogs,
  faChalkboardTeacher,
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dictionary } from "lodash";
import { DisciplineDetail } from "../schema";

const ICONS: Dictionary<any> = {
  anthropology: faUsers,
  biology: faDna,
  business: faBriefcase,
  chemistry: faFlask,
  communication: faComments,
  "criminal-justice": faGavel,
  "earth-sciences": faGlobeAmericas,
  economics: faCoins,
  literature: faBook,
  medical: faUserMd,
  law: faBalanceScale,
  sociology: faUserFriends,
  "computer-science": faDesktop,
  nursing: faUserNurse,
  "political-science": faLandmark,
  psychology: faBrain,
  "religious-studies": faPrayingHands,
  "social-work": faPeopleCarry,
  history: faMonument,
  mathematics: faSquareRootAlt,
  philosophy: faLightbulb,
  engineering: faCogs,
  education: faChalkboardTeacher,
  physics: faAtom
};

export default function DisciplineIcon(props: {
  discipline: DisciplineDetail;
}) {
  return <FontAwesomeIcon icon={ICONS[props.discipline.slug]} />;
}

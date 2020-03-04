import { DisciplineDetail } from "../schema";
import {faDna, faUsers, faBriefcase, faFlask, faComments, faGavel, faGlobeAmericas, faCoins, faBook, faUserMd, faPeopleCarry, faDesktop, faBalanceScale, faUserNurse, faLandmark, faBrain, faPrayingHands, faUserFriends, faMonument, faInfinity, faCircle, faHdd, faChalkboard, faAtom} from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { Dictionary } from "lodash";

const ICONS: Dictionary<any> = {
    "anthropology": faUsers,
    "biology": faDna,
    business: faBriefcase,
    chemistry: faFlask,
    communication: faComments,
    "criminal-justice": faGavel,
    "earth-sciences": faGlobeAmericas,
    economics: faCoins,
    literature: faBook,
    medical: faUserMd,
    law: faBalanceScale,
    sociology: faPeopleCarry,
    "computer-science": faDesktop,
    nursing: faUserNurse,
    "political-science": faLandmark,
    psychology: faBrain,
    "religious-studies": faPrayingHands,
    "social-work": faUserFriends,
    "history": faMonument,
    mathematics: faInfinity,
    philosophy: faCircle,
    engineering: faHdd,
    education: faChalkboard,
    physics: faAtom

}

export default function DisciplineIcon(props: {
    discipline: DisciplineDetail
}) {
    return <FontAwesomeIcon icon={ICONS[props.discipline.slug]}/>
}
            
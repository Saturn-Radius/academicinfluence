import { EntityFullData } from "../../schema";
import Description from "../Description";

const ProfileDescription = (props: { style: any; person: EntityFullData }) => {
  return (
    <div style={{ ...styles.card, ...props.style }}>
      <Description entity={props.person} />
    </div>
  );
};

const styles = {
  card: {
    borderRadius: 4,
    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
    padding: 33,
    backgroundColor: "white"
  }
};

export default ProfileDescription;

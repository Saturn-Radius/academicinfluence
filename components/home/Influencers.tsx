import { PersonLink } from "../../links";
import { PersonPartialData } from "../../schema";

type People = {
  people: PersonPartialData[];
};

const Influencers = (props: People) => {
  return (
    <div>
      <style jsx>
        {`
          .nameList {
            display: flex;
            position: relative;
            margin: 0 50px 50px 50px;
            height: 310px;
          }
          .nameCard {
            position: absolute;
            bottom: 0px;
            background-color: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 54px;
            padding-top: 20px;
          }
          .imgWidth {
            width: 240px;
          }
          .personName {
            color: white;
            font-size: 24px;
          }
          @media (max-width: 600px) {
            .nameList {
              height: 140px;
              margin: 0 10px 10px 10px;
            }
            .imgWidth {
              width: 115px;
            }
            .nameCard {
              height: 27px;
              padding-top: 7px;
            }
            .personName {
              font-size: 12px;
            }
          }
        `}
      </style>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          paddingLeft: 0
        }}
      >
        {props.people.map(
          (person: PersonPartialData) =>
            person.image_url && (
              <PersonLink person={person} key={person.slug}>
                <li className="nameList" key={person.slug}>
                  <img className="imgWidth" src={person.image_url} />
                  <div className="nameCard">
                    <a className="personName">{person.name}</a>
                  </div>
                </li>
              </PersonLink>
            )
        )}
      </ul>
    </div>
  );
};

export default Influencers;

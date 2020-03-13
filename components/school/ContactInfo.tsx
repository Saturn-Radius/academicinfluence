import styled from "@emotion/styled";
import { config, IconDefinition } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitter,
  faYoutubeSquare
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SchoolData } from "../../schema";
import ContentCard from "../ContentCard";
config.autoAddCss = false;

const ContactInfoContainer = styled.div``;

const ContactInfoRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InfoLabel = styled.b`
  width: 200px;
`;

const InfoCol = styled.div`
  flex: 1;
  display: flex;
`;

const SocialIcon: any = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props: any) => props.color};
  margin-right: 5px;

  svg {
    path {
      fill: ${(props: any) => props.fillColor || "#fff"};
    }
  }
`;

function SocialMediaIcon(props: {
  prefix: string;
  username: string | null;
  color: string;
  icon: IconDefinition;
}) {
  if (props.username) {
    return (
      <a href={props.prefix + props.username}>
        <SocialIcon color={props.color} fillColor="#fff">
          <FontAwesomeIcon icon={props.icon} />
        </SocialIcon>
      </a>
    );
  } else {
    return null;
  }
}

const ContactInfo = (props: { school: SchoolData }) => {
  const { school } = props;
  const { city, state } = school;

  return (
    <ContentCard>
      <ContactInfoContainer>
        {city && (
          <ContactInfoRow>
            <InfoLabel>Campus:</InfoLabel>
            <InfoCol>
              <span>
                {city}, {state}
              </span>
            </InfoCol>
          </ContactInfoRow>
        )}
        {school.address && (
          <ContactInfoRow>
            <InfoLabel>Mailing Address:</InfoLabel>
            <InfoCol>
              <span>
                {school.address}, {city}, {state}, {school.zip}
              </span>
            </InfoCol>
          </ContactInfoRow>
        )}
        {school.admissions_website && (
          <ContactInfoRow>
            <InfoLabel>Contact Admissions:</InfoLabel>
            <InfoCol>
              <span>
                <a href={school.admissions_website}>
                  {school.admissions_website}
                </a>
              </span>
            </InfoCol>
          </ContactInfoRow>
        )}
        {school.website && (
          <ContactInfoRow>
            <InfoLabel>Website:</InfoLabel>
            <InfoCol>
              <span>
                <a href={school.website}>{school.website}</a>
              </span>
            </InfoCol>
          </ContactInfoRow>
        )}
        <ContactInfoRow>
          <InfoLabel>Social Media:</InfoLabel>
          <InfoCol>
            <SocialMediaIcon
              color="#3b5998"
              icon={faFacebookSquare}
              prefix="https://www.facebook.com/"
              username={school.facebook_id}
            />
            <SocialMediaIcon
              color="#38A1F3"
              icon={faTwitter}
              prefix="https://twitter.com/"
              username={school.twitter_username}
            />
            <SocialMediaIcon
              color="#405de6"
              icon={faInstagramSquare}
              prefix="https://www.instagram.com/"
              username={school.instagram_username}
            />
            <SocialMediaIcon
              color="#c4302b"
              prefix="https://youtube.com/channel/"
              username={school.youtube_channel}
              icon={faYoutubeSquare}
            />
          </InfoCol>
        </ContactInfoRow>
      </ContactInfoContainer>
    </ContentCard>
  );
};

export default ContactInfo;

import styled from "@emotion/styled";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faFacebookSquare,
  faLinkedinIn,
  faPinterestP,
  faTwitter
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
              <span>{school.admissions_website}</span>
            </InfoCol>
          </ContactInfoRow>
        )}
        {school.website && (
          <ContactInfoRow>
            <InfoLabel>Website:</InfoLabel>
            <InfoCol>
              <span>{school.website}</span>
            </InfoCol>
          </ContactInfoRow>
        )}
        <ContactInfoRow>
          <InfoLabel>Social Media:</InfoLabel>
          <InfoCol>
            <SocialIcon color="#3b5998" fillColor="#fff">
              <FontAwesomeIcon icon={faFacebookSquare} />
            </SocialIcon>
            <SocialIcon color="#38A1F3" fillColor="#fff">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialIcon>
            <SocialIcon color="#c8232c" fillColor="#fff">
              <FontAwesomeIcon icon={faPinterestP} />
            </SocialIcon>
            <SocialIcon color="#006192" fillColor="#fff">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </SocialIcon>
          </InfoCol>
        </ContactInfoRow>
      </ContactInfoContainer>
    </ContentCard>
  );
};

export default ContactInfo;

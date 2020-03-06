import styled from "@emotion/styled";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faFacebookSquare, faLinkedinIn, faPinterestP, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
config.autoAddCss = false;

const ContactInfoContainer = styled.div`
  margin-top: 10px;
`;

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

const ContactInfo = (props: any) => {
  const { school } = props;
  const { city, state } = school;

  return (
    <ContactInfoContainer>
      <ContactInfoRow>
        <InfoLabel>Campus:</InfoLabel>
        <InfoCol>
          <span>
            {city}, {state}
          </span>
        </InfoCol>
      </ContactInfoRow>
      <ContactInfoRow>
        <InfoLabel>Mailing Address:</InfoLabel>
        <InfoCol>
          <span>
            Street, {city}, {state}
          </span>
        </InfoCol>
      </ContactInfoRow>
      <ContactInfoRow>
        <InfoLabel>Contact Admissions:</InfoLabel>
        <InfoCol>
          <span>Admissions Email, Phone Number</span>
        </InfoCol>
      </ContactInfoRow>
      <ContactInfoRow>
        <InfoLabel>Website:</InfoLabel>
        <InfoCol>
          <span>school.edu</span>
        </InfoCol>
      </ContactInfoRow>
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
  );
};

export default ContactInfo;

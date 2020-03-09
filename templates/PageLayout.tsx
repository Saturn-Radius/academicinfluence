import styled from "@emotion/styled";

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    padding: 27px 80px;
  }

  @media (max-width: 991px) {
    padding: 20px 40px;
  }

  @media (max-width: 767px) {
    padding: 20px;
  }
`;

type PageLayoutProps = {
  children: React.ReactNode;
};
const PageLayout = (props: PageLayoutProps) => {
  return (
    <Wrapper>
      <InnerWrapper>{props.children}</InnerWrapper>
    </Wrapper>
  );
};

export default PageLayout;

interface SectionProps {
  label: string;
  children: React.ReactNode;
}

const FeatureArticles = (props: SectionProps) => {
  return (
    <div>
      <style jsx>
        {`
          .featureTitle {
            color: #1e988a;
            margin-top: 25px;
            margin-bottom: 32px;
          }
          @media (max-width: 600px) {
            .featureTitle {
              font-size: 20px;
            }
          }
        `}
      </style>
      <h1 className="featureTitle">{props.label}</h1>
      {props.children}
    </div>
  );
};

export default FeatureArticles;

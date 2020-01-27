import { NextPage, NextPageContext } from "next";
import { apiInfluencerPage, InfluencerData } from "../../api";

type InfluencerProps = {
    influencer: InfluencerData
    
};

const Influencer: NextPage<InfluencerProps> = (props: InfluencerProps) => (
  <div>
      <div>
          Name: {props.influencer.name}
      </div>
      <div>
          Description: {props.influencer.description}
      </div>
      
        <ol>

      {Object.entries(props.influencer.disciplines).map(([discipline, data]) => (<li key={discipline}>
            {discipline} {data.influence} #{data.world_rank} #{data.usa_rank} (USA)
       </li>))}

        </ol>
  </div>
);

Influencer.getInitialProps = async function(context: NextPageContext) {
  const data = await apiInfluencerPage({
      slug: context.query.slug as string
  })

  return {
      influencer: data.influencer
  };
};

export default Influencer;

import { EntityFullData } from "../schema";
import HtmlContent from "./HtmlContent";

export default function Description(props: { entity: EntityFullData }) {
  return (
    <>
      <HtmlContent html={props.entity.description} />
      <div>
        {props.entity.wikipedia_description && (
          <div style={{paddingTop:5}}>
            <b>Source:</b> Wikipedia
          </div>
        )}
      </div>
    </>
  );
}
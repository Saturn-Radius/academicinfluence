import _ from "lodash";
import { useCallback } from "react";
import Select from "react-select";
import { useBasicContext } from "../BasicContext";
import FilterLabel from "../schools/FilterLabel";
import { FilterProps } from "./types";

function Discipline<R extends { discipline: string | null }>(
  props: FilterProps<R>
) {
  const basicContext = useBasicContext();
  const onChange = useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        discipline: event.value
      });
    },
    [props.updateRequest, props.request]
  );

  let discipline = props.request.discipline;

  let supertopic: string | null;
  let subtopic: string | null;

  if (discipline === null || basicContext.discipline(discipline).level === 1) {
    supertopic = discipline;
    subtopic = null;
  } else {
    supertopic = basicContext.discipline(discipline).parent;
    subtopic = discipline;
  }

  const options = [
    {
      value: null,
      label: "Overall"
    },
    ...basicContext.disciplines
      .filter(item => item.level === 1)
      .map(item => ({
        value: item.slug,
        label: item.name
      }))
  ];

  const selected =
    _.find(options, option => option.value === supertopic) || options[0];

  const suboptions = [
    {
      value: null,
      label: "Overall"
    },
    ...basicContext.disciplines
      .filter(item => item.parent === supertopic)
      .map(item => ({
        value: item.slug,
        label: item.name
      }))
  ];

  const sub_selected =
    _.find(suboptions, option => option.value === subtopic) || suboptions[0];

  return (
    <>
      <FilterLabel label="Discipline">
        <Select
          instanceId="discipline-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
      <FilterLabel label="Subdiscipline">
        <Select
          instanceId="subdiscipline-filter"
          value={sub_selected}
          options={suboptions}
          onChange={onChange}
          isDisabled={supertopic === null}
        />
      </FilterLabel>
    </>
  );
}

export default Discipline;

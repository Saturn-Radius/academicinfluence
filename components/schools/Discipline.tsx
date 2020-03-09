import { useCallback } from "react";
import _ from "lodash";
import Select from "react-select";
import {
  InfluentialSchoolsPageRequest,
  DisciplinesResponse,
  CountriesResponse
} from "../../schema";
import { lookupDiscipline } from "../../disciplines";
import FilterLabel from "./FilterLabel";

type FilterProps = {
  request: InfluentialSchoolsPageRequest;
  disciplines: DisciplinesResponse;
  countries: CountriesResponse;
  updateRequest: (request: InfluentialSchoolsPageRequest) => void;
};

const Discipline = (props: FilterProps) => {
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

  if (
    discipline === null ||
    lookupDiscipline(props.disciplines, discipline).level === 1
  ) {
    supertopic = discipline;
    subtopic = null;
  } else {
    supertopic = lookupDiscipline(props.disciplines, discipline).parent;
    subtopic = discipline;
  }

  const options = [
    {
      value: null,
      label: "Overall"
    },
    ...props.disciplines
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
    ...props.disciplines
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
};

export default Discipline;

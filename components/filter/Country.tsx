import _ from "lodash";
import { useCallback } from "react";
import Select from "react-select";
import { useBasicContext } from "../BasicContext";
import FilterLabel from "../schools/FilterLabel";
import { FilterProps } from "./types";

function Country<R extends { country: string | null }>(props: FilterProps<R>) {
  const basicContext = useBasicContext();
  const onChange = useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        country: event.value
      });
    },
    [props.updateRequest, props.request]
  );

  let country = props.request.country;

  const options = [
    {
      value: null,
      label: "All"
    },
    ...basicContext.countries.map(item => ({
      value: item.name,
      label: item.name
    }))
  ];

  const selected =
    _.find(options, option => option.value === country) || options[0];

  return (
    <>
      <FilterLabel label="Country">
        <Select
          instanceId="country-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
    </>
  );
}

export default Country;

import _ from "lodash";
import { useCallback } from "react";
import Select from "react-select";
import FilterLabel from "./FilterLabel";
import { FilterProps } from "./types";

const Country = (props: FilterProps) => {
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
    ...props.countries.map(item => ({
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
};

export default Country;

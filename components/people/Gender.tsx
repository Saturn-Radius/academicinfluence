import _ from "lodash";
import { useCallback } from "react";
import Select from "react-select";
import FilterLabel from "../schools/FilterLabel";
import { FilterProps } from "./types";

export default function Gender(props: FilterProps) {
  const onChange = useCallback(
    event => {
      props.updateRequest({
        ...props.request,
        gender: event.value
      });
    },
    [props.updateRequest, props.request]
  );

  let gender = props.request.gender;

  const options = [
    {
      value: null,
      label: "All"
    },
    {
      value: true,
      label: "Male"
    },
    {
      value: false,
      label: "Female"
    }
  ];

  const selected =
    _.find(options, option => option.value === gender) || options[0];

  return (
    <>
      <FilterLabel label="Gender">
        <Select
          instanceId="gender-filter"
          value={selected}
          options={options}
          onChange={onChange}
        />
      </FilterLabel>
    </>
  );
}

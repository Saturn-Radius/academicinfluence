import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useCallback } from "react";
import FilterLabel from "./FilterLabel";
import RangeHandle from "./RangeHandle";
import { FilterProps } from "./types";

const YearsFilter = (props: FilterProps) => {
  const onChange = useCallback(
    n =>
      props.updateRequest({
        ...props.request,
        years: {
          min: n[0],
          max: n[1]
        }
      }),
    [props.request, props.updateRequest]
  );

  return (
    <FilterLabel label="Years">
      <Range
        value={[props.request.years.min, props.request.years.max]}
        min={-2000}
        max={2020}
        handle={RangeHandle.bind(null, {
          label: "Years",
          format: year => (year < 0 ? year + " BC" : year + " AD")
        })}
        onChange={onChange}
      />
    </FilterLabel>
  );
};

export default YearsFilter;

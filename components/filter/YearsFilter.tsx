import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { useCallback } from "react";
import { ERAS, formatYear } from "../../utils/years";
import FilterLabel from "../schools/FilterLabel";
import RangeHandle from "../schools/RangeHandle";
import { FilterProps } from "./types";

function YearsFilter<
  R extends {
    years: {
      min: number;
      max: number;
    };
  }
>(props: FilterProps<R> & { minYear: number }) {
  const onChange = useCallback(
    n =>
      props.updateRequest({
        ...props.request,
        years: {
          min: ERAS[n[0]],
          max: ERAS[n[1]]
        }
      }),
    [props.request, props.updateRequest]
  );

  return (
    <FilterLabel label="Years">
      <Range
        value={[
          ERAS.indexOf(props.request.years.min),
          ERAS.indexOf(props.request.years.max)
        ]}
        min={ERAS.indexOf(props.minYear)}
        max={ERAS.length - 1}
        handle={RangeHandle.bind(null, {
          label: "Years",
          format: year => formatYear(ERAS[year])
        })}
        onChange={onChange}
      />
    </FilterLabel>
  );
}

export default YearsFilter;

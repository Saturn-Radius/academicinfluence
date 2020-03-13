import { Handle, HandleProps } from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

type RangeHandleSliderProps = {
  label: string;
  format: (value: number) => string;
};

type RangeHandleProps = {
  value: number;
  dragging: boolean;
  index: number;
} & HandleProps;

const RangeHandle = (
  sliderProps: RangeHandleSliderProps,
  props: RangeHandleProps
) => {
  const { value, dragging, index, ...restProps } = props;

  let formatted = sliderProps.format(value);
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={formatted}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle
        {...restProps}
        aria-label={
          index == 0
            ? "Minimum " + sliderProps.label
            : "Maximum " + sliderProps.label
        }
        aria-valuetext={formatted}
      />
    </Tooltip>
  );
};

export default RangeHandle;

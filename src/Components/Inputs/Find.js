import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { colours, fullColours, comparisons } from "constants.js";
import { updateInput, updatePercentage, findModal } from "Actions/replaceActions";
import Options from "Components/Options";

const mapCompareToTitle = (compare, value, isPercentage, index) => {
  const colour = fullColours[index];
  const prefix = `Select only pixels that have a ${colour} value`;
  const suffix = isPercentage ? "% of the pixel's total value" : "";
  let middle;
  switch (compare) {
    case "=":
      middle = "that is within the tolerance range of";
      break;
    case ">":
      middle = "greater than";
      break;
    case ">=":
      middle = "greater than or equal to";
      break;
    case "<":
      middle = "less than";
      break;
    case "<=":
      middle = "less than or equal to";
      break;
    default:
      return "";
  }
  return `${prefix} ${middle} ${value}${suffix}`;
};

export default function Find(props) {
  const { index, isAlpha } = props;
  const compare = useSelector(state => state.replace.cc[index]);
  const value = useSelector(state => state.replace.fc[index]);
  const isPercentage = useSelector(state => state.replace.fp[index]);
  const modal = useSelector(state => state.replace.fModal[index]);
  const dispatch = useDispatch();

  let options = modal ? <Options options={comparisons} index={index} replace={false} /> : "";
  return (
    <span>
      <span style={{ position: "relative" }}>
        <button
          type="button"
          title={mapCompareToTitle(compare, value, isPercentage, index)}
          onClick={e => {
            e.stopPropagation();
            dispatch(findModal(index));
          }}
          className="findBtn"
        >
          {compare}
        </button>
        {options}
      </span>
      <input type="text" value={value} onChange={e => dispatch(updateInput(e, index))} name={"fc" + colours[index]} />
      {!isAlpha && (
        <button
          type="button"
          title="Indicate whether the search looks at the absolute or relative value"
          className="findBtn"
          onClick={() => dispatch(updatePercentage(index))}
        >
          {isPercentage ? "%" : "#"}
        </button>
      )}
    </span>
  );
}

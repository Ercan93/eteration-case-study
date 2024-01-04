import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SortFilter = ({ sortValues, label, name, checked, onChange }) => {
  const [generatedIdList, setGeneratedIdList] = useState([]);
  const generateId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  useEffect(() => {
    const idList = [];
    Object.keys(sortValues).forEach((key) => {
      idList.push(generateId());
    });
    setGeneratedIdList(idList);
  }, [sortValues]);

  return (
    <div className="sort-filter">
      <div className="sort-filter-header d-flex flex-wrap align-items-center justify-content-between">
        <p className="fs-6 text-gray mb-0 mt-3">{label}</p>
      </div>
      <div className="sort-filter-body bg-white rounded shadow-sm p-3">
        {Object.keys(sortValues).map((key, index) => (
          <div className="form-check py-1" key={key}>
            <input
              className="form-check-input"
              type="radio"
              name={"radio-" + name}
              id={generatedIdList[index]}
              value={key}
              onChange={onChange}
              checked={checked === key}
            />
            <label
              className="form-check-label"
              htmlFor={generatedIdList[index]}
            >
              {sortValues[key]}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

SortFilter.defaultProps = {
  sortValues: {},
  label: "",
  onChange: () => {},
};

SortFilter.propTypes = {
  sortValues: PropTypes.objectOf(PropTypes.string),
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default SortFilter;

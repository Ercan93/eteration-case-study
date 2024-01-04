import React from "react";
import PropTypes from "prop-types";

const SortFilter = ({ sortValues, label, checked, onChange }) => (
  <div className="sort-filter">
    <div className="sort-filter-header d-flex flex-wrap align-items-center justify-content-between">
      <p className="fs-6 text-gray mb-0">{label}</p>
    </div>
    <div className="sort-filter-body bg-white rounded shadow-sm mt-1 mb-3 p-3">
      {Object.keys(sortValues).map((key) => (
        <div className="form-check py-1" key={key}>
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id={key}
            value={key}
            onChange={onChange}
            checked={checked === key}
          />
          <label className="form-check-label" htmlFor={key}>
            {sortValues[key]}
          </label>
        </div>
      ))}
    </div>
  </div>
);

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

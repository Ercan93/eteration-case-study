import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const CheckboxFilter = ({ options, label, checked, onChange }) => {
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredOptions = options.filter((option) =>
      option.toLowerCase().startsWith(e.target.value.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <div className="checkbox-filter">
      <div className="checkbox-filter-header d-flex flex-wrap align-items-center justify-content-between">
        <p className="fs-6 text-gray mb-0 mt-3">{label}</p>
      </div>
      <div className="checkbox-filter-body bg-white rounded shadow-sm mt-1 p-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <div className="checkbox-filter-body-options px-2 mt-3">
          {filteredOptions?.map((option) => (
            <div className="form-check py-1" key={option}>
              <input
                className="form-check-input"
                type="checkbox"
                value={option}
                id={option}
                onChange={onChange}
                checked={checked.includes(option)}
              />
              <label className="form-check-label" htmlFor={option}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

CheckboxFilter.defaultProps = {
  options: [],
  label: "",
  onChange: () => {},
};

CheckboxFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default CheckboxFilter;

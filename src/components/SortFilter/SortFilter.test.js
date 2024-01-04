import { render, fireEvent, screen } from "@testing-library/react";
import SortFilter from "./SortFilter";

describe("SortFilter", () => {
  const sortValues = { 1: "Option 1", 2: "Option 2", 3: "Option 3" };
  const label = "Test Label";
  const checked = "1";
  const onChange = jest.fn();

  it("renders without crashing", () => {
    render(
      <SortFilter
        sortValues={sortValues}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
  });

  it("displays the correct label", () => {
    render(
      <SortFilter
        sortValues={sortValues}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("displays the correct options", () => {
    render(
      <SortFilter
        sortValues={sortValues}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    Object.values(sortValues).forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  it("checks the correct option", () => {
    render(
      <SortFilter
        sortValues={sortValues}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    expect(screen.getByLabelText(sortValues[checked])).toBeChecked();
  });

  it("calls onChange when an option is clicked", () => {
    render(
      <SortFilter
        sortValues={sortValues}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText(sortValues["2"]));
    expect(onChange).toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import CheckboxFilter from "./CheckboxFilter";

describe("CheckboxFilter", () => {
  const options = ["Option1", "Option2", "Option3"];
  const label = "Test Label";
  const checked = ["Option1"];
  const onChange = jest.fn();

  it("renders without crashing", () => {
    render(
      <CheckboxFilter
        options={options}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
  });

  it("displays the correct label", () => {
    render(
      <CheckboxFilter
        options={options}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("displays the correct options", () => {
    render(
      <CheckboxFilter
        options={options}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    options.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  it("checks the correct options", () => {
    render(
      <CheckboxFilter
        options={options}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    checked.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeChecked();
    });
  });

  it("calls onChange when an option is clicked", () => {
    render(
      <CheckboxFilter
        options={options}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText("Option2"));
    expect(onChange).toHaveBeenCalled();
  });

  it("filters options based on search", () => {
    render(
      <CheckboxFilter
        options={options}
        label={label}
        checked={checked}
        onChange={onChange}
      />
    );
    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "Option1" },
    });
    expect(screen.getByLabelText("Option1")).toBeInTheDocument();
    expect(screen.queryByLabelText("Option2")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Option3")).not.toBeInTheDocument();
  });
});

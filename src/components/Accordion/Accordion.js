import React, { useState } from "react";
import downIcon from "../../assets/static/down.svg";
import "./Accordion.css";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-wrapper border my-2 shadow-sm rounded">
      <div
        className={`accordion-title d-flex align-items-center justify-content-between py-2 px-3 fw-semibold ${
          isOpen ? "open" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="mb-0">{title}</p>
        <img src={downIcon} width="40" height="40" alt="down" className="accordion-icon" />
      </div>
      <div className={`accordion-content-wrapper ${isOpen ? "open" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;

import React from "react";
import { Radio } from "@material-ui/core";

const SingleQuestion = ({ id, question, selectedValue, setSelectedValue }) => {
  const handleChange = (event) => {
    setSelectedValue({ id, selectedValue: event.target.value });
  };
  return (
    <div>
      <h2>{question}</h2>

      <Radio
        checked={selectedValue === 0}
        onChange={handleChange}
        value="0"
        name="radio-button-demo"
        inputProps={{ "aria-label": "0" }}
        label="Top"
      />
      <Radio
        checked={selectedValue === 1}
        onChange={handleChange}
        value="1"
        name="radio-button-demo"
        inputProps={{ "aria-label": "1" }}
      />
      <Radio
        checked={selectedValue === 2}
        onChange={handleChange}
        value="2"
        name="radio-button-demo"
        inputProps={{ "aria-label": "2" }}
      />
      <Radio
        checked={selectedValue === 3}
        onChange={handleChange}
        value="3"
        name="radio-button-demo"
        inputProps={{ "aria-label": "3" }}
      />
      <Radio
        checked={selectedValue === 4}
        onChange={handleChange}
        value="4"
        name="radio-button-demo"
        inputProps={{ "aria-label": "4" }}
      />
    </div>
  );
};

export default SingleQuestion;

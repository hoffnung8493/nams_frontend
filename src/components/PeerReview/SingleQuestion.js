import React from "react";
import { FormControlLabel, Radio } from "@material-ui/core";

const SingleQuestion = ({ id, question, selectedValue, setSelectedValue }) => {
  const handleChange = (event) => {
    setSelectedValue({ id, selectedValue: event.target.value });
  };
  return (
    <div>
      <h2>{question}</h2>
      <FormControlLabel
        style={{ margin: 3 }}
        control={
          <Radio
            checked={selectedValue === 0}
            onChange={handleChange}
            value="0"
          />
        }
        label="1"
        labelPlacement="top"
      />
      <FormControlLabel
        style={{ margin: 3 }}
        control={
          <Radio
            checked={selectedValue === 1}
            onChange={handleChange}
            value="1"
          />
        }
        label="2"
        labelPlacement="top"
      />
      <FormControlLabel
        style={{ margin: 3 }}
        control={
          <Radio
            checked={selectedValue === 2}
            onChange={handleChange}
            value="2"
          />
        }
        label="3"
        labelPlacement="top"
      />
      <FormControlLabel
        style={{ margin: 3 }}
        control={
          <Radio
            checked={selectedValue === 3}
            onChange={handleChange}
            value="3"
          />
        }
        label="4"
        labelPlacement="top"
      />
      <FormControlLabel
        style={{ margin: 3 }}
        control={
          <Radio
            checked={selectedValue === 4}
            onChange={handleChange}
            value="4"
          />
        }
        label="5"
        labelPlacement="top"
      />
    </div>
  );
};

export default SingleQuestion;

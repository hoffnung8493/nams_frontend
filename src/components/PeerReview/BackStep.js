import React from "react";
import { Button } from "@material-ui/core";

const BackStep = ({ level, setLevel }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      style={{
        height: "60px",
        fontSize: "23px",
        letterSpacing: "30px",
        marginTop: "10px",
      }}
      onClick={() => setLevel(level - 1)}
    >
      이전
    </Button>
  );
};

export default BackStep;

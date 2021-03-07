import React from "react";
import { Button } from "@material-ui/core";

const NextStep = ({ nextReady, level, setLevel }) => {
  return (
    <Button
      variant="contained"
      fullWidth
      color="primary"
      style={{
        height: "60px",
        fontSize: "23px",
        letterSpacing: "30px",
        marginTop: "20px",
      }}
      onClick={() => setLevel(level + 1)}
      disabled={!nextReady}
    >
      다음
    </Button>
  );
};

export default NextStep;

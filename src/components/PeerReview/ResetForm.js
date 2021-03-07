import React, { useContext } from "react";
import produce from "immer";
import { MyFormContext } from "../../context/myForm";
import { Button } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
import { RESET_MY_FORM, ME } from "../../graphql";

const ResetForm = () => {
  const { setLevel, formInfos, setFormInfos } = useContext(MyFormContext);
  const { data } = useQuery(ME);
  const [mutate] = useMutation(RESET_MY_FORM);
  const resetForm = async () => {
    if (data?.me) await mutate();
    const newState = produce(formInfos, (draftState) => {
      draftState.myScore = 0;
      draftState.form = draftState.form.map((v) => {
        v.selectedValue = "";
        return v;
      });
    });
    setLevel(1);
    setFormInfos(newState);
  };
  return (
    <Button
      variant="contained"
      fullWidth
      color="primary"
      style={{
        height: "60px",
        fontSize: "23px",

        marginTop: "10px",
      }}
      onClick={resetForm}
    >
      자아성찰 다시하기
    </Button>
  );
};

export default ResetForm;

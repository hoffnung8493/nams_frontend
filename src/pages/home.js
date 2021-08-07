import React, { useContext } from "react";
import { Button, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { AppMenuContext } from "../context/AppMenu";

const Home = () => {
  const history = useHistory();
  const [open, setOpen] = useContext(AppMenuContext);
  return (
    <Container>
      <h1 className="text-2xl font-bold">
        사람멀미 처방전 - 직장인의 마음(心), 귀(耳), 입(口) 사용법
      </h1>
      <h2 className="mt-2 text-xl font-medium">저자: 남충희</h2>
      <div className="mt-4">
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => history.push("/myForm")}
        >
          지시 및 소통 역량 자기 평가
        </Button>
      </div>
      <div className="mt-4">
        <Button
          type="button"
          fullWidth
          variant="contained"
          onClick={() => setOpen(!open)}
        >
          독자 토론방
        </Button>
      </div>
    </Container>
  );
};

export default Home;

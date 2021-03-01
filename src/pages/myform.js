import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import SingleQuestion from "../components/PeerReview.js/SingleQuestion";
import produce from "immer";
import {
  Container,
  Button,
  Card,
  CardHeader,
  Snackbar,
} from "@material-ui/core";
import { ME } from "../graphql";
import { MyFormContext } from "../context/myForm";
import { useHistory } from "react-router-dom";

const MyForm = () => {
  const [open, setOpen] = useState(false);
  const [
    formInfos,
    setFormInfos,
    useMyFormMutate,
    level,
    setLevel,
  ] = useContext(MyFormContext);
  const [mutate] = useMyFormMutate;
  const { data } = useQuery(ME, {
    onError: (err) => console.error({ err }),
  });
  const setSelectedValue = ({ id, selectedValue }) => {
    const newState = produce(formInfos, (draftState) => {
      draftState.form[id - 1].selectedValue = parseInt(selectedValue);
    });
    setFormInfos(newState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [level]);

  let currentFormInfos = formInfos.form.filter((v) => v.id <= 8);
  let header = "업무방향 제시";
  if (level === 2) {
    currentFormInfos = formInfos.form.filter((v) => 9 <= v.id && v.id <= 13);
    header = "의미전달";
  } else if (level === 3) {
    currentFormInfos = formInfos.form.filter((v) => 14 <= v.id && v.id <= 18);
    header = "공감표현";
  } else if (level === 4) {
    currentFormInfos = formInfos.form.filter((v) => 19 <= v.id && v.id <= 25);
    header = "소통능력";
  } else header = "가지평가 점수";
  let nextReady =
    currentFormInfos.filter((v) => v.selectedValue === "").length === 0;
  const myScore =
    formInfos.myScore > 0
      ? formInfos.myScore
      : formInfos.form.reduce((a, c) => a + c.selectedValue, 0);
  const scoreColor =
    myScore > 90
      ? "blue"
      : myScore > 75
      ? "green"
      : myScore > 60
      ? "orange"
      : "red";
  const history = useHistory();
  const resetForm = () => {
    setLevel(1);
    const newState = produce(formInfos, (draftState) => {
      draftState.form = draftState.form.map((v) => {
        v.selectedValue = "";
        return v;
      });
    });
    setFormInfos(newState);
  };
  const askPeers = () => {
    const newState = produce(formInfos, (draftState) => {
      draftState.formSubmitted = true;
    });
    setFormInfos(newState);
    if (!data?.me) history.push("/signin");
    else {
    }
  };
  const checkScore = () => {
    setLevel(level + 1);
    const newState = produce(formInfos, (draft) => {
      draft.myScore = myScore;
      draft.formJustSubmitted = true;
    });
    setFormInfos(newState);
    if (data?.me) mutate();
  };
  const copyUrl = () => {
    setOpen(true);
    navigator.clipboard.writeText(
      `부하들의 인식 설문

여러분의 진솔한 응답은 이 설문을 부탁한 사람의 ‘지시 및 소통 역량’ 향상에 큰 도움이 됩니다. 
http://book.nam21/com/peer-review/${data.me.id} `
    );
  };
  return (
    <Container style={{ marginBottom: 30 }}>
      {level === 1 && (
        <>
          <h1>자아 성찰 설문</h1>
          <p style={{ marginBottom: "45px" }}>
            아래는 여러분의 지시 및 기타 소통 역량을 스스로 평가하기 위한
            설문입니다. 아래 각 문항에서 여러분이 생각하는 가장 적절한 답을
            하나만 고르기 바랍니다.
          </p>
        </>
      )}

      <h2
        style={{ textAlign: "center", marginBottom: "45px", fontSize: "25px" }}
      >
        {header}
      </h2>
      {level < 5 &&
        currentFormInfos.map((v) => (
          <SingleQuestion
            key={v.id}
            {...v}
            setSelectedValue={setSelectedValue}
          />
        ))}
      {level === 5 && (
        <Container>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "45px",
              color: scoreColor,
            }}
          >
            <span style={{ fontSize: "60px" }}>{myScore}</span>점
          </h1>
        </Container>
      )}
      {level < 4 && (
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
      )}
      {level === 4 && (
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          style={{
            height: "60px",
            fontSize: "23px",
            letterSpacing: "15px",
            marginTop: "20px",
          }}
          onClick={checkScore}
          disabled={!nextReady}
        >
          점수확인
        </Button>
      )}
      {level === 5 && formInfos.formSubmitted && data?.me && (
        <>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={1500}
            onClose={() => {
              setOpen(false);
            }}
            message="클립보드에 복사되었습니다"
          />
          <Card style={{ padding: 20 }} onClick={copyUrl}>
            <CardHeader
              title="부하들의 인식 설문"
              action={
                <div
                  style={{
                    backgroundColor: "grey",
                    color: "white",
                    padding: 5,
                    borderRadius: 5,
                  }}
                >
                  COPY
                </div>
              }
            />
            여러분의 진솔한 응답은 이 설문을 부탁한 사람의 ‘지시 및 소통 역량’
            향상에 큰 도움이 될 것입니다.
            <br />
            http://book.nam21/com/peer-review/
          </Card>
          <p style={{ fontSize: "16px", marginLeft: 5 }}>
            * 부하직원들이 있는 카톡방에 공유해보세요 :)
          </p>
        </>
      )}
      {level === 5 && !formInfos.formSubmitted && (
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          style={{
            height: "60px",
            fontSize: "23px",

            marginTop: "20px",
          }}
          onClick={askPeers}
        >
          부하직원들의 생각은?
        </Button>
      )}
      {level === 5 && (
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
      )}
      {level > 1 && level < 5 && (
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
      )}
    </Container>
  );
};

export default MyForm;

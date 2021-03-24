import React, { useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";
import SingleQuestion from "../components/PeerReview/SingleQuestion";
import produce from "immer";
import { Container, Button } from "@material-ui/core";
import { ME } from "../graphql";
import { MyFormContext } from "../context/myForm";
import { useHistory } from "react-router-dom";
import ShareLink from "../components/PeerReview/ShareLink";
import MyScore from "../components/PeerReview/MyScore";
import ResetForm from "../components/PeerReview/ResetForm";
import NextStep from "../components/PeerReview/NextStep";
import BackStep from "../components/PeerReview/BackStep";

const MyForm = () => {
  const {
    formInfos,
    setFormInfos,
    useMyFormMutate,
    level,
    setLevel,
    currentFormInfos,
    header,
  } = useContext(MyFormContext);
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

  let nextReady =
    currentFormInfos.filter((v) => v.selectedValue === "").length === 0;

  const history = useHistory();

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
    const myScore =
      formInfos.myScore > 0
        ? formInfos.myScore
        : formInfos.form.reduce((a, c) => a + c.selectedValue, 0);
    const newState = produce(formInfos, (draft) => {
      draft.myScore = myScore;
      draft.formJustSubmitted = true;
    });
    setFormInfos(newState);
    if (data?.me) mutate();
  };

  return (
    <Container style={{ marginBottom: 30 }}>
      {level === 1 && (
        <>
          <h1>지시 및 소통 역량 자기 평가</h1>
          <p style={{ marginBottom: "45px" }}>
            아래는 여러분의 지시 및 기타 소통 역량을 스스로 평가하기 위한
            설문입니다. 아래 각 문항에서 여러분이 생각하는 가장 적절한 답을
            하나만 고르기 바랍니다.
          </p>
          <p style={{ fontWeight: 700 }}>
            <span className="numberCircle">1</span> 전혀 아니다,{" "}
            <span className="numberCircle">2</span> 아니다,{" "}
            <span className="numberCircle">3</span> 평균적,{" "}
            <span className="numberCircle">4</span> 그렇다,{" "}
            <span className="numberCircle">5</span> 매우 그렇다. (높은
            숫자일수록 더욱 긍정적인 답변임)
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
      {level < 4 && (
        <NextStep nextReady={nextReady} level={level} setLevel={setLevel} />
      )}
      {level === 5 && <MyScore />}

      {level === 4 && (
        <>
          <p>
            수고하셨습니다. 아래 ‘제출’을 누르면, 자기 평가 결과가 나옵니다.
          </p>
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
            제출
          </Button>
        </>
      )}
      {level === 5 && formInfos.formSubmitted && data?.me && (
        <ShareLink me={data.me} />
      )}
      {level === 5 && !formInfos.formSubmitted && (
        <div>
          <p style={{ fontSize: "15px" }}>
            이제 여러분의 ‘지시 및 소통 역량’에 관한 부하들의 인식을 파악하려면,
            아래 ‘부하직원용 설문조사’를 누르십시오.
          </p>
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
            부하직원용 설문조사
          </Button>
        </div>
      )}
      {level === 5 && <ResetForm />}
      {level > 1 && level < 5 && <BackStep level={level} setLevel={setLevel} />}
    </Container>
  );
};

export default MyForm;

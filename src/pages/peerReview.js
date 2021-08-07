import React, { useContext, useEffect, useState } from "react";
import { PeerFormContext } from "../context/peerForm";
import { Container, Button, Snackbar } from "@material-ui/core";
import SingleQuestion from "../components/PeerReview/SingleQuestion";
import NextStep from "../components/PeerReview/NextStep";
import BackStep from "../components/PeerReview/BackStep";
import produce from "immer";
import { useHistory } from "react-router-dom";

const PeerReviewPage = ({
  match: {
    params: { userId },
  },
}) => {
  const {
    formInfos,
    setFormInfos,
    usePeerFormMutate,
    level,
    setLevel,
    currentFormInfos,
    header,
    setPeerId,
  } = useContext(PeerFormContext);
  const [mutate] = usePeerFormMutate;
  const history = useHistory();

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setPeerId(userId);
  }, [userId, setPeerId]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [level]);

  let nextReady =
    currentFormInfos.filter((v) => v.selectedValue === "").length === 0;

  const setSelectedValue = ({ id, selectedValue }) => {
    const newState = produce(formInfos, (draftState) => {
      draftState.form[id - 1].selectedValue = parseInt(selectedValue);
    });
    setFormInfos(newState);
  };

  const checkScore = () => {
    setOpen(true);
    const myScore =
      formInfos.myScore > 0
        ? formInfos.myScore
        : formInfos.form.reduce((a, c) => a + c.selectedValue, 0);
    const newState = produce(formInfos, (draft) => {
      draft.myScore = myScore;
      draft.formJustSubmitted = true;
    });
    setFormInfos(newState);
    mutate();
    setTimeout(() => {
      setLevel(level + 1);
      history.push("/");
    }, 2000);
  };

  return (
    <Container style={{ marginBottom: 30 }}>
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
        message="감사합니다. 상사 평가가 완료되었습니다."
      />
      {level === 1 && (
        <>
          <h1 className="text-2xl font-bold mb-2">
            상사의 '지식 및 소통 능력'에 관한 인식 조사
          </h1>
          <p>
            여러분의 진솔한 응답은 이 설문을 부탁한 사람의 ‘지시 및 소통 역량’
            향상에 큰 도움이 될 것입니다. <br />
            (1) 익명 설문 조사입니다.
            <br />
            (2) 총 25개의 문항입니다.
            <br />
            (3) 지금부터 24시간 내에 답해 주시면 감사하겠습니다.
            <br />
            (4) 다섯 명 이상이 응답해야만 결과가 계산됩니다.
            <br />
            (5) 결과는 1~25번 문항별로 응답자들의 평균값만 나타납니다.
            <br />
            (6) 아래 각 문항에서 여러분이 생각하는 가장 적절한 답을 하나만 골라
            주십시오.
            <br />
            (7) 아래에서 ‘상사’란 이 설문을 부탁한 사람입니다.
          </p>
          <div className="text-gray-500 mt-3 p-3 text-xs">
            <div className="mb-2">
              <span className="px-1 border-2 border-gray-500 rounded-full mr-1">
                1
              </span>
              전혀 아니다
              <span className="px-1 border-2 border-gray-500 rounded-full mr-1 ml-2">
                2
              </span>
              아니다
              <span className="px-1 border-2 border-gray-500 rounded-full mr-1 ml-2">
                3
              </span>
              평균적
            </div>
            <div className="mb-2">
              <span className="px-1 border-2 border-gray-500 rounded-full mr-1">
                4
              </span>
              그렇다
              <span className="px-1 border-2 border-gray-500 rounded-full mr-1 ml-2">
                5
              </span>
            </div>
            <div>매우 그렇다. (높은 숫자일수록 더욱 긍정적인 답변임)</div>
          </div>
        </>
      )}
      <h2 className="text-2xl font-bold mb-2 mt-5">{header}</h2>

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
      {level === 4 && (
        <>
          <p>수고하셨습니다. 아래 ‘제출’을 눌러주십시오. 대단히 감사합니다.</p>
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
            제출하기
          </Button>
        </>
      )}
      {level > 1 && level < 5 && <BackStep level={level} setLevel={setLevel} />}
    </Container>
  );
};

export default PeerReviewPage;

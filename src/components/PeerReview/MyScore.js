import React, { useContext } from "react";
import { Container } from "@material-ui/core";
import { MyFormContext } from "../../context/myForm";
import { useQuery } from "@apollo/client";
import { ME } from "../../graphql";
import ChartGroup from "./ChartGroup";

const MyScore = () => {
  const {
    formInfos: { myScore },
  } = useContext(MyFormContext);
  const { data } = useQuery(ME);

  const scoreColor = (score) =>
    score > 90 ? "blue" : score > 75 ? "green" : score > 60 ? "orange" : "red";
  return (
    <Container style={{ marginBottom: "45px" }}>
      {data?.me?.peerReviewCount >= 5 ? (
        <>
          <h2
            style={{
              textAlign: "center",
              margin: 0,
              padding: 0,
              color: scoreColor(data.me.averageScore),
              fontSize: "19px",
            }}
          >
            귀하는 상위{" "}
            <span style={{ fontSize: "35px" }}>
              {data.me.peerScoreTopPercent}
            </span>
            %입니다.
          </h2>
          <p style={{ textAlign: "center", margin: 0 }}>* 부하 평가 기준</p>
          <p
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "15px",
              marginTop: "20px",
            }}
          >
            귀하의 자기평가 점수는 {myScore}점이고
            <br />
            부하들의 평가 총점 평균은 {data.me.averageScore}점입니다.
            <br />총 {data.me.peerReviewCount}명의 부하직원들이 설문에
            응답했습니다.
            <br />
            항목별 비교는 다음 표와 같습니다.
          </p>

          <ChartGroup me={data.me} />
        </>
      ) : (
        <>
          <h2
            style={{
              textAlign: "center",
              margin: 0,
              padding: 0,
              color: scoreColor(myScore),
            }}
          >
            귀하는 상위{" "}
            <span style={{ fontSize: "35px" }}>
              {data.me.myScoreTopPercent}
            </span>
            %입니다.
          </h2>
          <p style={{ textAlign: "center", margin: 0 }}>* 자가 평가 기준</p>
          <p
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontSize: "15px",
              marginTop: "20px",
            }}
          >
            귀하의 자기평가 점수는 {myScore}점입니다.
            <br />
            {data.me.peerReviewCount}명의 부하직원들이 설문에 응답했습니다.
          </p>
        </>
      )}
    </Container>
  );
};

export default MyScore;

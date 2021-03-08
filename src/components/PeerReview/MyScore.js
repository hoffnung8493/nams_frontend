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
      <h2
        style={{
          textAlign: "center",
          margin: 0,
          padding: 0,
          color: scoreColor(myScore),
        }}
      >
        자가평가 <span style={{ fontSize: "45px" }}>{myScore}</span>점
      </h2>
      {data?.me?.peerReviewCount >= 5 && (
        <>
          <h2
            style={{
              textAlign: "center",
              margin: 0,
              padding: 0,
              color: scoreColor(data.me.averageScore),
            }}
          >
            부하평가{" "}
            <span style={{ fontSize: "45px" }}>{data.me.averageScore}</span>점
          </h2>
          <ChartGroup me={data.me} />
        </>
      )}
      {data?.me?.peerReviewCount && (
        <p
          style={{
            textAlign: "center",
            fontWeight: 600,
            fontSize: "15px",
            marginTop: 0,
          }}
        >
          {data.me.peerReviewCount}명의 부하직원들이 설문에 응답했습니다.
        </p>
      )}
    </Container>
  );
};

export default MyScore;

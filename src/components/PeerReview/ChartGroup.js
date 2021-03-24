import React from "react";
import BarChart from "./Barchart";

const ChartGroup = ({ me }) => {
  const data = [
    {
      title: "업무방향 제시 (32점 만점)",
      maxScore: 32,
      myScore: 0,
      averageScore: 0,
      onClick: () => console.log("cc"),
    },
    {
      title: "의미전달 (20점 만점)",
      maxScore: 20,
      myScore: 0,
      averageScore: 0,
      onClick: () => console.log("cc"),
    },
    {
      title: "공감표현 (20점 만점)",
      maxScore: 20,
      myScore: 0,
      averageScore: 0,
      onClick: () => console.log("cc"),
    },
    {
      title: "소통능력 (28점 만점)",
      maxScore: 28,
      myScore: 0,
      averageScore: 0,
      onClick: () => console.log("cc"),
    },
  ];

  for (let i = 0; i < me.formResult.length; i++) {
    if (i <= 7) data[0].myScore += me.formResult[i];
    else if (i <= 12) data[1].myScore += me.formResult[i];
    else if (i <= 17) data[2].myScore += me.formResult[i];
    else data[3].myScore += me.formResult[i];
  }

  for (let i = 0; i < me.peerReviews.length; i++) {
    for (let j = 0; j < 25; j++) {
      if (j <= 7) data[0].averageScore += me.peerReviews[i].formResult[j];
      else if (j <= 12) data[1].averageScore += me.peerReviews[i].formResult[j];
      else if (j <= 17) data[2].averageScore += me.peerReviews[i].formResult[j];
      else data[3].averageScore += me.peerReviews[i].formResult[j];
    }
  }
  if (me.peerReviews.length < 5) return <></>;

  const barCharts = data.map((v) => (
    <BarChart
      key={v.title}
      onClick={v.onClick}
      title={v.title}
      myScore={v.myScore}
      averageScore={v.averageScore / me.peerReviews.length}
      maxScore={v.maxScore}
    />
  ));
  return <>{barCharts}</>;
};

export default ChartGroup;

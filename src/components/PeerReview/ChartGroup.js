import React, { useState, useMemo } from "react";
import BarChart from "./Barchart";
import BarChartDetail from "./BarChartDetail";

const ChartGroup = ({ me }) => {
  const [section, setSection] = useState(0);
  const chartData = useMemo(() => {
    const data = [
      {
        title: "업무방향 제시 (32점 만점)",
        maxScore: 32,
        myScore: 0,
        averageScore: 0,
        onClick: () => setSection(1),
      },
      {
        title: "의미전달 (20점 만점)",
        maxScore: 20,
        myScore: 0,
        averageScore: 0,
        onClick: () => setSection(2),
      },
      {
        title: "공감표현 (20점 만점)",
        maxScore: 20,
        myScore: 0,
        averageScore: 0,
        onClick: () => setSection(3),
      },
      {
        title: "소통능력 (28점 만점)",
        maxScore: 28,
        myScore: 0,
        averageScore: 0,
        onClick: () => setSection(4),
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
        else if (j <= 12)
          data[1].averageScore += me.peerReviews[i].formResult[j];
        else if (j <= 17)
          data[2].averageScore += me.peerReviews[i].formResult[j];
        else data[3].averageScore += me.peerReviews[i].formResult[j];
      }
    }
    return data;
  }, [me]);
  const title =
    section === 1
      ? "업무방향 제시 (32점 만점)"
      : section === 2
      ? "의미전달 (20점 만점)"
      : section === 3
      ? "공감표현 (20점 만점)"
      : "소통능력";

  const detailData = useMemo(() => {
    const data = [
      {
        label: "1. 목적 등의 정확성",
        peer: 0,
        self: 0,
      },
      {
        label: "2. 방법 등의 정확성",
        peer: 0,
        self: 0,
      },
      {
        label: "3. 문제 극복 방안의 정확성",
        peer: 0,
        self: 0,
      },
      {
        label: "4. 피드백의 명확성",
        peer: 0,
        self: 0,
      },
      {
        label: "5. 표현의 명확성",
        peer: 0,
        self: 0,
      },
      {
        label: "6. 지시 및 피드백의 적시성",
        peer: 0,
        self: 0,
      },
      {
        label: "7. 제공 자원의 가용성",
        peer: 0,
        self: 0,
      },
      {
        label: "8. 보상의 공정성",
        peer: 0,
        self: 0,
      },

      {
        label: "9. 업무의 가치 제시",
        peer: 0,
        self: 0,
      },
      {
        label: "10. 바람직한 가치관 제시",
        peer: 0,
        self: 0,
      },
      {
        label: "11. 비전과 전략 제시",
        peer: 0,
        self: 0,
      },
      {
        label: "12. 환경과 경쟁 분석 제시",
        peer: 0,
        self: 0,
      },
      {
        label: "13. 내부 역량 정보 제시",
        peer: 0,
        self: 0,
      },
      {
        label: "14. 애정, 관심: 복리후생 및 육성",
        peer: 0,
        self: 0,
      },
      {
        label: "15. 애정, 관심: 효과적 면담 실시",
        peer: 0,
        self: 0,
      },
      {
        label: "16. 인지 노력",
        peer: 0,
        self: 0,
      },
      {
        label: "17. 복구 및 해결 노력",
        peer: 0,
        self: 0,
      },
      {
        label: "18. 인정감 부여 노력",
        peer: 0,
        self: 0,
      },
      {
        label: "19. 부하의 인격 존중 정도",
        peer: 0,
        self: 0,
      },
      {
        label: "20. 진솔성",
        peer: 0,
        self: 0,
      },
      {
        label: "21. 접근성",
        peer: 0,
        self: 0,
      },
      {
        label: "22. 부하의 의견 개진 자유 정도",
        peer: 0,
        self: 0,
      },
      {
        label: "23. 질문 능력",
        peer: 0,
        self: 0,
      },
      {
        label: "24. 경청 능력",
        peer: 0,
        self: 0,
      },
      {
        label: "25. 부하의 소통 만족도",
        peer: 0,
        self: 0,
      },
    ];

    for (let i = 0; i < me.formResult.length; i++) {
      data[i].self = me.formResult[i];
    }

    for (let i = 0; i < me.peerReviews.length; i++) {
      for (let j = 0; j < 25; j++) {
        data[j].peer += me.peerReviews[i].formResult[j];
      }
    }
    for (let j = 0; j < 25; j++)
      data[j].peer = data[j].peer / me.peerReviews.length;
    return data;
  }, [me]);
  if (me.peerReviews.length < 5) return <></>;

  const barCharts = chartData.map((v) => (
    <BarChart
      key={v.title}
      onClick={v.onClick}
      title={v.title}
      myScore={v.myScore}
      averageScore={v.averageScore / me.peerReviews.length}
      maxScore={v.maxScore}
    />
  ));
  const sectionData = detailData.slice(
    section === 1 ? 0 : section === 2 ? 8 : section === 3 ? 13 : 18,
    section === 1 ? 8 : section === 2 ? 13 : section === 3 ? 18 : 25
  );
  return (
    <div>
      {section === 0 && barCharts}
      {section > 0 && (
        <div onClick={() => setSection(0)}>
          <BarChartDetail title={title} data={sectionData} />
        </div>
      )}
    </div>
  );
};

export default ChartGroup;

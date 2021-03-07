import React, { useState, createContext } from "react";
import { useMutation } from "@apollo/client";
import { DO_PEER_FORM } from "../graphql";

export const PeerFormContext = createContext();

export const PeerFormProvider = (props) => {
  const [level, setLevel] = useState(1);
  const [peerId, setPeerId] = useState();
  const [formInfos, setFormInfos] = useState({
    form: [
      {
        id: 1,
        question:
          "상사는 내가 수행할 업무의 목적, 목표 그리고 우선순위를 정확히 제시해준다.",
        selectedValue: "",
      },
      {
        id: 2,
        question:
          "상사는 내가 수행할 업무의 바람직한 업무 추진 방법과 과정을 정확히 가르쳐준다.",
        selectedValue: "",
      },
      {
        id: 3,
        question: "상사는 나에게 예상되는 문제점 및 극복 방법을 잘 가르쳐준다.",
        selectedValue: "",
      },
      {
        id: 4,
        question:
          "상사는 내가 수행한 업무에 관해 구체적인 피드백을 제공해 준다.",
        selectedValue: "",
      },
      {
        id: 5,
        question:
          "상사는 문장력과 표현력이 좋기에 지시의 핵심이 이해하기 쉽고 명확하다.",
        selectedValue: "",
      },
      {
        id: 6,
        question:
          "상사는 적시에 지시하고 각종 보고에 대해 적시에 피드백을 준다.",
        selectedValue: "",
      },
      {
        id: 7,
        question:
          "상사는 나에게 가용한 인적 ∙ 물적 자원 및 권한을 제대로 알려준다.",
        selectedValue: "",
      },
      {
        id: 8,
        question: "상사는 나의 업무 성과에 대한 보상을 공정하고 정확하게 한다.",
        selectedValue: "",
      },
      {
        id: 9,
        question: "상사는 나에게 맡은 업무의 중요성과 가치를 늘 강조한다.",
        selectedValue: "",
      },
      {
        id: 10,
        question:
          "상사는 나에게 어떠한 가치관과 행동이 바람직한지 필요할 때마다 이해시킨다. ",
        selectedValue: "",
      },
      {
        id: 11,
        question:
          "상사는 나에게 조직의 비전과 중장기 전략에 관해 늘 말해준다. ",
        selectedValue: "",
      },
      {
        id: 12,
        question:
          "상사는 나에게 미래 경영환경 및 경쟁의 변화에 관한 정보를 자주 전달한다.",
        selectedValue: "",
      },
      {
        id: 13,
        question:
          "상사는 나에게 조직 내부의 중요한 변화에 관한 정보를 자주 제공한다.",
        selectedValue: "",
      },
      {
        id: 14,
        question:
          "상사는 나의 복리후생과 교육/육성/경력 개발에 관심을 쏟고 있다.",
        selectedValue: "",
      },
      {
        id: 15,
        question: "상사는 나와 개인적으로 효과적인 면담을 자주 한다.",
        selectedValue: "",
      },
      {
        id: 16,
        question:
          "상사는 나의 업무상 어려움 및 개인적 감정 상태를 민감하게 잘 인식한다.",
        selectedValue: "",
      },
      {
        id: 17,
        question:
          "상사는 나의 업무상 어려움과 부정적인 감정 상태를 해결하기 위해 노력하는 편이다.",
        selectedValue: "",
      },
      {
        id: 18,
        question: "상사는 나를 늘 칭찬하고 격려하는 편이다.",
        selectedValue: "",
      },
      {
        id: 19,
        question:
          "상사는 나에게 적절한 예절을 갖춘다. 즉 함부로 대하지 않는다.",
        selectedValue: "",
      },
      {
        id: 20,
        question: "상사는 나에게 솔직하다. 따라서 나는 상사를 신뢰한다.",
        selectedValue: "",
      },
      {
        id: 21,
        question:
          "설령 일이 잘못되었을 때에도 나는 상사에게 편하게 말할 수 있다.",
        selectedValue: "",
      },
      {
        id: 22,
        question:
          "나는 상사의 의견에 자유롭게 동의하지 않거나 심지어 반대할 수도 있다.",
        selectedValue: "",
      },
      {
        id: 23,
        question:
          "상사와 소통할 때 상사는 질문을 잘 한다. 내가 스스로 생각할 수 있도록	유도한다.",
        selectedValue: "",
      },
      {
        id: 24,
        question:
          "보고, 면담 그리고 기타 대화 중, 상사는 나의 말을 주로 경청하는 편이다.",
        selectedValue: "",
      },
      {
        id: 25,
        question: "나와 상사의 관계는 만족스럽다.",
        selectedValue: "",
      },
    ],
  });
  let currentFormInfos = [];
  let header = "";
  switch (level) {
    case 1:
      currentFormInfos = formInfos.form.filter((v) => v.id <= 8);
      header = "업무방향 제시";
      break;
    case 2:
      currentFormInfos = formInfos.form.filter((v) => 9 <= v.id && v.id <= 13);
      header = "의미전달";
      break;
    case 3:
      currentFormInfos = formInfos.form.filter((v) => 14 <= v.id && v.id <= 18);
      header = "공감표현";
      break;
    case 4:
      currentFormInfos = formInfos.form.filter((v) => 19 <= v.id && v.id <= 25);
      header = "소통능력";
      break;
    case 5:
      header = "상사 평가 완료";
      break;
    default:
      currentFormInfos = [];
      header = "";
  }

  const usePeerFormMutate = useMutation(DO_PEER_FORM, {
    variables: {
      formResult: formInfos.form.map((v) => v.selectedValue),
      peerId,
    },
  });

  return (
    <PeerFormContext.Provider
      value={{
        formInfos,
        setFormInfos,
        usePeerFormMutate,
        level,
        setLevel,
        currentFormInfos,
        header,
        setPeerId,
      }}
    >
      {props.children}
    </PeerFormContext.Provider>
  );
};

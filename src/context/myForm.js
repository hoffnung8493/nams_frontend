import React, { useState, createContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ME, DO_MY_FORM } from "../graphql";
import produce from "immer";

export const MyFormContext = createContext();

export const MyFormProvider = (props) => {
  const { data } = useQuery(ME);
  const [level, setLevel] = useState(1);
  const [formInfos, setFormInfos] = useState({
    formJustSubmitted: false,
    formSubmitted: false,
    myScore: 0,
    form: [
      {
        id: 1,
        question:
          "나는 부하에게 업무의 목적, 목표 그리고 우선순위를 정확히 제시한다.",
        selectedValue: "",
      },
      {
        id: 2,
        question:
          "나는 부하에게 바람직한 업무추진 방법 및 과정을 정확히 가르쳐준다.",
        selectedValue: "",
      },
      {
        id: 3,
        question: "나는 부하에게 예상되는 문제점 및 극복 방안을 잘 가르쳐준다.",
        selectedValue: "",
      },
      {
        id: 4,
        question:
          "나는 부하가 수행한 업무에 관해 구체적인 피드백을 제공해 준다.",
        selectedValue: "",
      },
      {
        id: 5,
        question:
          "나는 문장력과 표현력이 좋기에 부하에게 주는 지시의 핵심이 이해하기 쉽고 명확하다.",
        selectedValue: "",
      },
      {
        id: 6,
        question: "나는 적시에 지시하고 각종 보고에 대해 적시에 피드백을 준다.",
        selectedValue: "",
      },
      {
        id: 7,
        question:
          "나는 부하에게 가용한 인적 물적 ∙ 자원 및 권한을 제대로 알려준다.",
        selectedValue: "",
      },
      {
        id: 8,
        question: "나는 부하의 업무 성과에 대한 보상을 공정하고 정확하게 한다.",
        selectedValue: "",
      },
      {
        id: 9,
        question: "나는 부하에게 맡은 업무의 중요성과 가치를 늘 강조한다.",
        selectedValue: "",
      },
      {
        id: 10,
        question:
          "나는 부하에게 어떠한 가치관과 행동이 바람직한지 필요할 때마다 이해시킨다.",
        selectedValue: "",
      },
      {
        id: 11,
        question: "나는 부하에게 조직의 비전과 중장기 전략에 관해 늘 말해준다.",
        selectedValue: "",
      },
      {
        id: 12,
        question:
          "나는 부하에게 미래 경영환경 및 경쟁의 변화에 관한 정보를 자주 전달한다.",
        selectedValue: "",
      },
      {
        id: 13,
        question:
          "나는 부하에게 조직 내부의 중요한 변화에 관한 정보를 자주 제공한다.",
        selectedValue: "",
      },
      {
        id: 14,
        question:
          "나는 부하들 각 개인의 복리후생과 교육/육성/경력 개발에 관심을 쏟고 있다.",
        selectedValue: "",
      },
      {
        id: 15,
        question: "나는 부하들과 개개인과 효과적인 면담을 자주 한다.",
        selectedValue: "",
      },
      {
        id: 16,
        question:
          "나는 부하의 업무상 어려움 및 개인적 감정 상태를 민감하게 잘 인식한다.",
        selectedValue: "",
      },
      {
        id: 17,
        question:
          "나는 부하의 업무상 어려움과 부정적인 감정 상태를 해결하기 위해 노력하는 편이다.",
        selectedValue: "",
      },
      {
        id: 18,
        question: "나는 부하를 늘 칭찬하고 격려하는 편이다.",
        selectedValue: "",
      },
      {
        id: 19,
        question:
          "나는 부하에게 적절한 예절을 갖춘다. 즉 함부로 대하지 않는다.",
        selectedValue: "",
      },
      {
        id: 20,
        question:
          "나는 부하에게 솔직하다. 따라서 나는 부하에게 신뢰를 받고 있다.",
        selectedValue: "",
      },
      {
        id: 21,
        question:
          "설령 일이 잘못되었을 때에도 부하들은 나에게 편하게 말할 수 있다.",
        selectedValue: "",
      },
      {
        id: 22,
        question:
          "부하들은 나의 의견에 자유롭게 동의하지 않거나 심지어 반대할 수도 있다.",
        selectedValue: "",
      },
      {
        id: 23,
        question:
          "부하들과 소통할 때 나는 부하 스스로 생각할 수 있도록 질문을 잘 한다.",
        selectedValue: "",
      },
      {
        id: 24,
        question:
          "보고, 면담 그리고 기타 대화 중, 나는 부하들의 말을 주로 경청하는 편이다.",
        selectedValue: "",
      },
      {
        id: 25,
        question: "부하들은 상사인 나와의 관계를 만족스럽게 생각할 것이다.",
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
      header = "자가평가 점수";
      break;
    default:
      currentFormInfos = [];
      header = "";
  }
  const useMyFormMutate = useMutation(DO_MY_FORM, {
    variables: { formResult: formInfos.form.map((v) => v.selectedValue) },
  });
  useEffect(() => {
    if (data?.me?.myScore) {
      const newState = produce(formInfos, (draft) => {
        draft.myScore = data.me.myScore;
        draft.formSubmitted = true;
      });
      setLevel(5);
      setFormInfos(newState);
    }
  }, [data, formInfos]);

  return (
    <MyFormContext.Provider
      value={{
        formInfos,
        setFormInfos,
        useMyFormMutate,
        level,
        setLevel,
        currentFormInfos,
        header,
      }}
    >
      {props.children}
    </MyFormContext.Provider>
  );
};

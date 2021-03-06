import React, { useState } from "react";
import { Card, CardHeader, Snackbar } from "@material-ui/core";

const ShareLink = ({ me }) => {
  const [open, setOpen] = useState(false);
  const copyUrl = () => {
    setOpen(true);
    navigator.clipboard.writeText(
      `<지시 및 소통 역량에 관한 인식 조사>

저의 '지식 및 소통 역량'을 측정하는 아래 설문을 보냅니다. 아래 URL을 눌러서 설문에 적극 응해 주시면 감사하겠습니다. 저의 역량 증진에 큰 도움이 될 것입니다.
https://book.nam21.com/peer-review/${me.id} `
    );
  };
  return (
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
      <p>
        아래 내용을 복사해서 카카오톡(부하들의 카톡방), 메시지, 이메일 등을 통해
        부하들에게 보내십시오.
      </p>
      <Card style={{ padding: 15 }} onClick={copyUrl}>
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
        {"<지시 및 소통 역량에 관한 인식 조사>"}
        <br />
        저의 '지식 및 소통 역량'을 측정하는 아래 설문을 보냅니다. 아래 URL을
        눌러서 설문에 적극 응해 주시면 감사하겠습니다. 저의 역량 증진에 큰
        도움이 될 것입니다.
        <br />
        https://book.nam21.com/peer-review/{me.id}
      </Card>
      <p>
        * 다섯 명 이상이 응답한다면, 자신의 ‘지시 및 소통 능력’에 관해 스스로의
        인식과 부하들의 인식을 비교한 설문 결과를 볼 수 있습니다.
      </p>
    </>
  );
};

export default ShareLink;

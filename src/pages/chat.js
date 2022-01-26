import { React, useEffect, useState } from "react";
import Message from "components/message";
import { Box, TextField, Text, Button } from "@skynexui/components";
import appConfig from "../../config.json";

export default function ChatPage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Perform localStorage action
    setUsername(localStorage.getItem("username"));
  }, []);

  return (
    <>
      <Box
        styleSheet={{
          
          width: "100%",
          maxHeight: "100vh",
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(https://i.imgur.com/icxRhjX.jpeg)`,
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          // backgroundColor: "rgba(33, 41, 49, 0.5)",
          // boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
        }}
      >
        <Box
          styleSheet={{
            width: "100%",
            maxWidth: "50%",
            minHeight: "400px",
            borderRadius: "30px",
            padding: "32px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "left",
            backgroundColor: "rgba(33, 41, 49)",
          }}
        >
          <Box
            styleSheet={{
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            <Message
              time="25/01/2022"
              flag="right"
              username={username}
              storage={username}
              message={"sei l[a"}
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"hello"}
              storage={username}
              message={"teste de interface"}
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
            <Message
              time="25/01/2022"
              flag="left"
              username={"smylle3"}
              storage={username}
              message={
                "aosid hsaod hasojd sahojd sahojdsaodsao aso aso saho saod saho jsahd oasj dasojd hasojd ashoj as jas "
              }
            />
          </Box>

          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TextField
              fullWidth
              styleSheet={{
                margin: "16px",
              }}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Text
              styleSheet={{
                margin: "16px",
                fontSize: "30px",
                fontWeight: "700",
              }}
            >
              😀
            </Text>
          </Box>
        </Box>
        <Button
        label='Sair'
          onClick={function handleBtn() {
            localStorage.getItem("username");
            window.location.href = "/";
          }}
          buttonColors={{
            contrastColor: appConfig.theme.colors.neutrals["000"],
            mainColor: appConfig.theme.colors.primary[500],
            mainColorLight: appConfig.theme.colors.primary[400],
            mainColorStrong: appConfig.theme.colors.primary[600],
          }}
        />
      </Box>
    </>
  );
}

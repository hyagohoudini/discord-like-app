import Message from "components/message";
import { Box, Text, TextField, Button } from "@skynexui/components";
import React, { useEffect, useState, useRef } from "react";
import appConfig from "../../config.json";
import toast from "react-hot-toast";
import { Icon } from "@skynexui/components";

export default function ChatPage() {
  const messageDefault = {
    id: null,
    username: null,
    time: null,
    message: null,
  };

  const [username, setUsername] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  // const handleSubmit = (event, mensagem) => {
  //   console.log(event.target.value);
  //   event.preventDefault();
  //   if (event.target.value === undefined || event.target.value.length == 0 || mensagem.length === 0) {
  //     toast("Empty message!", {
  //       icon: "💬",
  //       style: {
  //         borderRadius: "10px",
  //         backgroundColor: "rgba(33, 41, 49, 0.5)",
  //         color: appConfig.theme.colors.neutrals["000"],
  //       },
  //     });
  //     return;
  //   } else {
  //     var showDate = new Date();
  //     const now = showDate.toUTCString();

  //     const aux = {
  //       id: messageList.length + 1,
  //       username: username,
  //       time: now.slice(5, -7),
  //       message: mensagem,
  //     };
  //     setMessageList([...messageList, aux, BotMessage(aux.message)]);
  //     setMensagem("");
  //   }
  // };

  const handleSubmit = () => {
    var showDate = new Date();
    const now = showDate.toUTCString();

    const aux = {
      id: messageList.length + 1,
      username: username,
      time: now.slice(5, -7),
      message: mensagem,
    };

    setMessageList([...messageList, aux, BotMessage(aux.message)]);
    setMensagem("");
  };

  const BotMessage = (texto) => {
    var showDate = new Date();
    const now = showDate.toUTCString();

    const bot = {
      id: messageList.length + 1,
      username: "bot",
      time: now.slice(5, -7),
      message:
        texto == "longa"
          ? "Aqui tem uma mensagem muito grande que só existe para fins de teste e nada mais. Interessante é que funciona mesmo, curioso, não? kkk"
          : "Mensagem automatica de teste",
    };

    return bot;
  };

  const messageRef = useRef();

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messageList]);

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(https://i.imgur.com/icxRhjX.jpeg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          color: appConfig.theme.colors.neutrals["000"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "30px",
            backgroundColor: appConfig.theme.colors.neutrals[700],
            height: "100%",
            maxWidth: {
              xl: "50%",
              lg: "95%",
              sm: "100%",
            },
            maxHeight: "75vh",
            padding: "32px",
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              backgroundColor: appConfig.theme.colors.neutrals[600],
              flexDirection: "column",
              borderRadius: "0 0 30px 30px",
              padding: "16px",
              overflowY: "scroll",
              scrollbarWidth: "none",
            }}
          >
            {messageList.map((item) => {
              return (
                <>
                  <Message
                    id={item.id}
                    flag={item.username === username}
                    time={item.time}
                    username={item.username}
                    message={item.message}
                  />
                  <div id={item.id} ref={messageRef} />
                </>
              );
            })}
          </Box>

          <Box
            as="form"
            styleSheet={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              value={mensagem}
              type="textarea"
              onChange={(event) => {
                // console.log(event.target.value);
                setMensagem(event.target.value);
              }}
              // fim onChange
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  BotMessage(event);
                  handleSubmit(event);
                }
              }}
              // fim onKeyPress
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "10px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <Button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              variant="primary"
              colorVariant="positive"
              label={<Icon />}
              styleSheet={{
                marginLeft: "16px",
                width: "20%",
                height: "50%",
                resize: "none",
                borderRadius: "30px",
                padding: "6px 8px",
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Header() {
  return (
    <Box
      styleSheet={{
        width: "100%",
        marginBottom: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text variant="heading5">Chat</Text>
      <Button
        onClick={() => {
          navigate.push("/");
          localStorage.removeItem(username);
        }}
        variant="secondary"
        colorVariant="negative"
        label="Logout"
        href="/"
      />
    </Box>
  );
}

import Message from "components/message";
import { Box, Text, TextField, Button } from "@skynexui/components";
import React, { useEffect, useState, useRef } from "react";
import appConfig from "../../config.json";
import toast from "react-hot-toast";
import { Icon } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI4ODMyNCwiZXhwIjoxOTU4ODY0MzI0fQ.-Mph-QdVaozJZPBjqQWwjbEJdqoZWiUHtjE2vRKhbMI";
const SUPABASE_URL = "https://iozweagevcivjyuunexw.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const [username, setUsername] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [didMount, setDidMount] = useState(false);
  const [profilePic, setProfilePic] = useState();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setProfilePic(localStorage.getItem("profilePic"));
  }, []);

  useEffect(() => {
    supabaseClient
      .from("tb_messageList")
      .select("*")
      .then(({ data }) => {
        setMessageList(data);
        setDidMount(true);
      });
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

  // const handleSubmit = () => {
  // if (mensagem.length === 0) {
  // toast("Empty message!", {
  // icon: "💬",
  // style: {
  // borderRadius: "10px",
  // backgroundColor: "rgba(33, 41, 49, 0.5)",
  // color: appConfig.theme.colors.neutrals["000"],
  // },
  // });
  // return;
  // } else {
  // var showDate = new Date();
  // const now = showDate.toUTCString();
  //
  // const aux = {
  // id: messageList.length + 1,
  // username: username,
  // time: now.slice(5, -7),
  // message: mensagem,
  // };
  // }
  //
  //setMessageList([...messageList, aux, BotMessage(aux.message)]);
  //
  // setMensagem("");
  // };
  //

  const handleSubmit = () => {
    if (mensagem.length === 0) {
      toast("Empty message!", {
        icon: "💬",
        style: {
          borderRadius: "10px",
          backgroundColor: "rgba(33, 41, 49, 0.5)",
          color: appConfig.theme.colors.neutrals["000"],
        },
      });
      return;
    }
    mandaProBack();
    setMensagem("");
  };

  const mandaProBack = () => {
    const aux = {
      from: username,
      message: mensagem,
      profile_pic: profilePic,
    };

    supabaseClient
      .from("tb_messageList")
      .insert([aux])
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setMessageList([...messageList, data[0]]);
      });
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
            {didMount ? (
              messageList.map((item) => {
                var showDate = new Date(item.created_at);
                const now = showDate.toUTCString();

                return (
                  <>
                    <Message
                      id={item.id}
                      flag={item.profile_pic === profilePic}
                      time={now.slice(0, -7)}
                      username={item.from}
                      message={item.message}
                      image={item.profile_pic}
                    />
                    <div ref={messageRef} />
                  </>
                );
              })
            ) : (
              <>
                <Message
                  id={"0"}
                  flag={false}
                  time={"now"}
                  username={"bot"}
                  message={"We are searching for your messages"}
                />
                <Message
                  id={"0"}
                  flag={true}
                  time={"now"}
                  username={"bot"}
                  message={"Wait and relax"}
                />
                <Message
                  id={"0"}
                  flag={false}
                  time={"now"}
                  username={"bot"}
                  message={"Wow! That's a lot of them"}
                />
                <Message
                  id={"0"}
                  flag={true}
                  time={"now"}
                  username={"bot"}
                  message={"*Searching*"}
                />
                <Message
                  id={"0"}
                  flag={false}
                  time={"now"}
                  username={"bot"}
                  message={"Don't we found it?"}
                />
                <Message
                  id={"0"}
                  flag={true}
                  time={"now"}
                  username={"bot"}
                  message={"Is it really that difficult to find???"}
                />
              </>
            )}
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
              placeholder="Type your message here..."
              value={mensagem}
              type="textarea"
              onChange={(event) => {
                setMensagem(event.target.value);
              }}
              // fim onChange
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSubmit();
                }
              }}
              // fim onKeyPress
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "10px",
                padding: "16px 16px 0px 16px",
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
  const roteador = useRouter();
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
          localStorage.deleteItem("username");
          localStorage.deleteItem("name");
          localStorage.deleteItem("profilePic");
          localStorage.deleteItem("email");
          roteador.push("/");
        }}
        variant="secondary"
        colorVariant="negative"
        label="Logout"
        href="/"
      />
    </Box>
  );
}

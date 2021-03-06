import Message from "components/message";
import { Box, Text, TextField, Button } from "@skynexui/components";
import React, { useEffect, useState, useRef } from "react";
import appConfig from "../../config.json";
import toast from "react-hot-toast";
import { Icon } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";

import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";
import { ButtonSendSticker } from "components/ButtonSendStickers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function realTimeChat(createNewMessage) {
  return supabaseClient
    .from("tb_messageList")
    .on("INSERT", (data) => {
      createNewMessage(data.new);
    })
    .subscribe();
}

function updateDeleteInRealTime(handleDeletedMessage){
  return supabaseClient
  .from('tb_messageList')
  .on("DELETE", ({old})=>{
      handleDeletedMessage(old.id);
  })
  
}

export default function ChatPage() {
  const roteamento = useRouter();
  const id = roteamento.query.id;

  const [mensagem, setMensagem] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [didMount, setDidMount] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    supabaseClient
      .from("tb_messageList")
      .select("id, created_at,from,message,profile_pic")
      .match({ chat_id: id })
      .order("id")
      .then(({ data }) => {
        if (data === null) {
          toast.error("Lista de mensagens esta vazia");
          return;
        }
        setMessageList(data);
        setDidMount(true);
      })
      .catch((e) => {
        console.log(e);
      });

      const subscription = realTimeChat((newMessage) => {
        setMessageList((currentChat) => {
          return [...currentChat, newMessage];
        });
      });

      updateDeleteInRealTime((oldId)=>{
        setMessageList((messageList)=>{
            return messageList.filter((message)=>message.id!==oldId)
        });
    });
    
  }, []);

  const handleSubmit = () => {
    if (mensagem.length === 0) {
      toast("Empty message!", {
        icon: "????",
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
      from: user.name,
      message: mensagem,
      profile_pic: user.avatar,
      chat_id: id,
    };

    supabaseClient
      .from("tb_messageList")
      .insert([aux])
      .match({ chat_id: id })
      .order("id", { ascending: false })
      .then(({ data }) => {
        // setMessageList([...messageList, data[0]]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // const BotMessage = (texto) => {
  //   var showDate = new Date();
  //   const now = showDate.toUTCString();

  //   const bot = {
  //     id: messageList.length + 1,
  //     username: "bot",
  //     time: now.slice(5, -7),
  //     message:
  //       texto == "longa"
  //         ? "Aqui tem uma mensagem muito grande que s?? existe para fins de teste e nada mais. Interessante ?? que funciona mesmo, curioso, n??o? kkk"
  //         : "Mensagem automatica de teste",
  //   };

  //   return bot;
  // };

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

  const handleChange = (event) => {
    setMensagem(event.target.value);
  };

  const handleNewMessage = (texto) => {
    const aux = {
      from: user.name,
      message: texto,
      profile_pic: user.avatar,
      chat_id: id,
    };

    supabaseClient
      .from("tb_messageList")
      .insert([aux])
      .match({ chat_id: id })
      .order("id", { ascending: false })
      .then(({ data }) => {
        // setMessageList([...messageList, data[0]]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
                      key={item.id}
                      id={item.id}
                      flag={item.profile_pic === user.avatar}
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
                <h1>Carregando...</h1>
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
            <ButtonSendSticker
              onStickerClick={(sticker) => {
                handleNewMessage(":sticker: " + sticker);
              }}
            />

            <TextField
              placeholder="Type your message here..."
              value={mensagem}
              type="textarea"
              onChange={handleChange}
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
  const roteamento = useRouter();
  const id = roteamento.query.id;
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
      <Text variant="heading5">Chat {id}</Text>
      <Button
        href="/allChats"
        variant="secondary"
        colorVariant="negative"
        label="Return to All Chats"
      />
    </Box>
  );
}

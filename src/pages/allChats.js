import { Box, Button, Icon, Text } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import ChatCard from "components/chatCard";
import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import appConfig from "../../config.json";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function realTimeChatsList(createNewChat) {
  return supabaseClient
    .from("tb_chat")
    .on("*", (data) => {
      createNewChat(data.new);
    })
    .subscribe();
}

export default function AllChats() {
  const { user, ExitAccount } = useAuth();
  const [chatList, setChatList] = useState([]);
  const [didMount, setDidMount] = useState();
  const [backgroundPhoto, setBackgroundPhoto] = useState(
    "https://i.imgur.com/icxRhjX.jpeg"
  );

  useEffect(() => {
    supabaseClient
      .from("tb_chat")
      .select("*")
      .order("id")
      .then(({ data }) => {
        setChatList(data);
        setDidMount(true);
      });

    const subscription = realTimeChatsList((newChat) => {
      setChatList((currentChatList) => {
        return [...currentChatList, newChat];
      });
      setDidMount(true);
    });

    // return () => {
    //   subscription.unsubscribe();
    // };
  }, []);

  const createNewChat = () => {
    if (backgroundPhoto.length === 0) {
      toast.error("Empty Image URL!");
      return;
    }
    mandaProBack();
  };

  const mandaProBack = () => {
    const aux = {
      background: backgroundPhoto,
      creator_pic: user.avatar,
    };

    supabaseClient
      .from("tb_chat")
      .insert([aux])
      .then(({ data }) => {
        // setChatList([...chatList, data[0]]);
        toast.success("Chat created!");
      })
      .catch((e) => {
        toast.error("Only one chat per user!");
      });
  };

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(https://img.wallpapersafari.com/desktop/1920/1080/23/30/IpcZNP.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          maxHeight: "100vh",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            width: "90%",
            minHeight: "400px",
            borderRadius: "100px 100px 100px 100px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: "rgba(33, 41, 49, 0.9)",
          }}
        >
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              alignItems: "center",
              marginLeft: "3%",
              marginBottom: "16px",
            }}
          >
            <Box>
              <Text
                tag="h1"
                styleSheet={{
                  marginBottom: "16px",
                  marginTop: "auto",
                  fontSize: "30px",
                  color: appConfig.theme.colors.primary["050"],
                }}
              >
                Select a chat room to start a conversation
              </Text>
            </Box>
            <Button
              variant="secondary"
              colorVariant="positive"
              label="Create a new Chat"
              onClick={() => {
                createNewChat();
              }}
              styleSheet={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                marginBottom: "16px",
              }}
            />
            <Button
              colorVariant="negative"
              variant="secondary"
              label="Logout"
              onClick={() => {
                ExitAccount();
              }}
              styleSheet={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
              }}
            />
          </Box>
          <Box
            styleSheet={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
              maxWidth: "100vh",
              minHeight: "400px",
              borderRadius: "10px 10px 10px 10px",
              padding: "32px",
              margin: "16px",
              boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
              backgroundColor: "rgba(33, 41, 49, 0.9)",
              overflowY: "scroll",
            }}
          >
            {didMount ? (
              chatList.map((item) => {
                return <ChatCard creator_pic={item.creator_pic} id={item.id} />;
              })
            ) : (
              <h1>Carregando</h1>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

import { Box, Button, Icon, Text } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import appConfig from "../../config.json";
import { useAuth } from "hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatCard(props) {
  const [fakeDelete, setFakeDelete] = useState(false);
  const id = props.id;
  const creator_pic = props.creator_pic;
  const { user } = useAuth();
  const roteamento = useRouter();

  const deleteChat = (id) => {
    supabaseClient
      .from("tb_messageList")
      .delete()
      .match({ chat_id: id })
      .then(() => {
        //toast.success("All messages Erased!");
      })

    supabaseClient
      .from("tb_chat")
      .delete("*")
      .match({ id: id })
      .then(({ data }) => {
        toast.success("Chat Erased!")
      })
      .catch(() => {
        toast.error("ERROr!");
      });
  };

  return (
    <Box
      styleSheet={{
        display: fakeDelete ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
        maxWidth: "500px",
      }}
    >
      <Text
        styleSheet={{
          color: "white",
          fontSize: "25px",
          width: "100%",
        }}
      >
        CHAT:
      </Text>
      <Button
        fullWidth
        variant="primary"
        colorVariant="positive"
        label={id}
        onClick={() => {
          roteamento.push(`/chat?id=${id}`);
        }}
        styleSheet={{
          margin: "16px",
        }}
      />
      {user.avatar === creator_pic && (
        <Button
          label={<Icon name="FaTrash" />}
          fullWidth
          variant="secondary"
          onClick={() => {
            setFakeDelete(true);

            deleteChat(id);
          }}
          styleSheet={{
            margin: "16px",
          }}
        />
      )}
    </Box>
  );
}

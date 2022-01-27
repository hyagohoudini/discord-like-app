import { Box, Button, Icon, Image, Text } from "@skynexui/components";
import toast from "react-hot-toast";
import appConfig from "../../config.json";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

export default function Message(prop) {
  const flag = prop.flag;
  const [fakeDelete, setFakeDelete] = useState(false);

  return (
    <Box
      styleSheet={{
        display: fakeDelete ? "none" : "flex",
        justifyContent: "left",
        alignItems: "center",
        maxWidth: "50%",
        maxHeight: "75vh",
        margin: flag ? "16px 0 16px auto" : "16px auto 16px 0",
        boxSizing: "border-box",
        backgroundColor: "rgba(82, 102, 122, 0.9)",
        boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
        borderRadius: flag ? "30px 3px 30px 30px" : "3px 30px 30px 30px",

        hover: {
          backgroundColor: appConfig.theme.colors.neutrals["300"],
        },
      }}
    >
      {/* foto */}
      <Box
        styleSheet={{
          margin: "16px 0px 16px 16px",
          boxSizing: "content-box",
        }}
      >
        <Image
          styleSheet={{
            maxWidth: "60px",
            minWidth: "60px",
            minHeight: "60px",
            maxWidth: "60px",
            borderRadius: "50%",
          }}
          src={`https://github.com/${prop.username}.png`}
        />
        {/* Nome */}
      </Box>
      <Box
        styleSheet={{
          display: "flex",
          boxSizing: "content-box",
          flexDirection: "column",
          margin: "16px 16px 16px 0px",
        }}
      >
        <Box
          styleSheet={{
            boxSizing: "content-box",
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Box>
            <Text
              styleSheet={{
                marginLeft: "10px",
                fontSize: "20px",
                fontWeight: "700",
                color: appConfig.theme.colors.neutrals["900"],
              }}
            >
              {prop.username}
            </Text>
            <Text
              styleSheet={{
                marginLeft: "10px",
                fontSize: "10px",
                fontWeight: "200",
                color: appConfig.theme.colors.neutrals["300"],
                hover: {
                  color: appConfig.theme.colors.neutrals["200"],
                },
              }}
            >
              {prop.time}
            </Text>
          </Box>
          <Box
            styleSheet={{
              display: flag ? "flex" : "none",
              marginBottom: "-15px",
            }}
          >
            <Button
              onClick={() => {
                setFakeDelete(true);
              }}
              variant="tertiary"
              colorVariant="dark"
              label="🗑"
              styleSheet={{
                marginLeft: "16px",
                width: "5%",
                height: "50%",
                resize: "none",
                borderRadius: "30px",
              }}
            />
          </Box>
        </Box>
        <CopyToClipboard text={prop.message}>
          <Box
            onClick={() => {
              toast("Mensagem copiada!", {
                icon: <Icon name="FaCopy" />,
                style: {
                  borderRadius: "10px",
                  backgroundColor: "rgba(33, 41, 49, 0.5)",
                  color: appConfig.theme.colors.neutrals["000"],
                },
              });
            }}
            styleSheet={{
              boxSizing: "content-box",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Text
              styleSheet={{
                color: appConfig.theme.colors.neutrals["000"],
                marginLeft: "10px",
                fontSize: "16px",
              }}
            >
              {prop.message}
            </Text>
          </Box>
        </CopyToClipboard>
      </Box>
    </Box>
  );
}

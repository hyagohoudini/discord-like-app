import { Box, Image, Text } from "@skynexui/components";
import { useState } from "react";
import appConfig from "../../config.json";

export default function Message(prop) {
  const username = prop.username;
  const storage = prop.storage;

  return (
    <Box
      styleSheet={{
        justifyContent: `${prop.flag}` || "left",
        alignItems: "center",
        display: "flex",
        margin: "16px 0px 0px 16px",
        boxSizing: "content-box",
        backgroundColor: "rgba(82, 102, 122, 0.9)",
        boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
        borderRadius: "30px",
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
          }}
        >
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
              fontSize: "14px",
              fontWeight: "200",
              color: appConfig.theme.colors.neutrals["300"],
            }}
          >
            {prop.time}
          </Text>
        </Box>
        <Box
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
      </Box>
    </Box>
  );
}

import {
  Box,
  Button,
  Text,
  TextField,
  Image,
  Icon,
} from "@skynexui/components";
import appConfig from "../../config.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import toast from "react-hot-toast";

import { useAuth } from "hooks/useAuth";

function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary["100"]};
          font-size: 40px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default function HomePage() {
  const roteador = useRouter();

  const { user, SignInWithGoogle, SignInWithGithub } = useAuth();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(https://img.wallpapersafari.com/desktop/1920/1080/23/30/IpcZNP.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "1000px",
            minHeight: "400px",
            borderRadius: "30px 100px 30px 100px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: "rgba(33, 41, 49, 0.9)",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h1">Welcome Back!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "16px",
                color: appConfig.theme.colors.primary[500],
              }}
            >
              {appConfig.name}
            </Text>

            <Text
              tag="h5"
              variant="body5"
              styleSheet={{
                marginBottom: "1px",
                marginRight: "auto",
                color: appConfig.theme.colors.neutrals["300"],
              }}
            >
              Log In to connect with friends and the world around you
            </Text>

            {/* <button onClick={() => handleLogin(facebookProvider)}> */}

            <button type="button" onClick={() => SignInWithGoogle()}>
              <Icon name="google" /> <p>Google</p>
              <style jsx>{`
                button {
                  border-radius: 30px;
                  padding: 5px;
                  margin-top: 16px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  color: ${appConfig.theme.colors.primary["050"]};
                  background-color: ${appConfig.theme.colors.primary["400"]};
                  font-size: 30px;
                  font-weight: 700;
                }

                button p {
                  justify-content: center;
                  align-items: center;
                  margin-left: 16px;
                }
              `}</style>
            </button>

            <button type="button" onClick={() => SignInWithGithub()}>
              <Icon name="github" /> <p>Github</p>
              <style jsx>{`
                button {
                  border-radius: 30px;
                  padding: 5px;
                  margin-top: 16px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  color: ${appConfig.theme.colors.neutrals["050"]};
                  background-color: ${appConfig.theme.colors.neutrals["800"]};
                  font-size: 30px;
                  font-weight: 700;
                }

                button p {
                  margin-left: 16px;
                }
              `}</style>
            </button>
          </Box>
          {/* Formulário */}

          {/* Photo Area */}

          <Box
            styleSheet={{
              marginLeft: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Text
              variant="body2"
              styleSheet={{
                marginTop: "0px",
                marginBottom: "auto",
                fontSize: "25px",
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "10px",
              }}
            >
              Didn't have an account?
            </Text>

            <Button
              label="Git Sign in"
              variant="secondary"
              href="https://github.com/signup?source=login"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              styleSheet={{
                marginTop: "16px",
                marginBottom: "16px",
              }}
            />

            <Button
              label="Google Sign in"
              variant="secondary"
              href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&dsh=S939595820%3A1643303845417443&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary["500"],
                mainColorLight: appConfig.theme.colors.primary["400"],
                mainColorStrong: appConfig.theme.colors.primary["600"],
              }}
            />
          </Box>
          {/* Photo Area */}

          {/* QRcode Area */}
          <Box
            styleSheet={{
              marginLeft: "32px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "30px 60px 30px 70px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                marginTop: "16px",
                borderRadius: "0%",
                marginBottom: "16px",
              }}
              src={`https://i.ibb.co/mRN4gQs/qrcode.png`}
            />

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              <a
                target="blank"
                href="https://github.com/hyagohoudini/discord-like-app"
              >
                Git repository
                <style jsx>{`
                  a {
                    text-decoration: none;
                    color: white;
                  }
                `}</style>
              </a>
            </Text>
          </Box>
          {/* QRcode Area */}
        </Box>
      </Box>
    </>
  );
}

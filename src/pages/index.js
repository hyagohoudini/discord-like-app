import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../../config.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import toast from "react-hot-toast";

const googleClientId =
  "485319426986-8qtcsemp60bica3c8nq8vh57g5ofqo4r.apps.googleusercontent.com";

import GoogleLogin from "react-google-login";

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

// function HomePage() {
//   return (
//     <>
//       <GlobalStyle />
//       <Titulo tag="h1">Welcome Back</Titulo>
//       <h2>Discord like app</h2>
//     </>
//   );
// }
// export default HomePage;

export default function PaginaInicial() {
  const defautlUser = {
    login: null,
    id: 0,
    node_id: null,
    avatar_url: null,
    gravatar_id: null,
    url: null,
    html_url: null,
    followers_url: null,
    following_url: null,
    gists_url: null,
    starred_url: null,
    subscriptions_url: null,
    organizations_url: null,
    repos_url: null,
    events_url: null,
    received_events_url: null,
    type: "User",
    site_admin: false,
    name: null,
    company: null,
    blog: null,
    location: null,
    email: null,
    hireable: null,
    bio: null,
    twitter_username: null,
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: null,
    updated_at: null,
  };

  const roteador =  useRouter();

  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [email, setEmail] = useState("");

  const handleGoogleLogin = (event) => {
    const {
      profileObj: { name, imageUrl, email },
    } = event;

    setUsername(name);
    setProfilePic(imageUrl);
    setEmail(email);
    localStorage.setItem("username",name);
    localStorage.setItem("profilePic",imageUrl);
    localStorage.setItem("email",email);
    roteador.push('/chat');
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Google Login Error!", {
      style: {
        borderRadius: "10px",
        backgroundColor: "rgba(33, 41, 49, 0.5)",
        color: appConfig.theme.colors.neutrals["000"],
      },
    });
  };

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
                marginBottom: "32px",
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
            <GoogleLogin
              clientId={googleClientId}
              buttonText="Login with Google"
              onSuccess={handleGoogleLogin}
              onFailure={handleGoogleLoginFailure}
              render={(renderProps) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  label="Login with google"
                  fullWidth
                  variant="primary"
                  colorVariant="positive"
                  styleSheet={{
                    fontSize: "0px",
                  }}
                />
              )}
            />
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
                marginTop: "-32px",
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
              Git repository
            </Text>
          </Box>
          {/* QRcode Area */}
        </Box>
      </Box>
    </>
  );
}

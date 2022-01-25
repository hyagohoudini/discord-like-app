import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../../config.json";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
    updated_at: null
  };

  const [username, setUsername] = useState("hyagohoudini");
  const [user, setUser] = useState(defautlUser);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        const data = response.data;
        if (data.login != null) {
          setUser(data);
        }
      })
      .catch((err) => {
        setUser(defautlUser);
        return;
      });
  }, [username]);

  const roteamento = useRouter();

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //Push pra outro endpoint
    // window.location.href = '/chat';
    // localStorage.setItem("username", `${username}`);
    roteamento.push("/chat");
  };

  const handleErrBtn = () => {
    alert("Git user must exist");
  };

  const handleGit = () => {
    window.location.href = "https://github.com/signup?source=login";
  };

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: appConfig.theme.colors.primary[000],
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
            borderRadius: "30px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: "rgba(33, 41, 49, 0.9)",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={handleSubmit}
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
              variant="body5"
              styleSheet={{
                marginBottom: "1px",
                marginRight: "auto",
                color: appConfig.theme.colors.neutrals["300"],
              }}
            >
              Insert your GitHub Username
            </Text>

            {/* Campo de texto */}
            <TextField
              fullWidth
              value={username}
              onChange={handleChange}
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            {/* Campo de texto */}

            {/* <input type="text" value = {username} onChange={handleChange} /> */}

            {user.login != null ? (
              <Button
                type="submit"
                label="Entrar"
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            ) : (
              <Button
                onClick={handleErrBtn}
                label="Entrar"
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.neutrals[500],
                  mainColorLight: appConfig.theme.colors.neutrals[400],
                  mainColorStrong: appConfig.theme.colors.neutrals[600],
                }}
              />
            )}
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          {user.login != null ? (
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
              <Image
                styleSheet={{
                  borderRadius: "50%",
                  marginBottom: "16px",
                }}
                src={`https://github.com/${username}.png`}
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
                {username}
              </Text>
            </Box>
          ) : (
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
                  marginTop: "20px",
                  marginBottom: "45px",
                  fontSize: "25px",
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: "3px 10px",
                  borderRadius: "10px",
                }}
              >
                Não tem uma conta?
              </Text>

              <Button
                label="Registrar no git"
                onClick={handleGit}
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary[500],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[600],
                }}
              />
            </Box>
          )}
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
              borderRadius: "10px",
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

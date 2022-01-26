import { Box } from "@skynexui/components";
import NotFound404 from 'assets/img/404.jpg'

export default function NotFound() {
  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          flexDirection:'column',
          backgroundImage: `url(https://i.ibb.co/QDnv648/404.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <h1>
          404
          <style jsx>{`
            h1 {
              font-size: 10rem;
              font-weight: 700;
              text-transform: uppercase;

              text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                0.025em 0.05em 0 rgba(0, 0, 255, 0.75);

              animation: glitch 500ms infinite;
            }

            @keyframes glitch {
              0% {
                text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                  -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
              }
              15% {
                text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                  0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
              }
              50% {
                text-shadow: 0.025em -0.025em 0 rgba(255, 0, 0, 0.75),
                  0.05em 0 0 rgba(0, 255, 0, 0.75),
                  0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
              }
              100% {
                text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                  -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                  -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
              }
            }
          `}</style>
        </h1>
        <a href="/" >HOME
        <style jsx>{`
            a {
                margin-top:10rem;
              font-size: 2rem;
              font-weight: 700;
              text-transform: uppercase;
            }
          `}</style>
        </a>
      </Box>
    </>
  );
}

import { auth, db, googleAuthProvider } from "../lib/firebase";
import { User } from "@firebase/auth-types";
import toast from "react-hot-toast";
import styled from "styled-components";
import Particles from "react-tsparticles";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const LoginPage = () => {
  const firebase = useFirebase();
  const auth = useSelector((state: RootState) => state.firebase.auth);
  /* 
  function signInWithGoogle() {
    return firebase.login({ provider: "google", type: "popup" });
  } */

  const signInWithGoogle = async () => {
    try {
      const res = await firebase.login({ provider: "google", type: "popup" });
      if (
        !res.user?.email?.endsWith("@partikular.se", res.user?.email?.length)
      ) {
        firebase.logout();
        throw Error;
      }
      const user = res.user as User;
      toast.success(`Välkommen ${user.displayName!.split(" ")[0]}!`, {
        icon: "👋",
        style: { fontWeight: "600" },
      });
      const query = await db
        .collection("users")
        .where("uid", "==", user?.uid)
        .get();

      if (query.docs.length === 0 && user) {
        const newUser = {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          createdAt: Date.parse(user.metadata.creationTime!),
          role: "Skribent",
        };

        await db.collection("users").doc(user.uid).set(newUser);
      }
    } catch (err) {
      toast.error("Försök igen med ditt organisationsmail!", {
        style: {
          fontWeight: "600",
        },
      });
    }
  };

  return (
    <>
      {!isLoaded(auth) ? (
        <span>Laddar...</span>
      ) : (
        <>
          <Logo src="/assets/logo.png" alt="" />
          <Wrapper>
            <LoginTitle>Paritkularnet</LoginTitle>
            <GoogleSignIn onClick={signInWithGoogle}>
              {" "}
              <img
                src="/assets/google_logo.png"
                style={{ height: 40, width: 40, marginRight: 14 }}
                alt=""
              />{" "}
              Logga in med Google{" "}
            </GoogleSignIn>
          </Wrapper>
          <Particles
            style={{ zIndex: -1 }}
            id="tsparticles"
            options={{
              background: {
                color: {
                  value: "#000000",
                },
              },
              fpsLimit: 60,
              particles: {
                color: {
                  value: "#ffffff",
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "out",
                  random: true,
                  speed: 1,
                  straight: false,
                  attract: {
                    rotateX: 600,
                    rotateY: 600,
                  },
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 800,
                  },
                  value: 100,
                },
                opacity: {
                  value: 1,
                  random: true,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0,
                  },
                },
                shape: {
                  type: "circle",
                },
                size: {
                  random: true,
                  value: 3,
                  anim: {
                    speed: 4,
                    size_min: 0.3,
                  },
                },
              },
              detectRetina: true,
            }}
          />
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  z-index: 10000;
  height: 200px;
  width: 400px;
  position: absolute;
  background: white;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  text-align: left;
  display: flex;
  justify-content: top;
  align-items: top;
  flex-direction: column;
  padding: 5px 20px;
`;

const LoginTitle = styled.h1`
  font-size: 2.5rem;
`;

const Logo = styled.img`
  height: 60px;
  width: 60px;
  align-self: center;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10000;
`;

const GoogleSignIn = styled.button`
  transition: all ease-in-out 0.1s;
  background: white;
  display: flex;
  align-items: center;
  padding: 10px;
  outline: none;
  border: none;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: 20px;
  color: #677070;
  box-shadow: 0 5px 10px 1px #9c9c9c50;
  cursor: pointer;
  &:hover {
    color: black;
    box-shadow: 0 5px 10px 1px #9c9c9c90;
  }
`;

export default LoginPage;

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { PageTitle } from "./CommonStyledComponents";
import Dashboard from "./dashboard/Dashboard";
import LoginPage from "./LoginPage";
import Nav from "./nav/Nav";
import ActivityMenu from "./activity-menu/ActivityMenu";
import Editor from "./editor/Editor";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import ArticleView from "./article-view/ArticleView";

const routes = [
  {
    path: "/",
    page: <Dashboard />,
  },
  {
    path: "/artikelvyn",
    page: <ArticleView />,
  },
  {
    path: "/statistik",
    page: <StatsView />,
  },
  {
    path: "/meddelanden",
    page: <Chat />,
  },
  {
    path: "/installningar",
    page: <Settings />,
  },
];

const Pages = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const auth = useSelector((state: RootState) => state.firebase.auth);

  useEffect(() => {
    let path;
    if (pathname === "/") {
      path = "Aktivitetscentrum";
    } else if (pathname === "/artikelvyn") {
      path = "Artikelvyn";
    } else if (pathname === "/statistik") {
      path = "Statistikvyn";
    } else if (pathname === "/meddelanden") {
      path = "Chattvyn";
    } else if (pathname === "/installningar") {
      path = "Inställningar";
    } else if (pathname === "/editor") {
      path = "Artikelredigeraren";
    }

    document.title = isLoaded(auth)
      ? `${path} | Partikularnet`
      : "Logga in på Partikularnet";
  }, [pathname, auth]);

  return (
    <>
      {isLoaded(auth) && !isEmpty(auth) ? (
        <>
          {pathname === "/editor" ? (
            <Routes location={location} key={location.pathname}>
              <Route path="/editor" element={<Editor />} />
            </Routes>
          ) : (
            <AppWrapper>
              <Nav />
              <RoutesWrapper>
                <div style={{ padding: "36px 60px" }}>
                  <AnimatePresence exitBeforeEnter>
                    <Routes location={location} key={location.pathname}>
                      {routes.map((route) => (
                        <Route path={route.path} element={route.page} />
                      ))}
                    </Routes>
                  </AnimatePresence>
                </div>
                <ActivityMenu
                  user={auth}
                  uid={auth.uid}
                  userData={auth.providerData}
                />
              </RoutesWrapper>
            </AppWrapper>
          )}
        </>
      ) : (
        <Routes>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
};

const AppWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 160px auto;
`;

const RoutesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  position: relative;
  background-color: #f2fcfb;
  margin: 20px 20px 20px 0;
  border-radius: 30px;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const pageTransitions = {
  initial: {
    x: -100,
    opacity: 0,
  },
  in: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.1 },
  },
  out: {
    opacity: 0,
    x: 1000,
    transition: { duration: 0.2 },
  },
};

function Chat() {
  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitions}
    >
      <PageTitle>Chattvyn</PageTitle>
    </motion.div>
  );
}

function Settings() {
  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitions}
    >
      <PageTitle>Inställningar</PageTitle>
    </motion.div>
  );
}

function StatsView() {
  return (
    <motion.div
      initial="initial"
      exit="out"
      animate="in"
      variants={pageTransitions}
    >
      <PageTitle>Statistikvyn</PageTitle>
    </motion.div>
  );
}

export default Pages;

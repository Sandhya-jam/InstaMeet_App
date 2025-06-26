import { Navigate, Route, Routes } from "react-router";

import HomePage from "./Pages/HomePage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import NotificationsPage from "./Pages/NotificationsPage.jsx";
import CallPage from "./Pages/CallPage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import AlmostTherePage from "./Pages/AlmostTherePage.jsx";

import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isAlmostThere = authUser?.isAlmostThere;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isAlmostThere ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/almostThere"} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isAlmostThere ? "/" : "/almostThere"} />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isAlmostThere ? "/" : "/almostThere"} />
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isAlmostThere ? (
              <Layout showSidebar={true}>
                <NotificationsPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/almostThere"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isAlmostThere ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/almostThere"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isAlmostThere ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/almostThere"} />
            )
          }
        />

        <Route
          path="/almostThere"
          element={
            isAuthenticated ? (
              !isAlmostThere ? (
                <AlmostTherePage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;
import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import { LoginProvider } from "./contexts/LoginContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TimeLine from "./pages/TimeLine";
import UserPage from "./pages/UserPage";
import HashtagPosts from "./pages/HashtagPosts";

export default function App() {
  const { pathname } = useLocation();

  return (
    <PagesContainer>
      <LoginProvider>
        {pathname !== "/sign-up" && pathname !== "/" && <Header />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<TimeLine />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPosts />} />
        </Routes>
      </LoginProvider>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  width: 100%;
  max-height: 100vh;
`;

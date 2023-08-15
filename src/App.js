import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { LoginProvider } from "./contexts/LoginContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <PagesContainer>
      <BrowserRouter>
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={< SignUp/>} />
          </Routes>
        </LoginProvider>
      </BrowserRouter>
    </PagesContainer>
  );
}

const PagesContainer = styled.main`
  width: 100%;
  max-height: 100vh;
`
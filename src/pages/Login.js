import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GlobalStyle from "../style/GlobalStyle";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function sendInformations(e) {
    e.preventDefault();

    const obj = {
      email,
      password
    }

    const promise = axios.post(`${import.meta.env.VITE_API_URL}/signin`, obj);

    promise.then(response => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.username);
      localStorage.setItem("userid", response.data.id);
      navigate("/");

    });

    promise.catch(erro => {

      alert('Invalid username and/or password!');
      console.log(erro.response.data);
    });

  }

  return (
    <Container>
      <Logo>
        <h1>linkr</h1>
        <p>save, share and discover the best links on the web</p>
      </Logo>
      <SingInContainer>

        <GlobalStyle />

        <form onSubmit={sendInformations}>

          <input placeholder="e-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input placeholder="password" type="password" autoComplete="new-password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Log In</button>

        </form>

        <Link to='/signup'>
          <h2>First time? Create an account!</h2>
        </Link>

      </SingInContainer>
    </Container>
  )
}

const SingInContainer = styled.section`
  flex: 37;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #333333;
  height: 100vh;

  button{
    width: calc(100% - 167px);
  }

  h2{
    font-family: Lato;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0em;
    color: #FFFFFF;
  }
`;

const Logo = styled.section`
  flex: 63;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #151515;
  height: 100vh;

  h1{
    width: 442px;
    height: 117px;
    font-family: Passion One;
    font-size: 106px;
    font-weight: 700;
    line-height: 117px;
    letter-spacing: 0.05em;
    text-align: left;
    color: #FFFFFF;
  }

  p{
    width: 442px;
    height: 128px;
    font-family: Oswald;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: left;
    color: #FFFFFF;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`

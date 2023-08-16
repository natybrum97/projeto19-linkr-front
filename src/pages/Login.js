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

  @media (max-width: 767px) {
    width:100%;
    height: 100vh;
    flex: 75;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin-top: 63px;

    button{
    width: calc(100% - 12.7%);
  }

    input{
    width: calc(100% - 18%);
  }

  h2{
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
  }
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
  @media (max-width: 767px) {
    width:100%;
    height:175px;
    flex: 25;

    p {
    width: 237px;
    height: 68px;
    font-family: Oswald;
    font-size: 23px;
    font-weight: 700;
    line-height: 34px;
    letter-spacing: 0em;
    text-align: center;
    }

    h1{
    width: 167px;
    height: 84px;
    font-family: Passion One;
    font-size: 76px;
    font-weight: 700;
    line-height: 84px;
    letter-spacing: 0.05em;
    text-align: left;

    }
  }
  
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #333333;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    height: 100vh;
  }
`


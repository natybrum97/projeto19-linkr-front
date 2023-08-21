import axios from "axios";
import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function SearchBar() {

  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (value) => {

    console.log(value);

    if (value && value.length >= 3) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/search-users?query=${value}`)
        .then((response) => {
          console.log(response.data);
          setSearchResults(response.data);
        })
        .catch((error) => {
          console.error(error);
          setSearchResults([]);
        });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Container>
      <DebounceInput
        data-test="search"
        type="search"
        placeholder="Search for people"
        debounceTimeout={300} // Aguarde 300ms após a última digitação para iniciar a busca
        onChange={(e) => handleSearch(e.target.value)}
      />
      <FiSearch color="#C6C6C6" size={34} cursor="pointer" />
      <ul>
        {searchResults.map((result) => (
        <li data-test="user-search" onClick={() => navigate(`/user/${result.id}`)} key={result.id}>
          <img src={result.pictureUrl} alt={`${result.username}'s profile`} />
          <span>{result.username}</span>
        </li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.form`
  height: 25px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 15px;
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;

  input {
    width: 100%;
    font-size: 20px;
    border: none;
    position: relative;

    &:focus {
      outline: 0;
    }
  }

  ul {
    width: calc(100% + 10px);
    margin-top: -22px;
    z-index: 2;
    list-style: none;
    padding: 0;
    background-color: #E7E7E7;
    border-bottom-left-radius:8px;
    border-bottom-right-radius: 8px;
    margin-left: -10px;

    li:last-child{
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    li {
      width: 100%;
      display: flex; /* Exibir foto e nome lado a lado */
      align-self: flex-start;
      padding: 5px;
      gap: 10px;
      background-color: #E7E7E7;
      cursor: pointer;
      &:hover{
        span {
          opacity: 0.75;
        }
        img {
          opacity: 0.75;
        }
      }
      img {
        width: 40px; /* Ajuste conforme necessário */
        height: 40px; /* Ajuste conforme necessário */
        border-radius: 50%;
      }

      span {
        font-family: Lato;
        font-size: 19px;
        font-weight: 400;
        margin-top: 10px;
      }
    }
  }
`;

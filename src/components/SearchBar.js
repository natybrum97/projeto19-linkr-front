import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { styled } from "styled-components";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (value) => {
    setSearchTerm(value);

    console.log(value);

    if (value && value.length >= 3) {
     
      axios.get(`${process.env.REACT_APP_API_URL}/search-users?query=${value}`).then((response) => {
      console.log(response.data);
      setSearchResults(response.data);
    }).catch((error) => {
      console.error(error);
      setSearchResults([]); 
    });
  } else {
    setSearchResults([]);
  }

}

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
          <li key={result.id}>
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
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex; /* Exibir foto e nome lado a lado */
      align-items: center;
      gap: 10px;

      img {
        width: 40px; /* Ajuste conforme necessário */
        height: 40px; /* Ajuste conforme necessário */
        border-radius: 50%;
      }

      span {
        font-size: 16px;
        color: white;
      }
    }
  }
`;

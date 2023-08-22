import axios from "axios";
import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (value) => {
    setSearchTerm(value);

    if (value && value.length >= 3) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/search-users?query=${value}`)
        .then((response) => setSearchResults(response.data))
        .catch((error) => {
          console.error(error);
          setSearchResults([]);
        });
    } else setSearchResults([]);
  };

  const navigate = useNavigate();

  function goToUserPage(id) {
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/user/${id}`);
  }

  return (
    <Container>
      <div>
        <DebounceInput
          data-test="search"
          type="search"
          placeholder="Search for people"
          debounceTimeout={300}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <span
          style={{
            color: "#c6c6c6",
            fontSize: "25px",
            cursor: "pointer",
          }}
        >
          <FiSearch />
        </span>
      </div>

      {searchTerm.length >= 3 && (
        <ul>
          {searchResults.length > 0
            ? searchResults.map((result) => (
                <li
                  data-test="user-search"
                  key={result.id}
                  onClick={() => goToUserPage(result.id)}
                >
                  <img
                    src={result.pictureUrl}
                    alt={`${result.username}'s profile`}
                  />
                  <span>{result.username}</span>
                </li>
              ))
            : searchTerm.length >= 3 && (
                <li>
                  <span>
                    <p>Not results found for "{searchTerm}"</p>
                  </span>
                </li>
              )}
        </ul>
      )}
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
  z-index: 2;

  input {
    width: 100%;
    font-size: 20px;
    border: none;
    position: relative;

    &:focus {
      outline: 0;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  ul {
    width: 100%;
    list-style: none;
    padding: 10px;
    margin: 0;
    background: #e7e7e7;
    font-family: "Oswald";
    font-size: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    z-index: 1;
    position: relative;
    right: 10px;
    top: -9px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    :hover {
      cursor: pointer;
      background: #ffffff;
    }

    li {
      min-width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px;
      border-radius: 5px;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      span {
        font-size: 16px;
        color: #515151;
        width: 100%;

        p {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;

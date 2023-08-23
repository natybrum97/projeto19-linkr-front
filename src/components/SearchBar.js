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
        .get(`${process.env.REACT_APP_API_URL}/search-users?query=${value}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
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
  };

  return (
    <Container length={searchResults.length} term={searchTerm.length}>
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
                  <span>{result.username}{result.followedByYou && <span> • following</span>}</span>
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
  z-index: 2;
  border-radius: ${({ length, term }) => (length !== 0 || term > 3) ? '8px 8px 0 0' : '8px'};

  input {
    width: 100%;
    font-size: 20px;
    border: none;
    position: relative;
    margin-bottom: 4px;

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
    @media (min-width: 1200px) {
      margin-top: unset;
    }
    margin-top: 1px;
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
      transition: 700ms;
      background: #ffffff;
    }

    li {
      width: 98%;
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
        span{
          color: #C5C5C5;
        }
        p {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
`;

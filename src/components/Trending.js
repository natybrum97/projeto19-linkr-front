import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function Trending({ posts }) {
  const [hashtagsTrending, setTrending] = useState([]);

  useEffect(() => {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/trending`);

    promise.then((res) => {
      setTrending(res.data);
    });
    promise.catch((err) => {
      alert(err.response.data.message);
    });
  }, [posts]);

  return (
    <StyledTrending data-test="trending">
      <h2>trending</h2>
      <hr></hr>

      {hashtagsTrending.length === 0 ? (
        <h2>There are no trends yet</h2>
      ) : (
        <StyledList>
          {hashtagsTrending.map((trend, i) => (
            <StyledLink
              data-test="hashtag"
              key={i}
              to={`/hashtag/${trend.hashtagText.replace("#", "")}`}
            >
              <p>{trend.hashtagText}</p>
            </StyledLink>
          ))}
        </StyledList>
      )}
    </StyledTrending>
  );
}

const StyledTrending = styled.div`
  margin-top: 20px;
  background-color: #171717;
  @media (min-width: 1200px) {
    display: flex;
  }
  hr{
    margin-top: 0px;
    background-color: #484848;
    width: 99%;
  }
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;

  padding-bottom: 8px;
  min-width: 301px;
  max-width: 301px;

  h2 {
    color: #ffffff;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    margin-bottom: 5px;
    padding-left: 8px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  P {
    color: #ffffff;
    font-family: Lato;
    font-size: 19px;
    font-weight: 700;
    margin-left: 8px;
    line-height: 23px;
    margin-bottom: 3px;
  }
`;

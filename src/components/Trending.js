import axios from "axios";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Trending({ posts }) {
  const [hashtagsTrending, setTrending] = useState([]);

  useEffect(() => {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/trending`);

    promise.then((res) => {
      setTrending(res.data);
    });
    promise.catch((err) => {
      console.log(err.response.data);
      alert(err.response.data.message);
    });
  }, [posts]);

  return (
    <StyledTrending data-test="trending">
      <h2>trending</h2>

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
  background-color: #171717;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;

  width: 200px;

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
    font-size: 20px;
    font-weight: 700;
    margin-left: 8px;
    margin-bottom: 3px;
  }
`;

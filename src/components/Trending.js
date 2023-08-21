import axios from "axios";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Trending() {
  const [hashtagsTrending, setTrending] = useState(null);

  useEffect(() => {
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/trending`);

    promise.then((res) => {
      setTrending(res.data);
      console.log("resposta: ", res.data);
    });
    promise.catch((err) => {
      alert(err.response.data);
    });
  }, []);

  if (!hashtagsTrending) {
    <h4>There are no trends yet</h4>;
  }

  return (
    <StyledTrending data-test="trending">
      <h2>trending</h2>

      {hashtagsTrending !== null && (
        <StyledList>
          {hashtagsTrending.map((trend, i) => (
            <StyledLink
              data-teste="hashtag"
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
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  width: 200px;

  h2 {
    color: #ffffff;
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
  }

  P {
    color: #ffffff;
    font-family: Lato;
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
  }
`;

const StyledLink = styled(Link)`
  background-color: red;
  text-decoration: none;
  color: white;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

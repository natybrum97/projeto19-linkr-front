import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";

const HashtagPosts = () => {
  const [posts, setPosts] = useState(null);

  const { hashtag } = useParams();

  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/post`);
      setPosts(data);
      console.log(data);
    } catch ({
      response: {
        status,
        statusText,
        data: { message },
      },
    }) {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <StyledHashtagPosts>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      <h1>#{hashtag}</h1>
      <div>
        {posts === null ? (
          <h4>Loading...</h4>
        ) : (
          posts.length === 0 && <h4>There are no posts yet</h4>
        )}
      </div>
    </StyledHashtagPosts>
  );
};

export default HashtagPosts;

const SearchBarWrapper = styled.span`
  width: 100%;
  margin-top: 30px;
  max-width: 100%;

  @media (min-width: 767px) {
    display: none;

    input {
      font-size: 16px;
    }
  }
`;

const StyledHashtagPosts = styled.div`
  @media (min-width: 1200px) {
    padding-top: 30px;
  }
  margin-top: 72px;
  background-color: #333333;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  h1 {
    @media (min-width: 1200px) {
      font-size: 43px;
      line-height: 64px;
      align-self: center;
      margin-left: -344px;
    }
    margin: 16px;
    text-align: left;
    font-family: Oswald;
    font-size: 33px;
    font-weight: 700;
    line-height: 49px;
    color: #ffffff;
  }
  div {
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    h4 {
      @media (min-width: 1200px) {
        font-size: 34px;
        line-height: 46px;
      }
      margin-top: 20px;
      align-self: center;
      font-family: Oswald;
      font-size: 24px;
      font-weight: 700;
      line-height: 38px;
      color: #ffffff;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
`;

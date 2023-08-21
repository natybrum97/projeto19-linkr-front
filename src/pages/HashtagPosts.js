import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import PostHashtag from "../components/PostHashtag";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

const HashtagPosts = () => {
  const [posts, setPosts] = useState(null);

  const { hashtag } = useParams();

  const { isLoged } = useContext(LoginContext);

  useEffect(() => {
    isLoged();
  });

  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`
      );
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

      <h1 data-test="hashtag-title"># {hashtag}</h1>

      <StyledContainer>
        <StyledDiv>
          {posts === null ? (
            <h4>Loading...</h4>
          ) : (
            posts.length === 0 && <h4>There are no posts yet</h4>
          )}

          {posts !== null && posts.length > 0 && (
            <ul>
              {posts.map((p) => (
                <PostHashtag
                  key={p.id}
                  id={p.id}
                  postUrl={p.postUrl}
                  postText={p.postText}
                  userIdfromPost={p.user.id}
                  name={p.user.name}
                  pictureUrl={p.user.pictureUrl}
                />
              ))}
            </ul>
          )}
        </StyledDiv>

        <Trending />
      </StyledContainer>
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

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 25px;
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
  justify-content: center;
  align-items: center;

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
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  background-color: yellow;
  align-items: flex-start;
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
`;

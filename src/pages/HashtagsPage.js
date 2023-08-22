import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import { LoginContext } from "../contexts/LoginContext";

const HashtagsPage = () => {
  const [posts, setPosts] = useState(null);

  const { hashtag } = useParams();

  const { isLoged } = useContext(LoginContext);

  const getPosts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`
      );
      setPosts(data);
    } catch ({ response }) {
      setPosts(response.data.message);
    }
  };
  useEffect(() => {
    isLoged();
    getPosts();
  }, [hashtag]);

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
            posts === 'Hashtag não encontrada!' && <h4>There are no posts with #{hashtag} yet</h4>
          )}

          {posts !== null && posts !== 'Hashtag não encontrada!' && (
            <ul>
              {posts.map((p) => (
                <Post
                  key={p.id}
                  id={p.id}
                  postUrl={p.postUrl}
                  postText={p.postText}
                  userIdfromPost={p.user.id}
                  name={p.user.name}
                  pictureUrl={p.user.pictureUrl}
                  getData={getPosts}
                />
              ))}
            </ul>
          )}
        </StyledDiv>

        <Trending posts={posts}/>
      </StyledContainer>
    </StyledHashtagPosts>
  );
};

export default HashtagsPage;

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
  overflow-x: hidden; 
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
      margin-left: 462px;
    }
    min-width: 100%;
    margin: 16px;
    text-align: left;
    font-family: Oswald;
    font-size: 33px;
    font-weight: 700;
    line-height: 49px;
    color: #ffffff;
  }
  ul {
    margin-top: -10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
`;

const StyledDiv = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  h4 {
    @media (min-width: 1200px) {
      font-size: 30px;
      line-height: 40px;
    }
    text-align: center;
    max-width: 500px;
    margin-top: 20px;
    align-self: center;
    font-family: Oswald;
    font-size: 24px;
    font-weight: 700;
    line-height: 38px;
    color: #ffffff;
  }
`;

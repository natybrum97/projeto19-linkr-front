import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import { LoginContext } from "../contexts/LoginContext";
import api from "../services/api";

export default function UserPage() {
  const authToken = localStorage.getItem("token");
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoged } = useContext(LoginContext);

  const [posts, setPosts] = useState(null);

  function LoadPosts() {
    const promise = api.getUserPost(authToken, id);

    promise
      .then((response) => setPosts(response.data.userPosts))
      .catch((error) =>
        error.response.status === 401
          ? navigate("/")
          : console.log(error.response.data)
      );
  }

  useEffect(() => {
    isLoged();
    LoadPosts(authToken, id);
  });

  return (
    <UserTimeLine>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      <PagesContainer>
        <Container>
          {posts === null ? (
            <h4>Loading...</h4>
          ) : posts === undefined ? (
            <h4>404 Not Found</h4>
          ) : (
            posts.userPosts.length >= 0 && (
              <div>
                <img src={posts.user.pictureUrl} alt="profilePicture" />
                <h1>{posts.user.name}’s posts</h1>
              </div>
            )
          )}
        </Container>
      </PagesContainer>

      <StyledContainer>
        {posts !== null && posts !== undefined && posts.userPosts.length > 0 ? (
          <>
          <ul>
            {posts.userPosts.map((p) => (
              <Post
                key={p.id}
                id={p.id}
                postUrl={p.postUrl}
                postText={p.postText}
                userIdfromPost={posts.user.id}
                name={posts.user.name}
                pictureUrl={posts.user.pictureUrl}
                getData={LoadPosts}
              />
            ))}
          </ul>
          <Trending />
          </>
        ) : (
          posts !== null &&
          posts !== undefined &&
          posts.userPosts.length === 0 && <h4>No Posts Yet</h4>
        )}

      </StyledContainer>
    </UserTimeLine>
  );
}

const PagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  @media (min-width: 1200px) {
    margin-left: 526px;
  }
  min-width: 100vw;
  margin-left: -30px;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
`;

const SearchBarWrapper = styled.div`
  width: 563px;
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

const UserTimeLine = styled.div`
  overflow-x: hidden;
  min-height: calc(100vh - 90px);
  padding-top: 90px;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  h1,
  h4 {
    font-size: 40px;
    font-weight: 700;
    font-family: Oswald;
    color: #fff;
  }

  h4 {
    height: 300px;
    display: flex;
    align-items: center;
    font-size: 25px;
    margin-right: auto;
    margin-left: auto;
  }

  @media (max-width: 1200px) {
    h1 {
      font-size: 30px;
    }
  }

  ul {
    margin-top: -9px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    div {
      width: 100%;
    }
  }
`;

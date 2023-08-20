import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import { LoginContext } from "../contexts/LoginContext";
import api from "../services/api";

export default function UserPage() {
  const { isLoged } = useContext(LoginContext);

  useEffect(() => {
    isLoged();
  })
  
  const authToken = localStorage.getItem("token");
  const { id } = useParams();

  const [posts, setPosts] = useState(null);

  function LoadPosts(token, id) {
    const promise = api.getUserPost(token, id);

    promise.then((response) => {
      setPosts(response.data.userPosts);
    });
    promise.catch((error) => console.log(error.response.data));
  }

  useEffect(() => {
    LoadPosts(authToken, id);
  }, [authToken, id]);

  return (
    <UserTimeLine>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      <Container>
        {posts === null ? (
          <h4>Loading...</h4>
        ) : posts === undefined ? (
          <h4>404 Not Found</h4>
        ) : (
          posts.userPosts.length >= 0 && (
            <>
              <img src={posts.user.pictureUrl} alt="profilePicture" />
              <h1>{posts.user.name}’s posts</h1>
            </>
          )
        )}
      </Container>

      {posts !== null && posts !== undefined && posts.userPosts.length > 0 ? (
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
            />
          ))}
        </ul>
      ) : (
        posts !== null &&
        posts !== undefined &&
        posts.userPosts.length === 0 && <h3>No Posts Yet</h3>
      )}
    </UserTimeLine>
  );
}

const Container = styled.div`
  width: 563px;
  max-width: 100%;
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

const UserTimeLine = styled.div`
  max-width: 100%;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    div{
      width: 100%;
    }
  }
`;

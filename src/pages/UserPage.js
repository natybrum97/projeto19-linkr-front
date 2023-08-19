import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import Post from "../components/Post";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

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
          <h3>Loading...</h3>
        ) : posts === undefined ? (
          <h3>404 Not Found</h3>
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
              name={posts.user.name}
              pictureUrl={posts.user.pictureUrl}
              userPageId={posts.user.id}
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
  h3 {
    font-size: 40px;
    font-weight: 700;
    font-family: Oswald;
    color: #fff;
  }

  h3 {
    height: 300px;
    display: flex;
    align-items: center;
    font-size: 25px;
    margin-right: auto;
    margin-left: auto;
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 30px;
    }
  }
`;

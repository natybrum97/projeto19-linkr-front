import { styled } from "styled-components";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import Post from "../components/Post";

export default function UserPage() {
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

  console.log(posts);

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
          <h2>Loading...</h2>
        ) : posts === undefined ? (
          <h2>404 Not Found</h2>
        ) : (
          posts.userPosts.length >= 0 && (
            <>
              <img src={posts.user.pictureUrl} alt="profilePicture" />
              <h1>{posts.user.name}</h1>
            </>
          )
        )}
      </Container>

      {posts !== null && posts !== undefined && posts.userPosts.length > 0 ? (
        <ul>
          {posts.userPosts.map((p) => ( <li key={p.id}>post aqui</li> // provisório até conseguir fazer os posts aparecer
            // <Post
            //   key={p.id}
            //   id={p.id}
            //   postUrl={p.postUrl}
            //   postText={p.postText}
            //   name={posts.user.name}
            //   pictureUrl={posts.user.pictureUrl}
            // />
          ))}
        </ul>
      ) : (
        posts !== null &&
        posts !== undefined &&
        posts.userPosts.length === 0 && <h2>No Posts Yet</h2>
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
  h2 {
    font-size: 40px;
    font-weight: 700;
    font-family: Oswald;
    color: #fff;
  }

  h2 {
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

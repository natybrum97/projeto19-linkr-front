import axios from "axios";
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
  };

  const [loading, setLoading] = useState(false);
  const notSameUser = localStorage.getItem("userid") !== id;
  const [followState, setFollowState] = useState(null);
  const getFollows = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/follow/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFollowState(data.length);
      setLoading(false);
    } catch (err) {
      alert('não foi possível executar a operação');
      setLoading(false);
    }
  };
  const followUnfollow = async () => {
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/follow`, {idFollowed: id}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getFollows();
    } catch (err) {
      alert('não foi possível executar a operação');
      setLoading(false);
    }
  }

  useEffect(() => {
    if (notSameUser) getFollows();
    isLoged();
    LoadPosts(authToken, id);
  }, [id]);

  return (
    <UserTimeLine>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      <PagesContainer>
        <Container followState={followState}>
          {posts === null ? (
            <h4>Loading...</h4>
          ) : posts === undefined ? (
            <h4>404 Not Found</h4>
          ) : (
            posts.userPosts.length >= 0 && (
              <div>
                <img src={posts.user.pictureUrl} alt="profilePicture" />
                <h1>{posts.user.name}’s posts</h1>
                {notSameUser && followState !== null 
                  && 
                  <button 
                    onClick={followUnfollow}
                    disabled={loading}
                  >{followState === 0 ? 'Follow' : 'Unfollow'}
                  </button>
                }
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
    width: 526px;
    min-width: unset;
    margin-left: -69%;
  }
  min-width: 100vw;
  div {
    min-width: 100vw;
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
    button{
      @media (min-width: 1200px) {
        margin-top: unset;
        margin-left: 400px;
      }
      cursor: pointer;
      margin-top: 71px;
      width: 112px;
      height: 31px;
      border-radius: 5px;
      background-color: ${({ followState }) => followState === 0 ? '#1877F2' : '#FFFFFF'};
      font-family: Lato;
      font-size: 14px;
      font-weight: 700;
      line-height: 17px;
      color: ${({ followState }) => followState === 0 ? '#FFFFFF' : '#1877F2'};
      border: none;
      &:hover{
        opacity: 0.85;
        transition-duration: 400ms;
      }
      &:disabled {
        cursor: default;
        opacity: 0.5;
      }
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

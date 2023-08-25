import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoReloadOutline } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "styled-components";
import { useInterval } from 'usehooks-ts';
import PaginationLoading from "../components/PaginationLoading";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import Trending from "../components/Trending";
import { LoginContext } from "../contexts/LoginContext";
const qtd = 10;

const TimeLinePage = () => {

  const { isLoged } = useContext(LoginContext);

  const [timesFetched, setTimesFetched] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postInput, setPostInput] = useState({
    postUrl: "",
    postText: "",
  });
  const [posts, setPosts] = useState(null);
  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/post?page=${timesFetched}&qtd=${qtd}`);
      setPosts(data);
      setTimesFetched(previous => previous + 1);
      
      setLoading(false);
      setPostInput({ postUrl: "", postText: "" });
    } catch (err) {
      alert("An error occured while trying to fetch the posts, please refresh the page");
      setLoading(false);
      setPostInput({ postUrl: "", postText: "" });
    }
  };
  useEffect(() => {
    isLoged();
    getPosts();
  }, []);

  const [newPosts, setNewPosts] = useState([]);
  const hasPosts = posts !== null && posts.length > 0 && posts !== "You don't follow anyone yet. Search for new friends!";
  useInterval( async () => {      
    if (!hasPosts) return;
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/getNewPosts`, posts.map(({id}) => id));
      setNewPosts(data);
    } catch (err) {
      alert("An error occured while trying to fetch new posts, please refresh the page");
    }
  }, 15000);
  const mergeNewPosts = () => {
    setPosts([...newPosts, ...posts]);
    setNewPosts([]);
  };

  const [hasMore, setHasmore] = useState(true);
  const getMorePosts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/post?page=${timesFetched}&qtd=${qtd}`);
      if (data.length === 0) {
        setHasmore(false);
        setTimesFetched(1);
      } else {
        setPosts(previous => [...data, ...previous]);
        setTimesFetched(previous => previous + 1);
      }
    } catch (err) {
      alert(`An error occured while trying to fetch more ${qtd} posts, please refresh the page`);
    }
  };

  const submitPost = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/post`, postInput, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getPosts();
    } catch (err) {
      alert("There was an error publishing your link");
      setLoading(false);
      setPostInput({ postUrl: "", postText: "" });
    }
  };

  return (
    <StyledTimeLine>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      <h1>timeline</h1>

      <StyledContainer>
        <StyledLeftTimeline>
          <StyledPostForm
            data-test="publish-box"
            onSubmit={(e) => submitPost(e)}
          >
            <StyledDiv>
              <div>
                <img src={localStorage.getItem("url")} alt="userImg" />
              </div>
              <p>What are you going to share today?</p>
            </StyledDiv>
            <input
              data-test="link"
              onChange={(e) =>
                setPostInput((previous) => ({
                  ...previous,
                  postUrl: e.target.value,
                }))
              }
              type="url"
              placeholder="http://..."
              value={postInput.postUrl}
              required
              disabled={loading}
            ></input>
            <textarea
              data-test="description"
              onChange={(e) =>
                setPostInput((previous) => ({
                  ...previous,
                  postText: e.target.value,
                }))
              }
              type="text"
              placeholder="Awesome article about #javascript"
              value={postInput.postText}
              disabled={loading}
            ></textarea>
            <button data-test="publish-btn" disabled={loading}>
              {loading ? "Publishing..." : "Publish"}
            </button>
          </StyledPostForm>

          {newPosts.length > 0 
            &&
              <LoadMorePostsButton onClick={mergeNewPosts}>
                <p>{newPosts.length} new posts, load more!</p> <StyledMergePosts />
              </LoadMorePostsButton>
          }

          {
            (posts === null) 
              ? <h4 data-test="message">Loading...</h4> 
              : (posts === "You don't follow anyone yet. Search for new friends!")
                ? <h4 data-test="message">You don't follow anyone yet. Search for new friends!</h4> 
                : (posts.length === 0) 
                  && <h4 data-test="message">No posts found from your friends</h4>
          }

          {hasPosts 
            && (
              <InfiniteScroll
                dataLength={posts === null ? 0 : posts.length}
                next={getMorePosts}
                hasMore={hasMore}
                loader={<PaginationLoading/>}
              >
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
                      repostCount={p.repostcount}
                    />
                  ))}
                </ul>
              </InfiniteScroll>
          )}
        </StyledLeftTimeline>

        <Trending posts={posts} />
      </StyledContainer>
    </StyledTimeLine>
  );
};

export default TimeLinePage;

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

const StyledTimeLine = styled.div`
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
      margin-left: -670px;
    }
    margin: 16px;
    align-self: flex-start;
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
    margin-bottom: 20px;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledLeftTimeline = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 25px;
`;

const StyledPostForm = styled.form`
  @media (min-width: 1200px) {
    min-width: 500px;
    max-width: 500px;
    height: 178px;
    border-radius: 10px;
    margin-top: 20px;
    button {
      margin-right: 8px;
    }
  }
  position: relative;
  min-width: 100vw;
  height: 174px;
  background-color: #ffffff;
  border-radius: unset;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  div {
    @media (min-width: 1200px) {
      justify-content: unset;
    }
    display: flex;
    flex-direction: row;
    justify-content: center;
    div {
      @media (min-width: 1200px) {
        display: flex;
      }
      margin-top: 9px;
      margin-left: 13px;
      display: none;
      width: 40px;
      height: 40px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 100%;
      }
    }
    p {
      margin: 10px;
      font-family: Lato;
      font-size: 17px;
      font-weight: 300;
      line-height: 20px;
      color: #707070;
    }
  }
  button {
    cursor: pointer;
    position: absolute;
    width: 112px;
    height: 22px;
    bottom: 13px;
    right: 12px;
    border-radius: 5px;
    background-color: #1877f2;
    color: #ffffff;
    font-family: Lato;
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    border: none;
    &:hover {
      opacity: 0.85;
      transition-duration: 400ms;
    }
    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }
  input {
    @media (min-width: 1200px) {
      width: 80%;
      margin-left: 68px;
      margin-top: -5px;
    }
    margin-left: 14px;
    width: 90%;
    height: 30px;
    border-radius: 5px;
    border: none;
    background-color: #efefef;
    color: black;
    font-family: Lato;
    font-size: 13px;
    font-weight: 400;
    padding-left: 10px;
    &::placeholder {
      color: #949494;
    }
    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }
  textarea {
    @media (min-width: 1200px) {
      width: 80%;
      margin-left: 68px;
    }
    margin-left: 14px;
    margin-top: 4px;
    width: 90%;
    height: 47px;
    border-radius: 5px;
    border: none;
    background-color: #efefef;
    color: black;
    font-family: Lato;
    font-size: 13px;
    font-weight: 400;
    padding-left: 10px;
    padding-top: 10px;
    &::placeholder {
      color: #949494;
    }
    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }
`;

const LoadMorePostsButton =  styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 1200px) {
    min-width: 500px;
    max-width: 500px;
    border-radius: 16px;
    margin-bottom: -15px;
  }
  cursor: pointer;
  border: none;
  min-width: 100vw;
  margin-top: 30px;
  height: 46px;
  margin-bottom: -12px;
  background-color: #1877F2;
  box-shadow: 0px 4px 4px 0px #00000040;
  &:hover{
    transition: 400ms;
    opacity: 0.85;
  }
  p{
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    color: #FFFFFF;
  }
`;

const StyledMergePosts = styled(IoReloadOutline)`
  color: #FFFFFF;
  font-size: 18px;
  margin-left: 4px;
`;

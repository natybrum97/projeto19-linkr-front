import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";
import { LoginContext } from "../contexts/LoginContext";

const TimeLine = () => {
  const [postInput, setPostInput] = useState({
    postUrl: "",
    postText: "",
  });

  const [hashtagsTrending, setTrending] = useState(null);

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(null);

  const { isLoged } = useContext(LoginContext);

  const getPosts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/post`);

      // const res = await axios.get(`${process.env.REACT_APP_API_URL}/trending`);
      // console.log("resposta: ", res.data);

      // setTrending(res.data);
      setPosts(data);
      setLoading(false);
      setPostInput({ postUrl: "", postText: "" });
    } catch (err) {
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      setLoading(false);
      setPostInput({ postUrl: "", postText: "" });
    }
  };
  useEffect(() => {
    isLoged();
    getPosts();
  }, []);

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
      <div>
        <StyledPostForm data-test="publish-box" onSubmit={(e) => submitPost(e)}>
          <div>
            <div>
              <img src={localStorage.getItem("url")} alt="userImg" />
            </div>
            <p>What are you going to share today?</p>
          </div>
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

        {posts === null ? (
          <h4 data-test="message">Loading...</h4>
        ) : (
          posts.length === 0 && (
            <h4 data-test="message">There are no posts yet</h4>
          )
        )}

        {posts !== null && posts.length > 0 && (
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
      </div>

      <StyledTrending>
        {hashtagsTrending === null ? (
          <h4>Loading...</h4>
        ) : (
          hashtagsTrending.length === 0 && <h4>There are no trends yet</h4>
        )}

        {hashtagsTrending !== null && posts.length > 0 && (
          <ul>
            {hashtagsTrending.map((trend, i) => (
              <p key={i}>{trend.hashtagText}</p>
            ))}
          </ul>
        )}
      </StyledTrending>
    </StyledTimeLine>
  );
};

export default TimeLine;

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

const StyledPostForm = styled.form`
  @media (min-width: 1200px) {
    width: 500px;
    height: 178px;
    border-radius: 10px;
    margin-top: 20px;
    button {
      margin-right: 8px;
    }
  }
  position: relative;
  width: 100%;
  height: 174px;
  background-color: #ffffff;
  border-radius: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      margin-left: 46px;
      margin-top: -5px;
    }
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
      margin-left: 46px;
    }
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

const StyledTrending = styled.div`
  margin-top: 72px;
  background-color: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
`;

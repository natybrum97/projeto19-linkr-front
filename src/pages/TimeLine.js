import { useState } from "react";
import { styled } from "styled-components";
import { TIMELINEPOSTS } from "../MOCK/TIMELINEPOSTS";
import Post from "../components/Post";
import SearchBar from "../components/SearchBar";

const TimeLine = () => {

  const [postInput, setPostInput] = useState({
    postUrl: '', postText: '',
  });

  const submitPost = (e) => {
    e.preventDefault();
    console.log(postInput);
    setPostInput({ postUrl: '', postText: '' });
  }

  return (
    <StyledTimeLine>

      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>

      <h1>timeline</h1>
      <div>
        <StyledPostForm onSubmit={e => submitPost(e)}>
          <div>
            <div><img src='https://i.pinimg.com/736x/cf/77/d2/cf77d222c2ae919cdd2f9fcdbb3e4906.jpg'/></div>
            <p>What are you going to share today?</p>
          </div>
          <input onChange={e => setPostInput(previous => ({...previous, postUrl: e.target.value}))} 
            type='url' placeholder="http://..." value={postInput.postUrl} required
          ></input>
          <textarea onChange={e => setPostInput(previous => ({...previous, postText: e.target.value}))} 
            type='text' placeholder="Awesome article about #javascript" value={postInput.postText}
          ></textarea>
          <button>Publish</button>
        </StyledPostForm>
        <ul>
          {TIMELINEPOSTS.map(post => <Post post={post} key={post.id} />)}
        </ul>
      </div>
    </StyledTimeLine>
  )
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
  h1{
    @media (min-width: 1200px) {
      margin-left: 420px;
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
    color: #FFFFFF;
  }
  div{
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  ul{
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
    button{
      margin-right: 8px;
    }
  }
  position: relative;
  width: 100%;
  height: 174px;
  background-color: #FFFFFF;
  border-radius: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  div{
    @media (min-width: 1200px) {
      justify-content: unset;
    }
    display: flex;
    flex-direction: row;
    justify-content: center;
    div{
      @media (min-width: 1200px) {
        display: flex;
      }
      margin-top: 9px;
      margin-left: 13px;  
      display: none;
      width: 40px; height: 40px;
      img{
        width: 100%; height: 100%;
        object-fit: cover;
        border-radius: 100%;
      }
    }
    p{
      margin: 10px;
      font-family: Lato;
      font-size: 17px;
      font-weight: 300;
      line-height: 20px;
      color: #707070;
    }
  }
  button{
    cursor: pointer;
    position: absolute;
    width: 112px;
    height: 22px;
    bottom: 13px;
    right: 12px;
    border-radius: 5px;
    background-color: #1877F2;
    color: #FFFFFF;
    font-family: Lato;
    font-size: 13px;
    font-weight: 700;
    line-height: 16px;
    border: none;
    &:hover{
      opacity: 0.85;
      transition-duration: 400ms;
    }
  }
  input{
    @media (min-width: 1200px) {
      width: 80%;
      margin-left: 46px;
      margin-top: -5px;
    }
    width: 90%;
    height: 30px;
    border-radius: 5px;
    border: none;
    background-color: #EFEFEF;
    color: black;
    font-family: Lato;
    font-size: 13px;
    font-weight: 400;
    padding-left: 10px;
    &::placeholder{
      color: #949494;
    }
  }
  textarea{
    @media (min-width: 1200px) {
      width: 80%;
      margin-left: 46px;
    }
    margin-top: 4px;
    width: 90%;
    height: 47px;
    border-radius: 5px;
    border: none;
    background-color: #EFEFEF;
    color: black;
    font-family: Lato;
    font-size: 13px;
    font-weight: 400;
    padding-left: 10px;
    padding-top: 10px;
    &::placeholder{
      color: #949494;
    }
  }
`;
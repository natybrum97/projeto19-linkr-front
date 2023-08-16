import { AiOutlineHeart } from "react-icons/ai";
import { styled } from "styled-components";

const Post = ({ post: { postUrl, postText, user: { name, pictureUrl }, urlMetaData: { title, description, image } } }) => {
  return (
    <StyledPost>
      <PostInfo>
        <div><img src={pictureUrl}/></div>
        <StyledHeart></StyledHeart>
        <p>99 likes</p>
      </PostInfo>
      <PostText>
        <h2>{name}</h2>
        <p>{postText}</p>
      </PostText>
      <Snippet onClick={() => window.open(postUrl)}>
        <div>
          <h1>{title}</h1>
          <h2>{description}</h2>
          <h3>{postUrl}</h3>
        </div>
        <div><img src={image}/></div>
      </Snippet>
    </StyledPost>
  );
};

export default Post;

const Snippet = styled.div`
  @media (min-width: 1200px) {
    min-width: 416px;
    max-width: 416px;
    height: 155px;
  }
  cursor: pointer;
  position: absolute;
  height: 115px;
  bottom: 15px;
  right: 15px;
  min-width: 76%;
  max-width: 76%;
  border: 1px solid #4D4D4D;
  border-radius: 8px;
  background-color: #171717;
  &:hover{
    transition-duration: 400ms;
    opacity: 0.85;
  }
  display: flex;
  div:first-child{
    @media (min-width: 1200px) {
      width: calc(100% - 180px);
      margin: 16px;
    }
    width: calc(100% - 130px);
    display: flex;
    flex-direction: column;
    font-family: Lato;
    align-self: start;
    margin: 8px;
    h1{
      @media (min-width: 1200px) {
        font-size: 16px;
        line-height: 19px;
        margin-bottom: 16px;
        max-height: 19px;
      }
      max-height: 13px;
      overflow-y: auto;
      word-break: break-all;
      text-align: left;
      margin: 0px;
      margin-bottom: 8px;
      font-size: 11px;
      font-weight: 400;
      line-height: 13px;
      color: #CECECE;
      align-self: flex-start;
    }
    h2{
      @media (min-width: 1200px) {
        font-size: 11px;
        line-height: 13px;
        margin-bottom: 16px;
      }
      height: 60px;
      overflow-y: auto;
      word-break: break-all;
      margin-bottom: 8px;
      font-size: 9px;
      font-weight: 400;
      line-height: 11px;
      color: #9B9595;
      align-self: flex-start;
    }
    h3{
      @media (min-width: 1200px) {
        font-size: 11px;
        line-height: 13px;
        margin-bottom: 16px;
        max-height: 15px;
      }
      max-height: 9px;
      overflow-y: auto;
      word-break: break-all;
      font-size: 9px;
      font-weight: 400;
      line-height: 11px;
      color: #CECECE;
      align-self: flex-start;
    }
  }
  div:last-child{
    position: absolute;
    right: 0;
    @media (min-width: 1200px) {
      width: 155px; height: 155px;
    }
    width: 115px; height: 115px;
    background-color: #4D4D4D;
    border-radius: 0 6px 6px 0;
    img{
      width: 100%; height: 100%;
      object-fit: cover;
      border-radius: 0 6px 6px 0;
    }
  }
`;

const StyledPost = styled.li`
  @media (min-width: 1200px) {
    margin-top: 30px;
    width: 500px;
    border-radius: 10px;
    height: 276px;
  }
  position: relative;
  margin-top: 13px;
  width: 100%;
  height: 220px;
  background-color: #171717;
  display: flex;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 9px;
  margin-left: 13px;  
  max-width: 40px;
  left: 0;
  display: flex;
  align-items: center;
  div{
    width: 40px; height: 40px;
    img{
      width: 100%; height: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
  }
  p{
    font-family: Lato;
    font-size: 9px;
    font-weight: 400;
    line-height: 11px;
    color: #FFFFFF;
    }
`;

const PostText =  styled.div`
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  h2{
    align-self: flex-start;
    margin-top: 10px;
    margin-bottom: 4px;
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
    line-height: 20.4px;
    color: #FFFFFF;
  }
  p{
    align-self: flex-start;
    max-width: 95%;
    word-break: break-all;
    @media (min-width: 1200px) {
      max-height: 52px;
    }
    max-height: 34px;
    overflow-y: auto;
    font-family: Lato;
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    color: #B7B7B7;
  }
`;

const StyledHeart = styled(AiOutlineHeart)`
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 6px;
  font-size: 20px;
  color: #FFFFFF;
  &:hover{
    transition-duration: 400ms;
    color: #AC0000;
  }
`;
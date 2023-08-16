import { AiOutlineHeart } from "react-icons/ai";
import { styled } from "styled-components";

const Post = ({ post: { postUrl, postText, user: { name, pictureUrl } } }) => {
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
        
      </Snippet>
    </StyledPost>
  );
};

export default Post;

const Snippet = styled.div`
  @media (min-width: 1200px) {
    min-width: 405px;
    max-width: 405px;
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
`;

const StyledPost = styled.li`
  @media (min-width: 1200px) {
    margin-top: 30px;
    width: 500px;
    border-radius: 10px;
  }
  position: relative;
  margin-top: 13px;
  width: 100%;
  height: 232px;
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
    @media (min-width: 1200px) {
      margin-left: -62%;
    }
    margin-left: -50%;
    margin-top: 10px;
    margin-bottom: 4px;
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
    line-height: 20.4px;
    color: #FFFFFF;
  }
  p{
    @media (min-width: 1200px) {
      margin-left: unset;
    }
    margin-left: -16px;
    max-width: 95%;
    word-break: break-all;
    max-height: 52px;
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
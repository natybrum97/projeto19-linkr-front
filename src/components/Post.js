import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Post = ({
  post: {
    id,
    postId = id,
    postUrl,
    postText,
    user: { name, pictureUrl },
  },
}) => {
  const [urlMetaData, setUrlMetaData] = useState({
    title: "",
    description: "",
    image: undefined,
  });
  const fetchMetaData = async () => {
    try {
      const {
        data: { title, description, images },
      } = await axios.get(`https://jsonlink.io/api/extract?url=${postUrl}`);
      setUrlMetaData(() => ({ title, description, image: images[0] }));
    } catch ({
      response: {
        status,
        statusText,
        data: { message },
      },
    }) {
      console.log(`${status} ${statusText}\n${message}`);
    }
  };
  useEffect(() => {
    fetchMetaData();
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showLikesTooltip, setShowLikesTooltip] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [likeActionDone, setLikeActionDone] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  const nick = localStorage.getItem("user");

  useEffect(() => {
    const fetchUserLikedStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/likes/${postId}`
        );
        const data = response.data;

        if (data.usersLiked.length > 0) {
          const usernames = data.usersLiked.map((user) => user.username);
          setUsernames(usernames);
        }
      } catch (error) {
        console.error("Erro ao obter os usernames de quem curtiu:", error);
      }
    };

    fetchUserLikedStatus();
  }, [postId]);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/likes/${postId}`
        );
        const data = response.data;

        setLikeCount(data.likesCount);

        if (data.usersLiked.length > 0) {
          const usernames = data.usersLiked.map((user) => user.username);
          setUsernames(usernames);
        }
      } catch (error) {
        console.error("Erro ao obter a contagem de curtidas:", error);
      }
    };

    const fetchUserLikedStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/likes/${postId}`
        );
        const data = response.data;
        const userLiked = data.usersLiked.some(
          (like) => like.userId === parseInt(userId)
        );
        setIsLiked(userLiked);
        setLikeCount(data.likesCount);
        if (!userLiked) {
          // Remove o nome da lista de usernames caso não tenha curtido
          setUsernames((prevUsernames) =>
            prevUsernames.filter((username) => username !== nick)
          );
        }
      } catch (error) {
        console.error("Erro ao obter a contagem de curtidas:", error);
      }
    };

    if (likeActionDone) {
      fetchLikeCount(); // Atualiza a lista de usernames
      fetchUserLikedStatus(); // Atualiza o status de curtida do usuário
      setLikeActionDone(false); // Reseta o estado da ação
    }

    fetchUserLikedStatus();
  }, [postId, userId, likeActionDone, nick]);

  const handleLikeClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/like`,
        {
          postId: postId,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLiked(true);
      setLikeCount(likeCount + 1);
      setLikeActionDone(true); // Atualiza o estado após a ação
    } catch (error) {
      console.error("Erro ao curtir o post:", error);
    }
  };

  const handleUnlikeClick = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/unlike`,
        {
          postId: postId,
          userId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLiked(false);
      setLikeCount(likeCount - 1);
      setLikeActionDone(true); // Atualiza o estado após a ação
    } catch (error) {
      console.error("Erro ao descurtir o post:", error);
    }
  };
  const textPost = postText.split(" ");

  const renderBoldHashtags = () => {
    return textPost.map((word, i) => {
      if (word[0] === "#") {
        return (
          <StyledLink to={`/hashtag/${word.replace("#", "")}`}>
            <strong key={i}> {word} </strong>
          </StyledLink>
        );
      } else {
        return <span key={i}> {word} </span>;
      }
    });
  };

  return (
    <StyledPost>
      <PostInfo>
        <div>
          <img src={pictureUrl} alt="pictureUrl" />
        </div>
        <div>
          {isLiked ? (
            <StyledFilledHeart
              onClick={handleUnlikeClick}
              onMouseEnter={() => setShowLikesTooltip(true)}
              onMouseLeave={() => setShowLikesTooltip(false)}
            />
          ) : (
            <StyledHeart
              onClick={handleLikeClick}
              onMouseEnter={() => setShowLikesTooltip(true)}
              onMouseLeave={() => setShowLikesTooltip(false)}
            />
          )}
          {showLikesTooltip && (
            <LikesTooltip>
              {usernames.length === 0 ? (
                <div>Seja o primeiro a curtir isto</div>
              ) : (
                usernames.slice(0, 2).map((username, index) => (
                  <div key={index}>
                    {index === 0 && username === nick ? "Você" : username}
                    {index === 0 && usernames.length === 1 ? " curtiu" : ""}
                    {index === 0 && usernames.length > 1 ? "," : ""}
                    {index === 1 && usernames.length === 2 ? " curtiu" : ""}
                  </div>
                ))
              )}
              {usernames.length > 2
                ? ` e mais ${usernames.length - 2} pessoa${
                    usernames.length - 2 > 1 ? "s" : ""
                  } `
                : ""}
            </LikesTooltip>
          )}
        </div>
        <p>{likeCount} likes</p>
      </PostInfo>

      <PostText>
        <h2>{name}</h2>
        <p>{renderBoldHashtags()}</p>
      </PostText>
      <Snippet onClick={() => window.open(postUrl)}>
        <div>
          <h1>{urlMetaData.title}</h1>
          <h2>{urlMetaData.description}</h2>
          <h3>{postUrl}</h3>
        </div>
        <div>
          {urlMetaData.image && (
            <img src={urlMetaData.image} alt="urlMetaDataImage" />
          )}
        </div>
      </Snippet>
    </StyledPost>
  );
};

export default Post;

const LikesTooltip = styled.div`
  position: absolute;
  bottom: calc(30% + 30px);
  left: 7%;
  transform: translateX(-50%);
  width: 50% !important;
  height: 20% !important;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 3px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  white-space: nowrap;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  &:before {
    content: "";
    position: absolute;
    top: -20px;
    left: 40%;
    transform: translateX(-50%);

    transform: rotate(180deg);
    border-width: 10px;
    border-style: solid;
    border-color: rgba(255, 255, 255, 0.9) transparent transparent transparent;
  }
`;

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
  border: 1px solid #4d4d4d;
  border-radius: 8px;
  background-color: #171717;
  &:hover {
    transition-duration: 400ms;
    opacity: 0.85;
  }
  display: flex;
  div:first-child {
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
    h1 {
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
      color: #cecece;
      align-self: flex-start;
    }
    h2 {
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
      color: #9b9595;
      align-self: flex-start;
    }
    h3 {
      @media (min-width: 1200px) {
        font-size: 11px;
        line-height: 13px;
        margin-bottom: 16px;
        max-height: 15px;
      }
      max-height: 12px;
      overflow-y: auto;
      word-break: break-all;
      font-size: 9px;
      font-weight: 400;
      line-height: 11px;
      color: #cecece;
      align-self: flex-start;
    }
  }
  div:last-child {
    position: absolute;
    right: 0;
    @media (min-width: 1200px) {
      width: 155px;
      height: 155px;
    }
    width: 115px;
    height: 115px;
    background-color: #4d4d4d;
    border-radius: 0 6px 6px 0;
    img {
      width: 100%;
      height: 100%;
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
  div {
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
    font-family: Lato;
    font-size: 9px;
    font-weight: 400;
    line-height: 11px;
    color: #ffffff;
  }
`;

const PostText = styled.div`
  margin-left: 13px;
  display: flex;
  flex-direction: column;
  h2 {
    align-self: flex-start;
    margin-top: 10px;
    margin-bottom: 4px;
    font-family: Lato;
    font-size: 17px;
    font-weight: 400;
    line-height: 20.4px;
    color: #ffffff;
  }
  p {
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
    color: #b7b7b7;
  }

  strong {
    font-weight: 700;
  }
`;

const StyledHeart = styled(AiOutlineHeart)`
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 6px;
  font-size: 20px;
  color: #ffffff;
  &:hover {
    transition-duration: 400ms;
    color: #ac0000;
  }
`;

const StyledFilledHeart = styled(AiFillHeart)`
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 6px;
  font-size: 20px;
  color: #ac0000;
  &:hover {
    transition-duration: 400ms;
    color: #ffffff;
    ${StyledPost}:hover & {
      color: #ffffff;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

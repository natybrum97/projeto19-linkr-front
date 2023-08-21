import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { styled } from "styled-components";

const Post = ({
  id,
  postId = id,
  postUrl,
  postText,
  userIdfromPost,
  name,
  pictureUrl,
  getData
}) => {
  const { pathname } = useLocation();

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
  const [ifEdited, setIfEdited] = useState(0);
  const [editedPostText, setEditedPostText] = useState(postText);
  const [renderBoldHashtags, setBoldHashTags] = useState(null);
  const changeBoldHashTags = () => {
    setBoldHashTags(() => {
      let string;
      if (ifEdited !== 0) {
        string = editedPostText;
      } else {
        string = postText;
      }

      return string?.split(" ").map((word, i) => {
        if (word[0] === "#") {
          return (
            <StyledLink key={i} to={`/hashtag/${word.replace("#", "")}`}>
              <strong> {word} </strong>
            </StyledLink>
          );
        } else {
          return <span key={i}> {word} </span>;
        }
      });
    });
  };
  useEffect(() => {
    fetchMetaData();
    changeBoldHashTags();
  }, [ifEdited]);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showLikesTooltip, setShowLikesTooltip] = useState(false);
  const [usernames, setUsernames] = useState([]);
  const [likeActionDone, setLikeActionDone] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const editPostRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const editPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/post/${id}`,
        { postUrl, postText: editedPostText },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setOpenEditPost(false);
      setLoading(false);
      setIfEdited((previous) => previous + 1);
    } catch (err) {
      alert("não foi possível salvar as alterações");
      setLoading(false);
    }
  };
  const enableEdit = () => {
    setOpenEditPost((previous) => !previous);
    setTimeout(() => {
      if (!openEditPost) editPostRef.current.focus();
    }, 1);
  };
  useEffect(() => {
    const cancelEdit = (e) => {
      if (e.key === "Escape") setOpenEditPost(false);
    };
    window.addEventListener("keydown", cancelEdit);
    return () => {
      window.removeEventListener("keydown", cancelEdit);
    };
  }, []);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Lógica para deletar o post
      await axios.delete(`${process.env.REACT_APP_API_URL}/post/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Fechar o modal após a exclusão
      setShowDeleteModal(false);

      getData();
    } catch (error) {
      alert("Não foi possivel deletar o post ");
      setShowDeleteModal(false);

      console.error("Erro ao deletar o post:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <StyledPost data-test="post">
      {parseInt(userId) === userIdfromPost && (
        <>
          <StyledTrash data-test="delete-btn" onClick={handleDeleteClick} />
          <StyledEdit data-test="edit-btn" onClick={enableEdit} />
        </>
      )}
      {showDeleteModal && (
        <Modal onClick={() => setShowDeleteModal(false)}>
          <ModalContent>
            <p>Are you sure you want to delete this post?</p>
            <Button data-test="cancel" cancel onClick={handleDeleteCancel}>No, go back</Button>
            <Button data-test="confirm" onClick={handleDeleteConfirm}>Yes, delete it</Button>
          </ModalContent>
        </Modal>
      )}
      <PostInfo>
        <div>
          <img src={pictureUrl} alt="pictureUrl" />
        </div>
        <div>
          {isLiked ? (
            <StyledFilledHeart data-test="like-btn"
              pathname={pathname.slice(1, 5)}
              onClick={handleUnlikeClick}
              onMouseEnter={() => setShowLikesTooltip(true)}
              onMouseLeave={() => setShowLikesTooltip(false)}
            />
          ) : (
            <StyledHeart data-test="like-btn"
              pathname={pathname.slice(1, 5)}
              onClick={handleLikeClick}
              onMouseEnter={() => setShowLikesTooltip(true)}
              onMouseLeave={() => setShowLikesTooltip(false)}
            />
          )}
          {showLikesTooltip && (
            <LikesTooltip data-test="tooltip">
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
        <p data-test="counter">{likeCount} likes</p>
      </PostInfo>

      <PostText>
        <h2 data-test="username">
          <Link to={`/user/${userIdfromPost}`}>{name}</Link>
        </h2>
        {!openEditPost ? (
          <p data-test="description">{renderBoldHashtags}</p>
        ) : (
          <form
            onSubmit={(e) => {
              editPost(e);
            }}
          >
            <input data-test="edit-input"
              onChange={(e) => setEditedPostText(e.target.value)}
              value={editedPostText}
              disabled={loading}
              type="text"
              ref={editPostRef}
              tabIndex={0}
            ></input>
          </form>
        )}
      </PostText>
      <Snippet
        to={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-test="link"
      >
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

const Modal = styled.div`
  cursor: pointer;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;

  z-index: 1000;
`;
const ModalContent = styled.div`
  @media (min-width: 1200px) {
    max-width: 40%;
  }
  max-width: 75%;
  height: 180px;
  border-radius: 50px;
  background-color: #333;
  padding: 20px;

  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;

  display: flex;
  justify-content: space-between;
  align-items: center;
  button{
    position: absolute;
    margin-top: 120px;
  }
  button:nth-child(3){
    margin-left: 160px;
  }
  button:nth-child(2){
    margin-left: -140px;
  }
  p {
    @media (min-width: 1200px) {
      font-size: 30px;
      font-weight: 700;
    }
    font-family: Lato;
    font-size: 22px;
    font-weight: 600;
    line-height: 41px;
    color: white;
  }
`;

const Button = styled.button`
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  width: 130px;
  font-size: 16px;
  margin: 0 10px;
  cursor: pointer;
  background-color: ${({ cancel }) => (cancel ? "#fff" : "#007BFF")};
  color: ${({ cancel }) => (cancel ? "#007BFF" : "#fff")};

  &:hover {
    opacity: 0.8;
  }
`;

const LikesTooltip = styled.div`
  position: absolute;
  bottom: calc(30% + 30px);
  left: 7%;
  transform: translateX(-45%);
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

const Snippet = styled(Link)`
  @media (min-width: 1200px) {
    min-width: 416px;
    max-width: 416px;
    height: 155px;
  }
  text-decoration: none;
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
  a {
    color: #ffffff;
    text-decoration: none;
  }
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
  form {
    width: 92%;
    align-self: flex-start;
    @media (min-width: 1200px) {
      width: 94.75%;
    }
    input {
      margin-top: 3px;
      width: 100%;
      height: 38px;
      border-radius: 7px;
      border: none;
      color: #4c4c4c;
      font-size: 14px;
      font-weight: 400;
      line-height: 17px;
      padding-left: 4px;
      &:disabled {
        opacity: 0.5;
      }
    }
  }
`;

const StyledHeart = styled(AiOutlineHeart)`
  position: ${({ pathname }) => (pathname === "user" ? "absolute" : "unset")};
  left: 23px;
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
  position: ${({ pathname }) => (pathname === "user" ? "absolute" : "unset")};
  left: 23px;
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

const StyledTrash = styled(BsFillTrashFill)`
  position: absolute;
  color: white;
  font-size: 16px;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: red;
    transition-duration: 400ms;
  }
`;

const StyledEdit = styled(BsFillPencilFill)`
  margin-right: 23px;
  position: absolute;
  color: white;
  font-size: 16px;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
  &:hover {
    color: green;
    transition-duration: 400ms;
  }
`;

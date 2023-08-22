import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
const CommentsModal = ({ isOpen, onClose, comments }) => {
  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>
          <AiOutlineClose />
        </CloseButton>
        <CommentList>
          {comments.map((comment, index) => (
            <Comment key={index}>{comment}</Comment>
          ))}
        </CommentList>
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Comment = styled.li`
  margin-bottom: 10px;
  font-size: 14px;
`;

export default CommentsModal;

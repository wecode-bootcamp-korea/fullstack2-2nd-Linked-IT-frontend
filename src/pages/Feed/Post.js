import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PostProfile from './PostProfile';
import PostContent from './PostContent';
import PostSocialInteract from './PostSocialInteract';
import PostReply from './PostReply';
import WritePostModal from './WritePostModal';

export default function Post({ myProfileData, postData, deletePost }) {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmMsg, setDeleteConfirmMsg] = useState(false);
  const [numOfReplys, setNumOfReplys] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    setDeleteConfirmMsg(false);
  };

  const openEditModal = () => {
    setIsModalOpen(true);
    setIsEditModalOpen(false);
  };

  const deleteMsg = () => {
    setDeleteConfirmMsg(!deleteConfirmMsg);
    setIsEditModalOpen(false);
  };

  const editPost = postValue => {
    postData.text = postValue;
  };

  const selectDeletingPost = () => {
    deletePost(postData.id);
  };

  const closeDeleteMsg = () => {
    setDeleteConfirmMsg(false);
  };

  const handleReplyOepn = () => {
    setIsReplyOpen(!isReplyOpen);
  };

  const clickWriteBtn = () => {
    const url = ``;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: ``,
        text: ``,
      }),
    })
      .then(res => res.json())
      .then(console.log)
      .catch(console.log);
  };

  return (
    <PostWrap>
      {myProfileData.id === postData.userId && (
        <EditBtn onClick={handleEditModal}>
          <img alt="EditBtn" src="/Images/ico_etc.svg" />
        </EditBtn>
      )}
      {isEditModalOpen && (
        <EditModal>
          <EditPost onClick={openEditModal}>
            <FontAwesomeIcon icon={faPen} />
            <span>변경</span>
          </EditPost>
          <DeletePost onClick={deleteMsg}>
            <FontAwesomeIcon icon={faTrashAlt} />
            <span>삭제</span>
          </DeletePost>
        </EditModal>
      )}
      {isModalOpen && (
        <WritePostModal
          myProfileData={myProfileData}
          postData={postData}
          setIsModalOpen={setIsModalOpen}
          editPost={editPost}
        />
      )}
      {deleteConfirmMsg && (
        <DeleteMsg>
          <span>삭제하시겠습니까?</span>
          <DeleteBtn onClick={selectDeletingPost}>삭제</DeleteBtn>
          <CancelBtn onClick={closeDeleteMsg}>취소</CancelBtn>
        </DeleteMsg>
      )}
      <PostProfile postData={postData} />
      <PostContent postData={postData} />
      <PostSocialInteract
        handleReply={handleReplyOepn}
        numOfReplys={numOfReplys}
      />
      {isReplyOpen && (
        <PostReply
          myProfileData={myProfileData}
          postData={postData}
          numOfReplys={setNumOfReplys}
        />
      )}
    </PostWrap>
  );
}

const PostWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 540px;
  max-width: 760px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 12px;
  background-color: white;
`;

const EditBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 25px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.borderGrey};
  }

  img {
    width: 15px;
    opacity: 0.5;
  }
`;

const EditModal = styled.div`
  position: absolute;
  top: 15px;
  right: 50px;
  height: 65px;
  width: 100px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  box-shadow: 0px 3px 5px 0px #808080;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 0.9rem;

  span {
    margin-left: 10px;
  }
`;

const EditPost = styled.span`
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
`;

const DeletePost = styled.span`
  display: block;
  cursor: pointer;
`;

const DeleteMsg = styled.div`
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 50px;
  height: 66px;
  width: 120px;
  padding-top: 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.white};
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.fontGrey};
    font-size: 0.8rem;
  }
`;

const DeleteBtn = styled.button`
  margin: 4px 7px 0 3px;
  padding-top: 3px;
  height: 22px;
  width: 43px;
  border: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  margin-top: 4px;
  padding-top: 3px;
  height: 22px;
  width: 43px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 12px;
  background-color: white;
  color: ${({ theme }) => theme.colors.fontGrey};
  cursor: pointer;
`;

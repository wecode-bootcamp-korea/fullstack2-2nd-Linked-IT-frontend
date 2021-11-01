import { useState } from 'react';
import styled from 'styled-components';
import PostProfile from './PostProfile';
import PostContent from './PostContent';
import PostSocialInteract from './PostSocialInteract';
import PostReply from './PostReply';

export default function Post({ myProfileData, postData, deletePost }) {
  const [showReply, setShowReply] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [numOfReplys, setNumOfReplys] = useState(0);

  const handleReply = () => {
    setShowReply(!showReply);
  };

  const handleDeleteMsg = () => {
    setShowDelete(!showDelete);
  };

  const selectDeletePost = () => {
    deletePost(postData.id);
  };

  return (
    <PostWrap>
      <DeleteBtn onClick={handleDeleteMsg}>
        <img alt="deleteBtn" src="/Images/ico_close.svg" />
      </DeleteBtn>
      {showDelete && (
        <DeleteMsg onClick={selectDeletePost}>삭제하시겠습니까?</DeleteMsg>
      )}
      <PostProfile postData={postData} />
      <PostContent postData={postData} />
      <PostSocialInteract handleReply={handleReply} numOfReplys={numOfReplys} />
      {showReply && (
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

const DeleteBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 25px;
  background-color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.borderGrey};
    cursor: pointer;
  }

  img {
    width: 15px;
    opacity: 0.5;
  }
`;

const DeleteMsg = styled.span`
  display: inline-block;
  position: absolute;
  top: 45px;
  right: 20px;
  height: 25px;
  width: 110px;
  padding-top: 7px;
  border: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.btnNavy};
  color: white;
  font-size: 0.8rem;

  &:hover {
    cursor: pointer;
  }
`;

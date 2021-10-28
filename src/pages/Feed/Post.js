import React, { useState } from 'react';
import styled from 'styled-components';
import PostProfile from './PostProfile';
import PostContent from './PostContent';
import PostSocialInteract from './PostSocialInteract';
import PostReply from './PostReply';

export default function Post(props) {
  const { ...myProfileData } = props.myProfileData;
  const { ...postData } = props.postData;

  const [showReply, setShowReply] = useState(false);

  const handleReply = () => {
    setShowReply(!showReply);
  };

  return (
    <PostWrap>
      <PostProfile postData={postData} />
      <PostContent postData={postData} />
      <PostSocialInteract
        myProfileData={myProfileData}
        handleReply={handleReply}
      />
      {showReply && <PostReply myProfileData={myProfileData} />}
    </PostWrap>
  );
}

const PostWrap = styled.div`
  position: relative;
  display: inline-block;
  width: 45%;
  min-width: 540px;
  max-width: 760px;
  margin: 0 22px 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 12px;
  background-color: white;
`;

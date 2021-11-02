import { useState } from 'react';
import styled from 'styled-components';
import FeedProfile from './FeedProfile';
import WritePost from './WritePost';
import Post from './Post';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import MY_PROFILE_DATA from './data/MyProfileData';
import POST_DATA from './data/PostData';

export default function Feed() {
  const { ...myProfileData } = MY_PROFILE_DATA;
  const [postList, setPostList] = useState(POST_DATA);

  const addPost = newPostData => {
    const addedList = [...postList].concat(newPostData);
    setPostList(addedList);
  };

  const deletePost = deletePostId => {
    const deletedList = [...postList].filter(el => el.id !== deletePostId);
    setPostList(deletedList);
  };

  const reversedPostList = [...postList].reverse();

  return (
    <Body>
      <FeedProfile myProfileData={myProfileData} />
      <PostWrap>
        <WritePost
          myProfileData={myProfileData}
          postList={postList}
          addPost={addPost}
        />
        {reversedPostList.map(data => {
          return (
            <Post
              key={data.id}
              postData={data}
              myProfileData={myProfileData}
              deletePost={deletePost}
            />
          );
        })}
      </PostWrap>
      <FloatingFooter />
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 60px;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
  text-align: center;
`;

const PostWrap = styled.div`
  margin: 0 10px;
  width: 40%;
  min-width: 540px;
  max-width: 760px;
`;

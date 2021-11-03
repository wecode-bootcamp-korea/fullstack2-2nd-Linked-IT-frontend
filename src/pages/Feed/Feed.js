import { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeedProfile from './FeedProfile';
import WritePost from './WritePost';
import Post from './Post';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import Loader from '../../components/Loader/Loader';
import MY_PROFILE_DATA from './data/MyProfileData';
import POST_DATA from './data/PostData';
import POST_DATA2 from './data/PostData2';

export default function Feed() {
  const { ...myProfileData } = MY_PROFILE_DATA;
  const [postList, setPostList] = useState(POST_DATA);
  const [infiniteTarget, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Post 게시글 추가
  const addPost = newPostData => {
    const addedList = [...postList].concat(newPostData);
    setPostList(addedList);
  };

  //Post 게시글 삭제
  const deletePost = deletePostId => {
    const deletedList = [...postList].filter(el => el.id !== deletePostId);
    setPostList(deletedList);
  };

  const reversedPostList = [...postList].reverse();

  //Infinte Scroll 구현
  const QUERY_LIMIT = 8;

  const options = { rootMargin: '0px', threshold: 1 };

  async function callback([entry], observer) {
    console.log('callback'); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.

    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await getMoreItem(postList.length, QUERY_LIMIT);
      observer.observe(entry.target);
    }
  }

  async function getMoreItem() {
    console.log('getMoreItem', postList); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setPostList(postList => postList.concat(POST_DATA2));
    setIsLoading(false);
  }

  console.log(postList);

  useEffect(() => {
    console.log('infiniteTarget effect'); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.

    let observer;
    if (infiniteTarget) {
      console.log('target');
      observer = new IntersectionObserver(callback, options);
      observer.observe(infiniteTarget);
    }
    return () => observer && observer.disconnect();
  }, [infiniteTarget]);

  useEffect(() => {
    console.log('postList effect'); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.
    console.log(postList); // API 연결 때를 위해 남겨두었습니다. 양해 부탁드립니다.
  }, [postList]);

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
        <InfiniteDiv ref={setTarget} />
      </PostWrap>
      <FloatingFooter />
      {isLoading && <Loader />}
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

  footer.modal {
    text-align: left;
  }
`;

const PostWrap = styled.div`
  margin: 0 10px;
  width: 40%;
  min-width: 540px;
  max-width: 760px;
`;

const InfiniteDiv = styled.div``;

import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import styled from 'styled-components';
import FeedProfile from './FeedProfile';
import WritePost from './WritePost';
import Post from './Post';
import PostModal from './PostModal';
import TopNav from '../../components/TopNav/TopNav';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import Loader from '../../components/Loader/Loader';
import MY_PROFILE_DATA from './data/MyProfileData';

const QUERY_LIMIT = 3;
const options = { rootMargin: '0px', threshold: 1 };

export default function Feed() {
  // Test Code for Checking UserContext
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, [user]);

  const { ...myProfileData } = MY_PROFILE_DATA;
  const [postList, setPostList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infiniteTarget, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [postUpdate, setPostUpdate] = useState(false);

  // useEffect(() => {
  //   let observer;
  //   if (infiniteTarget) {
  //     observer = new IntersectionObserver(callback, options);
  //     observer.observe(infiniteTarget);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [infiniteTarget]);

  // useEffect(() => {}, [postList]);

  // async function callback([entry], observer) {
  //   if (entry.isIntersecting && !isLoading) {
  //     observer.unobserve(entry.target);
  //     await getMoreItem(postList.length, QUERY_LIMIT);
  //     observer.observe(entry.target);
  //   }
  // }

  // async function getMoreItem(offset, limit) {
  //   setIsLoading(true);
  //   await new Promise(resolve => setTimeout(resolve, 500));
  //   setPostList(postList => postList.concat(new Array(limit).fill(offset)));
  //   setIsLoading(false);
  // }

  useEffect(() => {
    fetch(`http://localhost:10000/post/read/`)
      .then(res => res.json())
      .then(res => setPostList(res))
      .then(console.log('GET_FEED_SECCESS'))
      .catch(error => {
        console.log(error);
      });
    setPostUpdate(false);
  }, [postUpdate]);

  return (
    <>
      <TopNav />
      <Body>
        <FeedProfile myProfileData={myProfileData} />
        <PostWrap>
          {isModalOpen && (
            <PostModal
              myProfileData={myProfileData}
              setPostUpdate={setPostUpdate}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          <WritePost
            myProfileData={myProfileData}
            postList={postList}
            setIsModalOpen={setIsModalOpen}
          />
          {postList.reverse().map(data => {
            return (
              <Post
                key={data.id}
                postData={data}
                myProfileData={myProfileData}
                setPostUpdate={setPostUpdate}
              />
            );
          })}
          <InfiniteDiv ref={setTarget} />
        </PostWrap>
        <FloatingFooter />
        {isLoading && <Loader />}
      </Body>
    </>
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

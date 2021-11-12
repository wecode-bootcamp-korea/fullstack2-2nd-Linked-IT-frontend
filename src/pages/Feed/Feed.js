import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import FeedProfile from './FeedProfile';
import WritePost from './WritePost';
import Post from './Post';
import PostModal from './PostModal';
import TopNav from '../../components/TopNav/TopNav';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import Loader from '../../components/Loader/Loader';
import MY_PROFILE_DATA from './data/MyProfileData';
import API_ENDPOINT from '../../api';

const QUERY_LIMIT = 3;

export default function Feed() {
  const { ...myProfileData } = MY_PROFILE_DATA;
  const [postList, setPostList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postStart, setPostStart] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [postUpdate, setPostUpdate] = useState(false);
  const [morePost, setMorePost] = useState(false);
  const observerRef = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        setMorePost(true);
      }
    })
  );
  const [element, setElement] = useState(null);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/post/read?offset=0&limit=${postList.length}`)
      .then(res => res.json())
      .then(res => {
        setPostList(res);
      })
      .catch(error => {
        console.log(error);
      });
    setPostUpdate(false);
  }, [postUpdate]);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/post/read?offset=${postStart}&limit=${QUERY_LIMIT}`)
      .then(res => res.json())
      .then(res => {
        getMorePost(res);
      })
      .catch(error => {
        console.log(error);
      });
    setMorePost(false);
    setPostStart(postList.length);
  }, [morePost]);

  async function getMorePost(el) {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setPostList(postList.concat(el));
    setIsLoading(false);
  }

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observerRef.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

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
          {postList.map(data => {
            return (
              <Post
                key={data.id}
                postData={data}
                myProfileData={myProfileData}
                setPostUpdate={setPostUpdate}
              />
            );
          })}
          <ObserverDiv ref={setElement} />
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

const ObserverDiv = styled.div``;

import styled from 'styled-components';
import FeedProfile from './FeedProfile';
import Post from './Post';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import MY_PROFILE_DATA from './data/MyProfileData';
import POST_DATA from './data/PostData';

export default function Feed() {
  const { ...myProfileData } = MY_PROFILE_DATA;

  const postList = POST_DATA.map(data => {
    return <Post myProfileData={myProfileData} postData={data} />;
  });

  return (
    <Body>
      <FeedProfile myProfileData={myProfileData} />
      <PostContainer>{postList}</PostContainer>
      <FloatingFooter />
    </Body>
  );
}

const Body = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 50px;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
  text-align: center;
`;

const PostContainer = styled.div`
  margin: 0 10px;
  width: 45%;
  min-width: 540px;
  max-width: 760px;
`;

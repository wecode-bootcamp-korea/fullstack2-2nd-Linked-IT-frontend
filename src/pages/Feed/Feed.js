import styled from 'styled-components';
import FeedProfile from './FeedProfile';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import profileData from './data/Profile';

export default function Feed() {
  return (
    <Body>
      <FeedProfile profileData={profileData} />
      <PostsContainer />
      <FloatingFooter />
    </Body>
  );
}

const Body = styled.div`
  position: relative; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  top: 52px; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  padding-top: 20px; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  background-color: ${({ theme }) => theme.colors.bgcBeige};
`;

const PostsContainer = styled.div`
  margin: 0 auto;
  width: 540px;
  background-color: ${({ theme }) => theme.white};
`;

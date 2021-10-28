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
  background-color: ${({ theme }) => theme.colors.bgcBeige};
`;

const PostsContainer = styled.div`
  margin: 0 auto;
  width: 540px;
  background-color: ${({ theme }) => theme.white};
`;

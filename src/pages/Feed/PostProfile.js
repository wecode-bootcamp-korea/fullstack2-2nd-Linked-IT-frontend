import styled from 'styled-components';
import UserCard from '../../components/UserCard/UserCard';

export default function PostProfile({ postData }) {
  return (
    <Writer>
      <UserCard profile={postData} relation="true" type="kjob" />
    </Writer>
  );
}

const Writer = styled.div`
  margin: 15px;
  text-align: left;
`;

import styled from 'styled-components';
import UserCard from '../../components/UserCard/UserCard';

export default function PostProfile(props) {
  const { ...profile } = props.postData.writerData;

  return (
    <Writer>
      <UserCard profile={profile} relation="true" type="kjob" />
    </Writer>
  );
}

const Writer = styled.div`
  margin: 15px;
  text-align: left;
`;

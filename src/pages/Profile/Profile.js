import styled from 'styled-components';
import UserCard from '../../components/UserCard/UserCard';
import profileData from '../../components/UserCard/testData';

function Profile() {
  return (
    <div>
      <UserCard
        profile={profileData}
        relation="true"
        type="ejob-l education-l location"
        text={`${profileData.firstName}님에게 메시지를 보내보세요!`}
      />
    </div>
  );
}

export default Profile;

import styled from 'styled-components';

export default function ProfileImage(props) {
  const { userProfileUrl, openImgUploadModal } = props;
  return (
    <StyledProfileImage>
      <div className="profileImgWrapper" onClick={openImgUploadModal}>
        {userProfileUrl ? (
          <img alt="profile" src={userProfileUrl} />
        ) : (
          <img alt="profile" src="/images/defaultProfile.png" />
        )}
      </div>
    </StyledProfileImage>
  );
}

const StyledProfileImage = styled.div`
  .profileImgWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0px;
    left: 0px;
    transform: translate(15%, 60%);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: white;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;

    img {
      width: 170px;
    }
  }
`;

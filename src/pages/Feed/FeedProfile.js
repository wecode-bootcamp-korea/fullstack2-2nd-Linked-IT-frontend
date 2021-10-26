import styled from 'styled-components';

export default function FeedProfile(props) {
  const { name, workPlace, firstConnection, profileImage, backgroundImage } =
    props.profileData;
  return (
    <Aside>
      <BackgroundImage>
        <img src={backgroundImage} alt="backgroundImage" />
      </BackgroundImage>
      <ProfileImage>
        <img src={profileImage} alt="profileImage" />
      </ProfileImage>
      <Name>{name}</Name>
      <WorkPlace>{workPlace}</WorkPlace>
      <Count>
        <Title>1촌(명)</Title>
        <Value>{firstConnection}</Value>
      </Count>
    </Aside>
  );
}

const Aside = styled.div`
  display: inline-block;
  position: relative;
  width: 220px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
  text-align: center;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  img {
    height: 50px;
    width: 220px;
    object-fit: cover;
  }
`;

const ProfileImage = styled.div`
  img {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50px;
    width: 74px;
  }
`;

const Name = styled.div`
  padding-top: 60px;
  font-size: 1.2rem;
  font-weight: 700;
`;

const WorkPlace = styled.div`
  padding-top: 10px;
  padding-bottom: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 0.9rem;
`;

const Count = styled.div`
  position: relative;
  padding: 15px;
  padding-bottom: 30px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const Title = styled.span`
  position: absolute;
  left: 18px;
  color: ${({ theme }) => theme.colors.fontGrey};
`;

const Value = styled.span`
  position: absolute;
  right: 18px;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

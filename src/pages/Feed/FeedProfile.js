import styled from 'styled-components';
import isKorean from './../../utils/LanguageUtil';

export default function FeedProfile(props) {
  const {
    firstName,
    lastName,
    userProfileUrl,
    backgroundImage,
    headline,
    firstConnection,
  } = props.myProfileData;

  return (
    <Link href="/profile">
      <ProfileWrap>
        <BackgroundImage>
          <img src={backgroundImage} alt="backgroundImage" />
        </BackgroundImage>
        <ProfileImage>
          <img src={userProfileUrl} alt="profileImage" />
        </ProfileImage>
        <Name>
          {isKorean(firstName)
            ? `${lastName}${firstName}`
            : `${firstName} ${lastName}`}
        </Name>
        <WorkPlace>{headline}</WorkPlace>
        <Count>
          <Title>1촌(명)</Title>
          <Value>{firstConnection}</Value>
        </Count>
      </ProfileWrap>
    </Link>
  );
}

const Link = styled.a``;

const ProfileWrap = styled.div`
  display: inline-block;
  position: sticky;
  top: 60px;
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
    width: 74px;
    border-radius: 50px;
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
  color: ${({ theme }) => theme.colors.btnNavy};
`;

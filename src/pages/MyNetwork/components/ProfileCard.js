import styled from 'styled-components';
import Button from '../../../components/Button/Button';

export default function ProfileCard(props) {
  const {
    userProfileUrl = '/images/profile_default.png',
    lastName = '이름',
    firstName = '',
    companyNameKor = '회사명',
    currentPosition = '직책명',
  } = props;

  return (
    <Container>
      <BackgroundImage />
      <CircleImage
        alt={`${lastName + firstName}'s profile image'`}
        src={userProfileUrl}
      />
      <UserInfoWrapper>
        <UserName>{lastName + firstName}</UserName>
        <CompanyName>{companyNameKor}</CompanyName>
        <PositionName>{currentPosition}</PositionName>
      </UserInfoWrapper>
      <ButtonWrapper>
        <StyledButton text="1촌 맺기" />
      </ButtonWrapper>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 289px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 60px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const CircleImage = styled.img`
  position: absolute;
  top: 20px;
  width: 104px;
  height: 104px;
  border-radius: 50px;
`;

const UserInfoWrapper = styled.div`
  position: absolute;
  top: 140px;
`;

const StyledPtag = styled.p`
  margin-bottom: 7px;
  color: ${({ theme }) => theme.colors.fontGrey};
  text-align: center;
`;

const UserName = styled(StyledPtag)`
  color: black;
  font-size: 19px;
  font-weight: 600;
`;

const CompanyName = styled(StyledPtag)`
  font-size: 16px;
`;

const PositionName = styled(StyledPtag)`
  font-size: 15px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 80%;
  padding: 20px 0;
`;

const StyledButton = styled(Button).attrs(({ theme }) => {
  return {
    width: '100%',
    color: theme.colors.primary,
  };
})``;

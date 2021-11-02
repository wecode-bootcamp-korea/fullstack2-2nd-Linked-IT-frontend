import styled from 'styled-components';
import Button from '../../../components/Button/Button';

export default function ProfileCard(props) {
  const {
    userName = '이름',
    companyName = '회사명',
    positionName = '직책명',
  } = props;

  return (
    <Container>
      <BackgroundImage />
      <CircleImage
        alt={`${userName}'s profile image'`}
        src="/images/profile_default.png"
      />
      <UserInfoWrapper>
        <UserName>{userName}</UserName>
        <CompanyName>{companyName}</CompanyName>
        <PositionName>{positionName}</PositionName>
      </UserInfoWrapper>
      <ButtonWrapper>
        <Button
          width="100%"
          color={({ theme }) => theme.colors.primary}
          text="1촌 맺기"
        />
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

const BackgroundImage = styled.div`
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

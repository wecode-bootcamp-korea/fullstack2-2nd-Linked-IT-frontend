import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { addComma } from '../../utils/NumberUtil';

export default function CompanyProfileCard(props) {
  const {
    profileImgUrl,
    companyName,
    companyCategory,
    companyLocation,
    followerCount,
    companySummary,
    jobPostingCount,
    clicked,
    showBtn,
    showBorder,
  } = props;

  return (
    <FlexDiv clicked={clicked}>
      <ImgWrapper>
        <Link to="/">
          <img alt="profileImg" src={profileImgUrl} />
        </Link>
      </ImgWrapper>
      <TextWrapper showBorder={showBorder}>
        <FirstLine>
          <Link to="/">{companyName}</Link>
        </FirstLine>
        {companyLocation && (
          <SecondLine>
            {companyCategory}
            &nbsp;&#183;&nbsp;
            {companyLocation}
          </SecondLine>
        )}
        {followerCount > 0 && (
          <ThirdLine>팔로워 {addComma(followerCount)}명</ThirdLine>
        )}
        <FourthLine>{companySummary}</FourthLine>
        {jobPostingCount > 0 && (
          <FourthLine>
            <span></span>
            채용공고 {addComma(jobPostingCount)}
          </FourthLine>
        )}
      </TextWrapper>
      {showBtn && (
        <ButtonWrapper>
          <BtnSave isFollowing={true} text="팔로우" />
        </ButtonWrapper>
      )}
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  display: flex;
  background-color: ${({ clicked, theme }) =>
    clicked ? theme.colors.bgcLightBlue : ''};
`;

const ImgWrapper = styled.div`
  img {
    width: 56px;
    height: 56px;
    margin: 10px;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  border-bottom: ${({ showBorder }) => (showBorder ? '1px' : '0')} solid
    ${({ theme }) => theme.colors.borderGrey};
`;

const FirstLine = styled.p`
  margin: 10px 0 8px 0;
  font-size: 18px;
  font-weight: 600;
`;

const SecondLine = styled.p`
  margin-bottom: 5px;
  font-size: 16px;
`;

const ThirdLine = styled.p`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 14px;
`;

const FourthLine = styled.p`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 13px;

  span {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    background: url('/images/briefcaseIcon2.svg') no-repeat;
    background-size: contain;
  }
`;

const ButtonWrapper = styled.div`
  margin: 10px 10px 0 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
  white-space: nowrap;
`;

const BtnSave = styled(Button).attrs({
  color: ({ theme }) => theme.colors.primary,
})``;

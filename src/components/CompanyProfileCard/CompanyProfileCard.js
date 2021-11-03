import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { addComma } from '../../utils/NumberUtil';

export default function CompanyProfileCard(props) {
  const {
    companyId,
    profileImgUrl,
    companyName,
    companyCategory,
    companyLocation,
    followerCount,
    companyIntroduction,
    jobPostingCount,
    showIntro,
    showPostingCount,
    clicked = false,
    showBtn = true,
    showBorder = true,
  } = props;

  return (
    <FlexDiv clicked={clicked}>
      <ImgWrapper>
        <Link to={`/company/${companyId}`}>
          <img alt="profileImg" src={profileImgUrl} />
        </Link>
      </ImgWrapper>
      <TextWrapper showBorder={showBorder}>
        <FirstLine>
          <Link to={`/company/${companyId}`}>{companyName}</Link>
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
        {showIntro && <FourthLine>{companyIntroduction}</FourthLine>}
        {showPostingCount && jobPostingCount > 0 && (
          <FourthLine to={`/jobs?companyName=${companyName}`}>
            <span />
            채용공고 {addComma(jobPostingCount)}
          </FourthLine>
        )}
      </TextWrapper>
      {showBtn && (
        <ButtonWrapper showBorder={showBorder}>
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

const FourthLine = styled(Link)`
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
    background: url('/images/ico_briefcase2.svg') no-repeat;
    background-size: contain;
  }
`;

const ButtonWrapper = styled.div`
  padding: 10px 10px 0;
  border-bottom: ${({ showBorder }) => (showBorder ? '1px' : '0')} solid
    ${({ theme }) => theme.colors.borderGrey};
  white-space: nowrap;
`;

const BtnSave = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.primary,
}))``; // Warning 떠서 수정했습니다 -성재

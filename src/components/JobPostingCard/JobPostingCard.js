import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { addComma } from '../../utils/NumberUtil';

export default function JobPostingCard(props) {
  const {
    jobPostingId,
    companyProfileImgUrl,
    jobPostingTitle,
    companyId,
    companyName,
    companyLocation,
    workType,
    timeSincePosted,
    applicantCount,
    isEasyApply,
    isClicked = false,
    isMain = true,
    showBtn = true,
    showBorder = true,
    onClick,
  } = props;

  return (
    <FlexDiv isClicked={isClicked} onClick={() => onClick(jobPostingId)}>
      <ImgWrapper>
        <Link to={`company/${companyId}`}>
          <img alt="profile img" src={companyProfileImgUrl} />
        </Link>
      </ImgWrapper>
      <TextWrapper showBorder={showBorder}>
        <FirstLine>
          {isMain ? (
            <Link to={`/jobs/${jobPostingId}`}>{jobPostingTitle}</Link>
          ) : (
            jobPostingTitle
          )}
        </FirstLine>
        <SecondLine>{companyName}</SecondLine>
        <ThirdLine>
          {companyLocation} {workType ? `(${workType})` : ``}
        </ThirdLine>
        <FourthLine>
          {timeSincePosted && <li>{timeSincePosted}</li>}
          {applicantCount > 0 && (
            <li className="applicantCount">
              지원자 {addComma(applicantCount)}명
            </li>
          )}
          {isEasyApply === 1 && <li className="isEasyApply" />}
          {isEasyApply === 1 && <li>간편지원</li>}
        </FourthLine>
      </TextWrapper>
      {showBtn && (
        <ButtonWrapper showBorder={showBorder}>
          <BtnSave text="저장" />
        </ButtonWrapper>
      )}
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  display: flex;
  background-color: ${({ isClicked, theme }) =>
    isClicked ? theme.colors.bgcLightBlue : ''};
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
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 14px;
`;

const FourthLine = styled.ul`
  display: flex;
  padding-bottom: 15px;
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 13px;

  li {
    &.applicantCount {
      margin-left: 10px;
      color: ${({ theme }) => theme.colors.fontGreen};
      font-weight: 600;
    }

    &.isEasyApply {
      width: 11px;
      height: 11px;
      margin: 0 3px 0 10px;
      background: url('/images/common_logo_squared.png') no-repeat;
      background-size: contain;
    }
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
}))``;

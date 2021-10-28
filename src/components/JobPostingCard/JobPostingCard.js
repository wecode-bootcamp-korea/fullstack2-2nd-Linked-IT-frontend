import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { addComma } from '../../utils/NumberUtil';

export default function JobPostingCard(props) {
  const {
    profileImgUrl,
    jobPostingTitle,
    companyName,
    companyLocation,
    workType,
    createdAt,
    applicantCount,
    isEasy,
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
          <Link to="/">{jobPostingTitle}</Link>
        </FirstLine>
        <SecondLine>{companyName}</SecondLine>
        <ThirdLine>
          {companyLocation} {workType ? `(${workType})` : ``}
        </ThirdLine>
        <FourthLine>
          {createdAt && <li>{createdAt}</li>}
          {applicantCount > 0 && (
            <li className="applicantCount">
              지원자 {addComma(applicantCount)}명
            </li>
          )}
          {isEasy && <li className="isEasy" />}
          {isEasy && <li>간편지원</li>}
        </FourthLine>
      </TextWrapper>
      {showBtn && (
        <ButtonWrapper>
          <BtnSave text="저장" />
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

    &.isEasy {
      width: 11px;
      height: 11px;
      margin: 0 3px 0 10px;
      background: url('/images/logo_squared.png') no-repeat;
      background-size: contain;
    }
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

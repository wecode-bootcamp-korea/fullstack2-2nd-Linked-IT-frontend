import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
  } = props;

  return (
    <FlexDiv clicked={clicked}>
      <ImgWrapper>
        <Link to="/">
          <img alt="profileImg" src={profileImgUrl} />
        </Link>
      </ImgWrapper>
      <TextWrapper>
        <FirstLine>
          <Link to="/">{jobPostingTitle}</Link>
        </FirstLine>
        <SecondLine>{companyName}</SecondLine>
        <ThirdLine>
          {companyLocation} {workType ? `(${workType})` : ``}
        </ThirdLine>
        <FourthLine>
          <ul>
            {createdAt && <li>{createdAt}</li>}
            {applicantCount > 0 && (
              <li className="applicantCount">지원자 {applicantCount}명</li>
            )}
            {isEasy && <li className="easy" />}
            {isEasy && <li>간편지원</li>}
          </ul>
        </FourthLine>
      </TextWrapper>
      <ButtonWrapper>
        <button>공통컴포넌트적용예정</button>
      </ButtonWrapper>
    </FlexDiv>
  );
}

const FlexDiv = styled.div`
  display: flex;
  background-color: ${({ clicked, theme }) =>
    clicked ? theme.colors.backgroundLightBlue : ''};
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
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

const FourthLine = styled.p`
  margin-bottom: 15px;
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 13px;

  ul {
    display: flex;
  }

  li {
    &.applicantCount {
      margin-left: 10px;
      color: ${({ theme }) => theme.colors.fontGreen};
      font-weight: 600;
    }

    &.easy {
      width: 11px;
      height: 11px;
      margin: 0 3px 0 10px;
      background: url('/images/ItIcon.png') no-repeat;
      background-size: contain;
    }
  }
`;

const ButtonWrapper = styled.div``;

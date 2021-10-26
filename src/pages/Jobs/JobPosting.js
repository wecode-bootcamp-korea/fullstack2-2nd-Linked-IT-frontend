import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function JobPosting(props) {
  const {
    imgUrl,
    title,
    companyName,
    companyLocation,
    workType,
    date,
    applicant,
    easy,
  } = props;

  return (
    <StyledJobPosting>
      <FlexDiv>
        <ImgWrapper>
          <img src={imgUrl} alt={title} />
        </ImgWrapper>
        <TextWrapper>
          <Link to="/jobs">{title}</Link>
          <p>{companyName}</p>
          <p>
            {companyLocation} ({workType})
          </p>
        </TextWrapper>
      </FlexDiv>
      <div>
        <StyledUl>
          {date && <li>{date}</li>}
          {applicant && <li className="applicant">지원자 {applicant}명</li>}
          {easy && <li className="easy"></li>}
          {easy && <li>간편지원</li>}
        </StyledUl>
      </div>
    </StyledJobPosting>
  );
}

const StyledJobPosting = styled.div`
  color: #787e86;

  &:hover {
    cursor: pointer;
  }
`;

const FlexDiv = styled.div`
  display: flex;
`;

const ImgWrapper = styled.a`
  img {
    width: 56px;
    height: 56px;
    margin: 10px;
  }
`;

const TextWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid #ebebeb;

  a {
    color: #0b65c2;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin-top: 5px;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  margin: 3px 0 10px 77px;

  li {
    font-size: 13px;

    .applicant {
      margin-left: 10px;
      color: #318557;
      font-weight: 600;
    }

    .easy {
      width: 11px;
      height: 11px;
      margin: 0 3px 0 10px;
      background: url('https://www.icon0.com/vectors/static2/preview2/stock-photo-check-mark-icon-sign--14080.jpg')
        no-repeat;
      background-size: contain;
    }
  }
`;

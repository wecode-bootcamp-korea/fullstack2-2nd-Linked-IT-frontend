import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import UserCard from '../../components/UserCard/UserCard';
import CompanyProfileCard from '../../components/CompanyProfileCard/CompanyProfileCard';
import { addComma } from '../../utils/NumberUtil';
import USER_DATA from '../../components/UserCard/testData';

export default function JobPostingDetail(props) {
  const {
    jobPostingTitle,
    workType,
    createdAt,
    applicantCount,
    isEasyApply,
    employmentType,
    description,
    salaryRange,
    salaryInfo,
    companyName,
    companyLocation,
    staffCount,
    companyCategory,
    companyIntroduction,
  } = props;

  const [showToolbar, setShowToolbar] = useState(false);
  const [toggleIntro, setToggleIntro] = useState(false);

  const target = useRef(null);
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setShowToolbar(false);
      } else {
        setShowToolbar(true);
      }
    });
  };
  const options = { rootMargin: '0px', threshold: 0 };
  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    observer.observe(target.current);
  }, [observer]);

  const clickToggleIntro = () => {
    setToggleIntro(!toggleIntro);
  };

  return (
    <>
      <Container>
        <TopSection>
          <Title>{jobPostingTitle}</Title>
          <Subtitle>
            <li>{companyName}</li>
            <li>{companyLocation}</li>
            <li>{workType}</li>
            <li>{createdAt}</li>
            {applicantCount > 0 && (
              <li className="applicantCount">
                지원자 {addComma(applicantCount)}명
              </li>
            )}
          </Subtitle>
          <IconList>
            <li>
              <img alt="ico_briefcase" src="/images/ico_briefcase.svg" />
              {employmentType}
            </li>
            <li>
              <img alt="ico_building" src="/images/ico_building.svg" />
              직원 {staffCount}명 &#183; {companyCategory}
            </li>
            <li ref={target}>
              <BtnApply text={isEasyApply ? '간편 지원' : '지원'} />
              <BtnSave text="저장" />
            </li>
          </IconList>
        </TopSection>
        <Midsection>
          <UserCard
            profile={USER_DATA}
            withoutName="false"
            relation="true"
            type="location ejob"
            text=""
          />
          <Description>
            {description.split('\n').map((line, idx) => {
              return <p key={idx}>{line}&nbsp;</p>;
            })}
          </Description>
        </Midsection>
        <BottomSection>
          <Salary>
            <h3>{salaryRange ? salaryRange : '연봉 범위 없음'}</h3>
            <p>{salaryInfo ? salaryInfo : '현재 연봉 정보가 없습니다.'}</p>
            <div>
              이 직책의 연봉에 관심이 있으세요?
              <button>네</button>/<button>아니오</button>
            </div>
          </Salary>
          <Company>
            <h2>회사 소개</h2>
            <CompanyProfileCardWrapper>
              <CompanyProfileCard
                {...props}
                showBtn={true}
                showBorder={false}
              />
            </CompanyProfileCardWrapper>
            <Introduction>
              {!toggleIntro &&
                companyIntroduction.split('\n').filter((line, idx) => {
                  return idx < 5 && line;
                })}
              {toggleIntro &&
                companyIntroduction.split('\n').map((line, idx) => {
                  return <p key={idx}>{line}&nbsp;</p>;
                })}
            </Introduction>
            <ToggleIntro onClick={clickToggleIntro}>
              {toggleIntro ? '숨기기' : '더 보기'}
            </ToggleIntro>
            <GoToCompanyPage>
              <Link to="/">회사 소개 보러 가기</Link>
            </GoToCompanyPage>
          </Company>
        </BottomSection>
      </Container>
      <Toolbar showToolbar={showToolbar}>
        <div>
          <Title>{jobPostingTitle}</Title>
          <div>
            <BtnApply text={isEasyApply ? '간편 지원' : '지원'} />
            <BtnSave text="저장" />
          </div>
        </div>
        <Subtitle>
          <li>{companyName}</li>
          <li>{companyLocation}</li>
          <li>{workType}</li>
        </Subtitle>
      </Toolbar>
    </>
  );
}

const Container = styled.div`
  padding: 10px;
`;

const TopSection = styled.section`
  padding: 15px 20px 30px 23px;
`;

const Midsection = styled.section`
  padding: 0 20px 10px 20px;
`;

const BottomSection = styled.section``;

const Toolbar = styled.div`
  position: fixed;
  top: ${({ showToolbar }) =>
    showToolbar
      ? '52px'
      : '-110px'}; //TopNav관련 '0'을 '52px'로 바꿨습니다 -성재
  width: 625px;
  padding: 15px 20px 30px 23px;
  border-right: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
  background-color: ${({ theme }) => theme.colors.white};
  transition: 1s;

  div {
    display: flex;
    justify-content: space-between;

    button {
      margin-right: 10px;
    }
  }
`;

const Title = styled.h1`
  margin-bottom: 13px;
  font-size: 25px;
  font-weight: 500;
`;

const Subtitle = styled.ul`
  display: flex;
  font-size: 14px;
  word-break: keep-all;

  li {
    margin-right: 10px;

    &.applicantCount {
      color: ${({ theme }) => theme.colors.fontGreen};
      font-weight: 600;
    }
  }
`;

const IconList = styled.ul`
  margin-top: 25px;

  li {
    display: flex;
    align-items: center;
    margin-bottom: 11px;

    img {
      margin-right: 8px;
    }

    button {
      margin: 20px 10px 0 0;
    }
  }
`;

const BtnApply = styled(Button).attrs({
  bgc: ({ theme }) => theme.colors.primary,
  color: ({ theme }) => theme.colors.white,
})``;

const BtnSave = styled(Button).attrs({
  color: ({ theme }) => theme.colors.primary,
})``;

const Description = styled.div`
  margin-top: 40px;

  p {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Salary = styled.div`
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;

  h3 {
    padding: 15px 0 10px 25px;
    font-size: 17px;
  }

  p {
    padding: 0 0 15px 25px;
    color: ${({ theme }) => theme.colors.fontGrey};
    font-size: 15px;
  }

  div {
    padding: 10px 0 10px 25px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderGrey};
    color: ${({ theme }) => theme.colors.fontGrey};
    font-size: 15px;
  }

  button {
    margin: 0 5px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
  }
`;

const Company = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 10px;

  h2 {
    margin: 20px 0 10px 17px;
    font-size: 21px;
    font-weight: 400;
  }
`;

const CompanyProfileCardWrapper = styled.div`
  margin: 0 10px 0 5px;
`;

const Introduction = styled.div`
  margin: 20px 20px 20px 15px;
  font-size: 15px;
  line-height: 23px;
`;

const ToggleIntro = styled.div`
  margin: 0 25px 15px 0;
  color: ${({ theme }) => theme.colors.primary};
  text-align: right;
  cursor: pointer;
`;

const GoToCompanyPage = styled.div`
  padding: 15px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGrey};
  font-size: 17px;
  font-weight: 600;
  text-align: center;
`;

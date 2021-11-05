import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function CareerCard(props) {
  const { idx, openCareerEditModal } = props;
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (!idx) setIsHover(true);
  }, [idx]);

  const showEditBtn = () => {
    setIsHover(true);
  };

  const hideEditBtn = () => {
    setIsHover(false);
  };

  const {
    companyLogo,
    position,
    companyName,
    employmentType,
    startMonth,
    startYear,
    endMonth,
    endYear,
    country,
    city,
    description,
  } = props.career;

  return (
    <StyledCareerCard
      onMouseEnter={idx ? showEditBtn : null}
      onMouseLeave={idx ? hideEditBtn : null}
    >
      <EditBtnWrapper isHover={isHover}>
        <div>
          <FontAwesomeIcon
            className="editBtn"
            icon={faPen}
            onClick={() => openCareerEditModal(idx)}
          />
        </div>
      </EditBtnWrapper>
      <Logo>
        <img alt="회사로고" src={companyLogo} />
      </Logo>
      <InfoWrapper>
        <h3>{position}</h3>
        <FirstLine>{`${companyName} • ${employmentType}`}</FirstLine>
        <SecondLine>
          <span>{`${startYear}년 ${startMonth}월 ~`}</span>
          {!isNaN(endYear) && endYear !== '0' && (
            <span>{` ${endYear}년 ${endMonth}월`}</span>
          )}
        </SecondLine>
        <ThirdLine>{`${country} ${city || ''}`}</ThirdLine>
        <FourthLine>{description}</FourthLine>
      </InfoWrapper>
    </StyledCareerCard>
  );
}

const StyledCareerCard = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 25px 25px 0 0;
  border-bottom: 1px solid lightgray;

  &:last-child {
    border: none;
  }
`;

const EditBtnWrapper = styled.div`
  display: ${({ isHover }) => (isHover ? 'block' : 'none')};
  position: absolute;
  top: 20px;
  right: 5px;

  div {
    padding-top: 5px;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    text-align: center;

    &:hover {
      opacity: 0.5;
    }

    svg {
      color: ${({ theme }) => theme.colors.btnGrey};
      font-size: 18px;
      font-weight: 400;

      &:active {
        opacity: 0.3;
      }
    }
  }
`;

const Logo = styled.div`
  img {
    width: 55px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  width: 460px;
  margin-left: 25px;

  h3 {
    padding-bottom: 7px;
    font-size: 15px;
    font-weight: 600;
  }
`;

const FirstLine = styled.p`
  padding-bottom: 3px;

  color: black;
  font-size: 13px;
`;

const SecondLine = styled.p`
  padding-bottom: 3px;
  color: ${({ theme }) => theme.colors.btnGrey};
  font-size: 13px;
`;

const ThirdLine = styled.p`
  padding-bottom: 3px;
  color: ${({ theme }) => theme.colors.btnGrey};
  font-size: 13px;
`;

const FourthLine = styled.p`
  padding: 5px 0 15px 0;
  color: black;
  font-size: 13px;
  font-weight: 500;
`;

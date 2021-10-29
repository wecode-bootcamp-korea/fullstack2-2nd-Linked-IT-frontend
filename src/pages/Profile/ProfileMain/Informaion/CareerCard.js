import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function CareerCard(props) {
  const {
    companyLogo,
    position,
    companyName,
    employmentType,
    startDate,
    endDate,
    country,
    city,
    desc,
  } = props.career;

  return (
    <StyledCareerCard>
      <FontAwesomeIcon className="editBtn" icon={faPen} />
      <Logo>
        <img alt="회사로고" src={companyLogo} />
      </Logo>
      <InfoWrapper>
        <h3>{position}</h3>
        <FirstLine>{`${companyName} • ${employmentType}`}</FirstLine>
        <SecondLine>{`${startDate} ~ ${endDate}`}</SecondLine>
        <ThirdLine>{`${country} ${city}`}</ThirdLine>
        <FourthLine>{desc}</FourthLine>
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

  .editBtn {
    position: absolute;
    top: 20px;
    right: 5px;
    color: ${({ theme }) => theme.colors.btnGrey};
    font-size: 18px;

    &:hover {
      color: black;
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
    padding-bottom: 5px;
    font-size: 15px;
    font-weight: 600;
  }
`;

const FirstLine = styled.p`
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
  padding: 10px 0;
  color: black;
  font-size: 13px;
  font-weight: 500;
`;

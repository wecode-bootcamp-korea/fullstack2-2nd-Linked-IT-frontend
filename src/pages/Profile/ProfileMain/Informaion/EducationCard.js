import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function EducationCard(props) {
  const {
    schoolLogo,
    schoolName,
    degree,
    major,
    gpa,
    startDate,
    endDate,
    activity,
    desc,
  } = props.education;

  return (
    <StyledEducationCard>
      <FontAwesomeIcon className="editBtn" icon={faPen} />
      <Logo>
        <img alt="학교로고" src={schoolLogo} />
      </Logo>
      <InfoWrapper>
        <h3>{schoolName}</h3>
        <FirstLine>{`${degree}, ${major}, ${gpa}`}</FirstLine>
        <SecondLine>{`${startDate} ~ ${endDate}`}</SecondLine>
        <ThirdLine>{`동아리와 학회 : ${activity}`}</ThirdLine>
        <FourthLine>{desc}</FourthLine>
      </InfoWrapper>
    </StyledEducationCard>
  );
}

const StyledEducationCard = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 25px 25px 0 0;
  border-bottom: 1px solid lightgray;

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

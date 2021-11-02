import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import CareerCard from './CareerCard';
import EducationCard from './EducationCard';

export default function Informaion(props) {
  const { title, cardData, openCareerAddModal } = props;

  return (
    <StyledInformation>
      {title.includes('경력') && (
        <CareerInfo>
          <div>
            <h2>{title}</h2>
            <FontAwesomeIcon
              className="plusBtn"
              icon={faPlus}
              onClick={openCareerAddModal}
            />
            <ul className="cardList">
              {cardData.map(career => {
                return <CareerCard key={career.id} career={career} />;
              })}
            </ul>
          </div>
        </CareerInfo>
      )}

      {title.includes('학력') && (
        <EduecationInfo>
          <div>
            <h2>{title}</h2>
            <FontAwesomeIcon className="plusBtn" icon={faPlus} />
            <ul className="cardList">
              {cardData.map(education => {
                return (
                  <EducationCard key={education.id} education={education} />
                );
              })}
            </ul>
          </div>
        </EduecationInfo>
      )}
    </StyledInformation>
  );
}

const StyledInformation = styled.section`
  h2 {
    font-size: 20px;
  }

  .plusBtn {
    position: absolute;
    top: 20px;
    right: 30px;
    color: ${({ theme }) => theme.colors.btnGrey};
    font-size: 21px;

    &:hover {
      color: black;
    }
  }
`;

const CareerInfo = styled.div`
  position: relative;
  max-width: 780px;
  margin: 0 auto 0 auto;
  padding: 25px 25px 0 25px;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 10px 10px 0px 0px;
`;

const EduecationInfo = styled.div`
  position: relative;
  max-width: 780px;
  margin: 0 auto 0 auto;
  padding: 25px 25px 0 25px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: none;
  border-radius: 0 0 10px 10px;
`;

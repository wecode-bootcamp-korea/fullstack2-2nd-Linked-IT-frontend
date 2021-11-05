import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import CareerCard from './CareerCard';
import EducationCard from './EducationCard';
import { useEffect, useState } from 'react/cjs/react.development';

export default function Information(props) {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setCardData(props.cards);
  }, [props]);

  const {
    title,
    openCareerAddModal,
    openCareerEditModal,
    openEducationAddModal,
    openEducationEditModal,
  } = props;

  return (
    <StyledInformation>
      {title.includes('경력') && (
        <CareerInfo>
          <div>
            <h2>{title}</h2>
            <PlusBtnWrapper>
              <div>
                <FontAwesomeIcon icon={faPlus} onClick={openCareerAddModal} />
              </div>
            </PlusBtnWrapper>
            <ul className="cardList">
              {cardData.map((career, idx) => {
                return (
                  <CareerCard
                    key={career.companyName}
                    idx={idx}
                    career={career}
                    openCareerEditModal={openCareerEditModal}
                  />
                );
              })}
            </ul>
          </div>
        </CareerInfo>
      )}

      {title.includes('학력') && (
        <EduecationInfo>
          <div>
            <h2>{title}</h2>
            <PlusBtnWrapper>
              <div>
                <FontAwesomeIcon
                  icon={faPlus}
                  onClick={openEducationAddModal}
                />
              </div>
            </PlusBtnWrapper>
            <ul className="cardList">
              {cardData.map((education, idx) => {
                return (
                  <EducationCard
                    key={education.schoolName}
                    idx={idx}
                    education={education}
                    openEducationEditModal={openEducationEditModal}
                  />
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
`;

const PlusBtnWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;

  div {
    padding-top: 5px;
    width: 30px;
    height: 30px;
    background-color: white;
    border-radius: 50%;
    text-align: center;

    &:hover {
      background-color: black;
      opacity: 0.5;
    }

    svg {
      color: ${({ theme }) => theme.colors.btnGrey};
      font-size: 21px;

      &:active {
        opacity: 0.3;
      }
    }
  }
`;

const CareerInfo = styled.div`
  position: relative;
  max-width: 750px;
  margin: 0 auto 0 auto;
  padding: 25px 25px 0 25px;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 10px 10px 0px 0px;
`;

const EduecationInfo = styled.div`
  position: relative;
  max-width: 750px;
  margin: 0 auto 0 auto;
  padding: 25px 25px 0 25px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: none;
  border-radius: 0 0 10px 10px;
`;

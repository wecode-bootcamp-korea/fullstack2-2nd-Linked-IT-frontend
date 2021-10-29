import Informaion from './ProfileMain/Informaion/Informaion';
import styled from 'styled-components';

import careerData from './data/careerData';
import educationData from './data/educationData';

export default function Profile() {
  const careers = careerData;
  const educations = educationData;

  return (
    <StyledInformation>
      <Informaion title="경력사항" cardData={careers} />
      <Informaion title="학력" cardData={educations} />
    </StyledInformation>
  );
}

const StyledInformation = styled.section``;

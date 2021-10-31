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

const StyledInformation = styled.section`
  position: relative; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  top: 52px; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  padding: 20px 0; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
`;

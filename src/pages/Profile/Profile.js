import { useState } from 'react';
import styled from 'styled-components';
import Informaion from './ProfileMain/Informaion/Informaion';

import careerData from './data/careerData';
import educationData from './data/educationData';
import CareerAddModal from './ProfileMain/Modals/CareerAddModal';
import { disableScroll, enableScroll } from '../../utils/ModalFunc';

export default function Profile() {
  const [showCareerAddModal, setShowCareerAddModal] = useState(false);

  const openCareerAddModal = e => {
    e.preventDefault();
    disableScroll();
    setShowCareerAddModal(true);
  };

  const closeCareerAddModal = e => {
    e.preventDefault();
    enableScroll();
    setShowCareerAddModal(false);
  };

  const careers = careerData;
  const educations = educationData;

  return (
    <StyledInformation>
      <Informaion
        title="경력사항"
        cardData={careers}
        openCareerAddModal={openCareerAddModal}
      />
      <Informaion title="학력" cardData={educations} />
      <CareerAddModal
        currentCareer={careers[0]}
        showCareerAddModal={showCareerAddModal}
        closeCareerAddModal={closeCareerAddModal}
      />
    </StyledInformation>
  );
}

const StyledInformation = styled.section`
  position: relative; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  top: 52px; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  padding: 20px 0; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
`;

import { useState } from 'react';
import styled from 'styled-components';
import Informaion from './ProfileMain/Informaion/Information';
import CareerAddModal from './ProfileMain/Modals/CareerAddModal';
import EducationAddModal from './ProfileMain/Modals/EducationAddModal';
import careerData from './data/careerData';
import educationData from './data/educationData';
import CareerEditModal from './ProfileMain/Modals/CareerEditModal';
import EducationEditModal from './ProfileMain/Modals/EducationEditModal';
import { disableScroll, enableScroll } from '../../utils/ModalFunc';

export default function Profile() {
  const [showCareerAddModal, setShowCareerAddModal] = useState(false);
  const [showCareerEditModal, setShowCareerEditModal] = useState(false);
  const [showEducationAddModal, setShowEducationAddModal] = useState(false);
  const [showEducationEditModal, setShowEducationEditModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(0);
  const [selectedEducation, setSelectedEducation] = useState(0);

  // 경력 추가
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
  // 경력 수정
  const openCareerEditModal = idx => {
    setSelectedCareer(idx);
    disableScroll();
    setShowCareerEditModal(true);
  };

  const closeCareerEditModal = e => {
    e.preventDefault();
    enableScroll();
    setShowCareerEditModal(false);
  };
  // 교육 추가
  const openEducationAddModal = e => {
    e.preventDefault();
    disableScroll();
    setShowEducationAddModal(true);
  };

  const closeEducationAddModal = e => {
    e.preventDefault();
    enableScroll();
    setShowEducationAddModal(false);
  };
  // 교육 수정
  const openEducationEditModal = idx => {
    setSelectedEducation(idx);
    disableScroll();
    setShowEducationEditModal(true);
  };

  const closeEducationEditModal = e => {
    e.preventDefault();
    enableScroll();
    setShowEducationEditModal(false);
  };

  const careers = careerData;
  const educations = educationData;

  return (
    <StyledInformation>
      <Informaion
        title="경력사항"
        cardData={careers}
        openCareerAddModal={openCareerAddModal}
        openCareerEditModal={openCareerEditModal}
      />
      <Informaion
        title="학력"
        cardData={educations}
        openEducationAddModal={openEducationAddModal}
        openEducationEditModal={openEducationEditModal}
      />
      <CareerAddModal
        currentCareer={careers}
        showCareerAddModal={showCareerAddModal}
        closeCareerAddModal={closeCareerAddModal}
      />
      <CareerEditModal
        selectedCareer={careers[selectedCareer]}
        showCareerEditModal={showCareerEditModal}
        closeCareerEditModal={closeCareerEditModal}
      />
      <EducationAddModal
        showEducationAddModal={showEducationAddModal}
        closeEducationAddModal={closeEducationAddModal}
      />
      <EducationEditModal
        education={educations[selectedEducation]}
        showEducationEditModal={showEducationEditModal}
        closeEducationEditModal={closeEducationEditModal}
      />
    </StyledInformation>
  );
}

const StyledInformation = styled.section`
  position: relative; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  top: 52px; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  padding: 20px 0; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
`;

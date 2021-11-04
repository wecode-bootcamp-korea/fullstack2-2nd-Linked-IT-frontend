import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileMain from './ProfileMain/ProfileMain';
import Informaion from './Informaion/Information';
import CareerAddModal from './Modals/CareerAddModal';
import EducationAddModal from './Modals/EducationAddModal';
import CareerEditModal from './Modals/CareerEditModal';
import EducationEditModal from './Modals/EducationEditModal';
import BasicEditModal from './Modals/BasicEditModal';
import MayKonwList from './MayKnowList';
import FloatingFooter from '../../components/FloatingFooter/FloatingFooter';
import PopUpMessage from './Modals/PopUpMessage';
import { disableScroll, enableScroll } from '../../utils/ModalFunc';
import ImgUploadModal from './ImgUploadModal';

export default function Profile() {
  const [showBasicEditModal, setShowBasicEditModal] = useState(false);
  const [showCareerAddModal, setShowCareerAddModal] = useState(false);
  const [showCareerEditModal, setShowCareerEditModal] = useState(false);
  const [showEducationAddModal, setShowEducationAddModal] = useState(false);
  const [showEducationEditModal, setShowEducationEditModal] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(0);
  const [selectedEducation, setSelectedEducation] = useState(0);
  const [showCurrentCompany, setShowCurrentCompany] = useState(true);
  const [showEducation, setShowEducation] = useState(true);
  const [showImgUploadModal, setShowImgUploadModal] = useState(false);
  const [popUpSaved, setPopUpSaved] = useState(true);
  const [type, setType] = useState('');

  const [careers, setCareers] = useState([]);
  const [educations, setEducation] = useState([]);
  const [profile, setProfile] = useState([]);
  const [mayKnowList, setMayKnowList] = useState([]);

  useEffect(() => {
    // fetch('data/profile/profileDataUrl.json')
    fetch('data/profile/profileData.json')
      .then(res => res.json())
      .then(data => {
        setProfile(data.PROFILE_DATA);
      });
    //경력
    fetch('data/profile/careerData.json')
      .then(res => res.json())
      .then(data => {
        setCareers(data.CAREER_DATA);
      });
    //학력
    fetch('data/profile/educationData.json')
      .then(res => res.json())
      .then(data => {
        setEducation(data.EDUCATION_DATA);
      });
    //알수도있는 사람
    fetch('data/profile/mayKnowListData.json')
      .then(res => res.json())
      .then(data => {
        setMayKnowList(data.MAYKNOWLIST_DATA);
      });
  }, []);

  const updateBgImg = img => {
    setProfile({ ...profile, backgroundImg: img });
  };

  const updateProfileImg = img => {
    setProfile({ ...profile, userProfileUrl: img });
  };

  // 기본정보 수정
  const openBasicEditModal = e => {
    e.preventDefault();
    disableScroll();
    setShowBasicEditModal(true);
  };

  const closeBasicEditModal = e => {
    e.preventDefault();
    enableScroll();
    setShowBasicEditModal(false);
    if (e.target.textContent === '저장') setPopUpSaved(true);
  };

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

  // 이미지 업로드
  const openImgUploadModal = e => {
    e.preventDefault();
    disableScroll();
    setType(e.target.localName);
    setShowImgUploadModal(true);
  };

  const closeImgUploadmodal = e => {
    enableScroll();
    setShowImgUploadModal(false);
  };

  return (
    <StyledInformation>
      <Container>
        <Main>
          <ProfileMain
            profile={profile}
            openBasicEditModal={openBasicEditModal}
            openImgUploadModal={openImgUploadModal}
            showCurrentCompany={showCurrentCompany}
            showEducation={showEducation}
          />
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
          <BasicEditModal
            profile={profile}
            showBasicEditModal={showBasicEditModal}
            closeBasicEditModal={closeBasicEditModal}
            showCurrentCompany={showCurrentCompany}
            setShowCurrentCompany={setShowCurrentCompany}
            showEducation={showEducation}
            setShowEducation={setShowEducation}
          />
          <ImgUploadModal
            type={type}
            showImgUploadModal={showImgUploadModal}
            closeImgUploadmodal={closeImgUploadmodal}
            updateBgImg={updateBgImg}
            updateProfileImg={updateProfileImg}
          />
        </Main>
        <Aside>
          <MayKonwList mayKnowList={mayKnowList} />
          <FloatingFooter />
        </Aside>
      </Container>
      {popUpSaved && (
        <PopUpMessage popUpSaved={popUpSaved} text="저장되었습니다." />
      )}
    </StyledInformation>
  );
}

const StyledInformation = styled.section`
  position: relative; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  top: 52px; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  padding: 20px 0; //TopNav관련 temp 솔루션으로 추가했습니다 -성재
  display: flex;
  flex-direction: row;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
`;

const Main = styled.div`
  margin-right: 15px;
`;

const Aside = styled.div``;

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ProfileBackGround from './ProfileBackGround';
import ProfileImage from '../ProfileMain/ProfileImage';
import Detail from './Detail';
import Carousel from '../Carousel/Carousel';
import Button from '../../../components/Button/Button';

import theme from '../../../styles/theme';
import cardData from '../data/cardData'; // fetch 상관없이 필요
import InterestsDropDown from '../DropDown/InterestDropDown'; // fetch 상관없이 필요
import SectionsDropDown from '../DropDown/sectionsDropDown'; // fetch 상관없이 필요
import MoresDropDown from '../DropDown/MoresDropDown'; // fetch 상관없이 필요

export default function ProfileMain(props) {
  const [showInterestsDropDown, setShowInterestsDropDown] = useState(false);
  const [showSectionsDropDown, setShowSectionsDropDown] = useState(false);
  const [showMoresDropDown, setShowMoresDropDown] = useState(false);
  const [renderDropDown, setRenderDropDown] = useState(false);

  const paintDropDown = e => {
    if (showInterestsDropDown || showSectionsDropDown || showMoresDropDown) {
      closeDropDown();
      return;
    }
    setRenderDropDown(true);
    setTimeout(() => {
      if (e.target.textContent === '관심분야') setShowInterestsDropDown(true);
      if (e.target.textContent === '섹션 등록') setShowSectionsDropDown(true);
      if (e.target.textContent === '더 보기') setShowMoresDropDown(true);
    }, 16);

    e.stopPropagation();
    document.addEventListener('click', closeDropDown);
  };

  const closeDropDown = e => {
    setShowInterestsDropDown(false);
    setShowSectionsDropDown(false);
    setShowMoresDropDown(false);
    setTimeout(() => {
      setRenderDropDown(false);
    }, 500);
    document.removeEventListener('click', closeDropDown);
  };

  const { userProfileUrl, backgroundImg } = props.profile;
  const {
    openBasicEditModal,
    showCurrentCompany,
    showEducation,
    openImgUploadModal,
    careers,
  } = props;

  return (
    <StyledProfileCard>
      <BoxHeader>
        <ProfileBackGround
          backgroundImg={backgroundImg}
          openImgUploadModal={openImgUploadModal}
        />
      </BoxHeader>
      <ProfileImage
        userProfileUrl={userProfileUrl}
        openImgUploadModal={openImgUploadModal}
      />
      <PenIconWrapper>
        <FontAwesomeIcon icon={faPen} onClick={openBasicEditModal} />
      </PenIconWrapper>
      <Detail
        profile={props.profile}
        careers={careers}
        showCurrentCompany={showCurrentCompany}
        showEducation={showEducation}
      />
      <ButtonWrapper>
        <Button
          bgc={theme.colors.primary}
          color={theme.colors.white}
          text="관심분야"
          onClick={paintDropDown}
        />
        <Button text="섹션 등록" onClick={paintDropDown} />
        <Button text="더 보기" onClick={paintDropDown} />
        {renderDropDown ? (
          <div>
            <InterestsDropDown showInterestsDropDown={showInterestsDropDown} />
            <SectionsDropDown showSectionsDropDown={showSectionsDropDown} />
            <MoresDropDown showMoresDropDown={showMoresDropDown} />
          </div>
        ) : null}
      </ButtonWrapper>
      <BoxTail>
        <Carousel
          cardData={cardData}
          cardWidth={310}
          cardMargin={10}
          wrapperWidth={700}
        />
      </BoxTail>
    </StyledProfileCard>
  );
}

const StyledProfileCard = styled.main`
  position: relative;
  width: 750px;
  margin: 0 auto 10px auto;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 15px 15px 15px 15px;

  .penIconWrapper {
  }
`;

const PenIconWrapper = styled.div`
  margin-right: 17px;
  height: 50px;
  text-align: right;

  svg {
    margin: 15px 15px 0 0;
    color: gray;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }
`;

const BoxHeader = styled.div`
  position: relative;
  border: 1px solid lightgrey;
  border-radius: 15px 15px 0 0;
  width: 750px;
  margin: 0 auto 10px auto;
  background-color: white;
  overflow: hidden;
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 260px;
  margin: 0 0 20px 20px;
`;

const BoxTail = styled.div`
  border-radius: 15px;
  overflow: hidden;
  border-radius: 0 0 15px 15px;
`;

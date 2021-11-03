import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button/Button';
import TextInput from './components/TextInput';
import CheckBox from './components/CheckBox';
import AskCancel from './components/AskCancelModal';
import theme from '../../../styles/theme';

export default function BasicEditModal(props) {
  const [showAskCancelModal, setShowAskCancelModal] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const openAskCancelModal = e => {
    e.preventDefault();
    setShowAskCancelModal(true);
  };

  const closeAskCancelModal = e => {
    e.preventDefault();
    if (e.target.textContent === '삭제') setHasChanged(false);
    setShowAskCancelModal(false);
  };

  const toggleHasChanged = () => {
    setHasChanged(true);
  };

  const {
    showBasicEditModal,
    closeBasicEditModal,
    showCurrentCompany,
    setShowCurrentCompany,
    showEducation,
    setShowEducation,
  } = props;
  const {
    firstName,
    lastName,
    oneLineProfile,
    country,
    city,
    companyName,
    industry,
    schoolName,
  } = props.profile || {};

  return (
    <StyledBasicEditModal showBasicEditModal={showBasicEditModal}>
      {showBasicEditModal && (
        <div>
          <DimBg
            scrollY={window.scrollY}
            onClick={hasChanged ? openAskCancelModal : closeBasicEditModal}
          />
          <Container scrollY={window.scrollY}>
            <BoxHeader>
              <h2>소개말 수정</h2>
              <div className="highlightCircle">
                <i
                  className="fal fa-times"
                  onClick={
                    hasChanged ? openAskCancelModal : closeBasicEditModal
                  }
                />
              </div>
            </BoxHeader>
            <BoxBody onChange={toggleHasChanged}>
              <form method="POST">
                <LastNameInput>
                  <TextInput
                    title="성"
                    name="lastName"
                    defaultValue={lastName}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </LastNameInput>
                <FirstNameInput>
                  <TextInput
                    title="이름"
                    name="firstName"
                    defaultValue={firstName}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </FirstNameInput>
                <OneLieProfileInput>
                  <TextInput
                    title="한 줄 프로필"
                    name="oneLineProfile"
                    defaultValue={oneLineProfile}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={true}
                  />
                </OneLieProfileInput>
                <CompanyNameInput>
                  <h3>현재 직책</h3>
                  <TextInput
                    title="회사이름"
                    name="companyName"
                    defaultValue={companyName}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </CompanyNameInput>
                <IndustryInput>
                  <TextInput
                    title="업계"
                    name="industry"
                    defaultValue={industry}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={true}
                  />
                </IndustryInput>
                <CheckBoxWrapper showCurrentCompany={showCurrentCompany}>
                  <CheckBox
                    id="cbShowCurrentCompany"
                    name="showCurrentCompany"
                    state={showCurrentCompany}
                    text="소개 섹션에 현재회사 표시"
                    onClick={() => setShowCurrentCompany(!showCurrentCompany)}
                  />
                </CheckBoxWrapper>

                <SchoolNameInput>
                  <h3>최종 학력</h3>
                  <TextInput
                    title="학교이름"
                    name="schoolName"
                    defaultValue={schoolName}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </SchoolNameInput>
                <CheckBoxWrapper showEducation={showEducation}>
                  <CheckBox
                    id="cbShowEducation"
                    name="showEducation"
                    state={showEducation}
                    text="소개 섹션에 최종학력 표시"
                    onClick={() => setShowEducation(!showEducation)}
                  />
                </CheckBoxWrapper>
                <RegionInput>
                  <h3>지역</h3>
                  <TextInput
                    title="국가/지역"
                    name="country"
                    defaultValue={country}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </RegionInput>
                <CityInput>
                  <TextInput
                    title="시"
                    name="city"
                    defaultValue={city}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={true}
                  />
                </CityInput>
              </form>
              <ContectInput>
                <div>연락처</div>
                <div className="link">프로필 URL, 이메일, 웹사이트 등 변경</div>
                <ButtonWrapper>
                  <Button color={theme.colors.primary} text="연락처 수정" />
                </ButtonWrapper>
              </ContectInput>
            </BoxBody>
            <BoxTail>
              <SaveBtnWrapper>
                <Button
                  bgc={theme.colors.primary}
                  color={theme.colors.white}
                  text="저장"
                  onClick={closeBasicEditModal}
                />
              </SaveBtnWrapper>
            </BoxTail>
          </Container>

          <AskCancel
            state={showAskCancelModal}
            closeAskCancelModal={closeAskCancelModal}
            closeUpperModal={closeBasicEditModal}
          />
        </div>
      )}
    </StyledBasicEditModal>
  );
}

const StyledBasicEditModal = styled.div``;

const DimBg = styled.div`
  position: absolute;
  top: ${({ scrollY }) => scrollY - 52 + 'px'};
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 10000;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${({ scrollY }) => scrollY + 'px'};
  left: 50%;
  transform: translate(-50%, 0);
  width: 650px;
  margin: 0 auto;
  border-radius: 5pt;
  background-color: white;
  z-index: 15000;
`;

const BoxHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  border-bottom: 1px solid lightgray;

  h2 {
    font-size: 18px;
  }

  .highlightCircle {
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

    i {
      color: ${({ theme }) => theme.colors.btnGrey};
      font-size: 20px;
    }
  }
`;

const BoxBody = styled.div`
  padding: 15px;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const LastNameInput = styled.div`
  margin-top: 10px;
`;

const FirstNameInput = styled.div`
  margin-top: 30px;
`;

const OneLieProfileInput = styled.div`
  margin-top: 30px;
`;

const CompanyNameInput = styled.div`
  margin-top: 30px;
`;

const IndustryInput = styled.div`
  margin-top: 30px;
`;

const CheckBoxWrapper = styled.div`
  margin: 40px 0 20px 0;
`;

const SchoolNameInput = styled.div`
  margin-top: 30px;
`;

const RegionInput = styled.div`
  margin-top: 30px;
`;

const CityInput = styled.div`
  margin-top: 30px;
`;

const ContectInput = styled.div`
  margin-top: 40px;
  color: grey;
  font-size: 15px;

  .link {
    margin-top: 5px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const BoxTail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 15px;
  border-top: 1px solid lightgray;
`;

const SaveBtnWrapper = styled.div``;

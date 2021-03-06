import { useEffect, useState } from 'react';
import styled from 'styled-components';
import EndInput from './components/EndInput';
import StartInput from './components/StartInput';
import Button from '../../../components/Button/Button';
import TextInput from './components/TextInput';
import CheckBox from './components/CheckBox';
import TextArea from './components/TextArea';
import AskCancel from './components/AskCancelModal';
import theme from '../../../styles/theme';

export default function CareerEditModal(props) {
  const [isWorkingNow, setIsWorkingNow] = useState(true);
  const [isPositionClosed, setIsPositionClosed] = useState(false);
  const [showAskCancelModal, setShowAskCancelModal] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    // 현재 직책 종료 여부 초기화
    if (workingCurrently) setIsWorkingNow(workingCurrently);
    // setIsWorkingNow(workingCurrently);
  }, []);

  const openAskCancelModal = e => {
    e.preventDefault();
    setShowAskCancelModal(true);
  };

  const closeAskCancelModal = e => {
    e.preventDefault();
    if (e.target.textContent === '삭제') setHasChanged(false);
    setShowAskCancelModal(false);
  };

  const toggleIsWorkingNow = () => {
    setIsWorkingNow(!isWorkingNow);
  };

  const toggleIsPositionClosed = () => {
    setIsPositionClosed(!isPositionClosed);
  };

  const toggleHasChanged = () => {
    setHasChanged(true);
  };

  const { selectedCareer, showCareerEditModal, closeCareerEditModal } = props;
  const {
    position,
    employmentType,
    companyName,
    country,
    city,
    isWorkingNow: workingCurrently,
    startMonth,
    startYear,
    endMonth,
    endYear,
    industry,
    description,
  } = props.selectedCareer || {};

  return (
    <StyledCareerAddModal showCareerEditModal={showCareerEditModal}>
      {showCareerEditModal && (
        <div>
          <DimBg
            scrollY={window.scrollY}
            onClick={hasChanged ? openAskCancelModal : closeCareerEditModal}
          />
          <Container scrollY={window.scrollY}>
            <BoxHeader>
              <h2>경력 사항 수정</h2>
              <div className="highlightCircle">
                <i
                  className="fal fa-times"
                  onClick={
                    hasChanged ? openAskCancelModal : closeCareerEditModal
                  }
                />
              </div>
            </BoxHeader>
            <BoxBody onChange={toggleHasChanged}>
              <form method="POST">
                <PositionInput>
                  <TextInput
                    title="직책"
                    name="position"
                    defaultValue={position}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </PositionInput>
                <EmploymentTypeInput>
                  <TextInput
                    title="고용형태"
                    name="employmentType"
                    defaultValue={employmentType}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                  <EmploymentMoreInfo>국가별 고용형태</EmploymentMoreInfo>
                  <a
                    href="https://www.linkedin.com/help/linkedin/answer/123304"
                    target="_blank"
                    rel="noreferrer"
                  >
                    자세히 보기
                  </a>
                </EmploymentTypeInput>
                <CompanyNameInput>
                  <TextInput
                    title="회사이름"
                    name="companyName"
                    defaultValue={companyName}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </CompanyNameInput>
                <RegionInput>
                  <TextInput
                    title="지역"
                    name="region"
                    textLimit={100}
                    defaultValue={`${country} ${city || ''}`}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={true}
                  />
                </RegionInput>
                <CheckBoxWrapper isWorkingNow={isWorkingNow}>
                  <CheckBox
                    id="cbIsWorking"
                    name="isWorkingNow"
                    state={isWorkingNow}
                    text="현재 이 업무로 근무 중"
                    onClick={toggleIsWorkingNow}
                  />
                </CheckBoxWrapper>
                <StartAndEndWrapper>
                  <StartInput
                    title="시작일"
                    defaultValue={[startMonth, startYear]}
                  />
                  <EndInput
                    title="종료일"
                    defaultValue={[endMonth, endYear]}
                    state={isWorkingNow}
                  />
                </StartAndEndWrapper>
                {isWorkingNow && (
                  <CheckBoxWrapper isPositionClosed={isPositionClosed}>
                    <CheckBox
                      id="cbPositionClosed"
                      name="isPositionClosed"
                      state={isPositionClosed}
                      text={`현재 직책 종료 - ${selectedCareer.position} at ${selectedCareer.companyName}`}
                      onClick={toggleIsPositionClosed}
                    />
                  </CheckBoxWrapper>
                )}
                <IndustryInput>
                  <TextInput
                    title="업계"
                    name="industry"
                    defaultValue={industry}
                  />
                </IndustryInput>
                <DescInput>
                  <TextArea
                    title="설명"
                    name="description"
                    rows={3}
                    defaultValue={description}
                    textLimit={2000}
                    warningText="설명은 2,000자를 넘을 수 없습니다."
                  />
                </DescInput>
              </form>
              <MediaInput>
                <div>미디어</div>
                <div className="link">
                  외부 문서, 사진 ,사이트, 동영상, 프레젠테이션 링크{' '}
                  <a
                    href="https://www.linkedin.com/help/linkedin/answer/34327/supported-providers-and-content-types-for-work-samples-on-your-profile"
                    target="blank"
                  >
                    자세히 보기
                  </a>
                </div>
                <ButtonWrapper>
                  <Button color={theme.colors.primary} text="미디어 등록" />
                </ButtonWrapper>
              </MediaInput>
            </BoxBody>
            <BoxTail>
              <SaveBtnWrapper>
                <Button
                  bgc={theme.colors.primary}
                  color={theme.colors.white}
                  text="저장"
                  onClick={closeCareerEditModal}
                />
              </SaveBtnWrapper>
            </BoxTail>
          </Container>
          <AskCancel
            state={showAskCancelModal}
            closeAskCancelModal={closeAskCancelModal}
            closeUpperModal={closeCareerEditModal}
          />
        </div>
      )}
    </StyledCareerAddModal>
  );
}

const StyledCareerAddModal = styled.div``;

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

const PositionInput = styled.div`
  margin-top: 10px;
`;

const EmploymentTypeInput = styled.div`
  margin-top: 40px;
  color: grey;
  font-size: 15px;

  a {
    font-size: 16px;
  }
`;

const EmploymentMoreInfo = styled.div`
  margin-top: 10px;

  a {
    margin-top: 5px;
  }
`;

const CompanyNameInput = styled.div`
  margin-top: 40px;
`;

const RegionInput = styled.div`
  margin-top: 40px;
`;

const CheckBoxWrapper = styled.div`
  margin: 40px 0 20px 0;
`;

const StartAndEndWrapper = styled.div`
  margin-top: 30px;
`;

const IndustryInput = styled.div`
  margin-top: 40px;
`;

const DescInput = styled.div`
  margin-top: 40px;
`;

const MediaInput = styled.div`
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

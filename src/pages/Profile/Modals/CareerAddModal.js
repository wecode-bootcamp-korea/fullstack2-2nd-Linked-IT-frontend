import { useState } from 'react';
import styled from 'styled-components';
import EndInput from './components/EndInput';
import StartInput from './components/StartInput';
import Button from '../../../components/Button/Button';
import TextInput from './components/TextInput';
import CheckBox from './components/CheckBox';
import TextArea from './components/TextArea';
import AskCancel from './components/AskCancelModal';
import theme from '../../../styles/theme';
import SectionInput from './components/sectionInput';

export default function CareerAddModal(props) {
  const [isWorkingNow, setIsWorkingNow] = useState(false);
  const [isPositionClosed, setIsPositionClosed] = useState(false);
  const [showAskCancelModal, setShowAskCancelModal] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  //inputs
  const [positionInput, setPositionInput] = useState('');
  const [employmenntTypeInput, setEmploymentTypeInput] = useState('');
  const [companyInput, setCompanyInput] = useState('');
  const [regionNameInput, setRegionNameInput] = useState('');
  const [startMonthInput, setStartMonthInput] = useState('');
  const [startYearInput, setStartYearInput] = useState('');
  const [endMonthInput, setEndMonthInput] = useState('');
  const [endYearInput, setEndYearInput] = useState('');
  const [industryInput, setIndustryInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const setStates = [
    setPositionInput,
    setEmploymentTypeInput,
    setCompanyInput,
    setRegionNameInput,
    setStartMonthInput,
    setStartYearInput,
    setEndMonthInput,
    setEndYearInput,
    setIndustryInput,
    setDescriptionInput,
  ];

  // const createNewCareer = () => {
  //   if (!positionInput) return alert('필수정보를 입력하지 않으셨습니다.');
  //   if (!employmenntTypeInput)
  //     return alert('필수정보를 입력하지 않으셨습니다.');
  //   if (!CompanyNameInput) return alert('필수정보를 입력하지 않으셨습니다.');
  //   if (!startMonthInput) return alert('필수정보를 입력하지 않으셨습니다.');
  //   if (!startYearInput) return alert('필수정보를 입력하지 않으셨습니다.');
  //   if (!industryInput) return alert('필수정보를 입력하지 않으셨습니다.');
  //   alert('fetch 시작!');
  //   fetch('/user/1/career', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     method: 'POST',
  //     body: JSON.stringify({
  //       isCurrentPosition: 1,
  //       isEndCurrentPosition: 0,
  //       startMonth: startMonthInput,
  //       startYear: startYearInput,
  //       endMonth: endMonthInput,
  //       endYear: endYearInput,
  //       description: descriptionInput,
  //       positionId: 'artist',
  //       companyName: '토스',
  //       industry: industryInput,
  //       userId: 1,
  //       employmentTypeId: employmenntTypeInput,
  //       scopeOfPublicId: 1,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       const newCareer = {
  //         companyLogo:
  //           'https://media-exp1.licdn.com/dms/image/C560BAQGuGPu5c4Rmmw/company-logo_100_100/0/1605766502615?e=1643241600&v=beta&t=TtAaOV7Gp7wnfRUrpaY7musGWlQuhfS5GCEIxRYPFtg',
  //         position: positionInput,
  //         companyName: CompanyNameInput,
  //         employmentType: employmenntTypeInput,
  //         startMonth: startMonthInput,
  //         startYear: startYearInput,
  //         endMonth: endMonthInput,
  //         endYear: endYearInput,
  //         country: '대한민국',
  //         city: regionNameInput,
  //         industry: industryInput,
  //         description: descriptionInput,
  //       };
  //       addNewCareer(newCareer);
  //       closeCareerAddModal();
  //     })
  //     .catch(e => console.log(e));
  // };

  //비상시
  const createNewCareer = e => {
    e.preventDefault();
    if (!positionInput) return alert('필수정보를 입력하지 않으셨습니다.');
    // if (!employmenntTypeInput)
    // return alert('필수정보를 입력하지 않으셨습니다.');
    if (!CompanyNameInput) return alert('필수정보를 입력하지 않으셨습니다.');
    if (!startMonthInput) return alert('필수정보를 입력하지 않으셨습니다.');
    if (!startYearInput) return alert('필수정보를 입력하지 않으셨습니다.');
    if (!industryInput) return alert('필수정보를 입력하지 않으셨습니다.');

    const newCareer = {
      id: 1,
      companyLogo:
        'https://media-exp1.licdn.com/dms/image/C560BAQGuGPu5c4Rmmw/company-logo_100_100/0/1605766502615?e=1643241600&v=beta&t=TtAaOV7Gp7wnfRUrpaY7musGWlQuhfS5GCEIxRYPFtg',
      position: positionInput,
      companyName: companyInput,
      employmoentType: employmenntTypeInput,
      startMonth: startMonthInput,
      startYear: startYearInput,
      endMonth: endMonthInput,
      endYear: endYearInput,
      country: regionNameInput,
      description: descriptionInput,
      isWorkingNow: isWorkingNow,
    };

    addNewCareer(newCareer);
    closeCareerAddModal();
  };

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

  const {
    currentCareer,
    showCareerAddModal,
    closeCareerAddModal,
    addNewCareer,
  } = props;

  return (
    <StyledCareerAddModal showCareerAddModal={showCareerAddModal}>
      {showCareerAddModal && (
        <div>
          <DimBg
            scrollY={window.scrollY}
            onClick={hasChanged ? openAskCancelModal : closeCareerAddModal}
          />
          <Container scrollY={window.scrollY}>
            <BoxHeader>
              <h2>경력 입력</h2>
              <div className="highlightCircle">
                <i
                  className="fal fa-times"
                  onClick={
                    hasChanged ? openAskCancelModal : closeCareerAddModal
                  }
                />
              </div>
            </BoxHeader>
            <BoxBody onChange={toggleHasChanged}>
              <form method="POST">
                <PositionInput>
                  <TextInput
                    title="직책*"
                    name="position"
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                    setState={setStates}
                    num={0}
                  />
                </PositionInput>
                <EmploymentTypeInput>
                  <SectionInput
                    title="고용형태*"
                    name="employmenntType"
                    defaultValue="고용형태"
                    placeHolder="고용형태"
                    setState={setStates}
                    num={1}
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
                    title="회사이름*"
                    name="companyName"
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                    setState={setStates}
                    num={2}
                  />
                </CompanyNameInput>
                <RegionInput>
                  <TextInput
                    title="지역"
                    name="region"
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={true}
                    setState={setStates}
                    num={3}
                  />
                </RegionInput>
                <CheckBoxWrapper isWorkingNow={isWorkingNow}>
                  <CheckBox
                    id="cbIsWorking"
                    name="isWorkingNow"
                    state={isWorkingNow}
                    text="종료일 미입력"
                    onClick={toggleIsWorkingNow}
                  />
                </CheckBoxWrapper>
                <StartAndEndWrapper>
                  <StartInput title="시작일*" setState={setStates} num={4} />
                  <EndInput
                    title="종료일"
                    state={isWorkingNow}
                    setState={setStates}
                    num={6}
                  />
                </StartAndEndWrapper>
                {isWorkingNow && (
                  <CheckBoxWrapper isPositionClosed={isPositionClosed}>
                    <CheckBox
                      id="cbPositionClosed"
                      name="isPositionClosed"
                      state={isPositionClosed}
                      text={`현재 직책 종료 - ${currentCareer[0].position} at ${currentCareer[0].companyName}`}
                      onClick={toggleIsPositionClosed}
                    />
                  </CheckBoxWrapper>
                )}
                <IndustryInput>
                  <TextInput
                    title="업계*"
                    name="industry"
                    setState={setStates}
                    num={8}
                  />
                </IndustryInput>
                <DescInput>
                  <TextArea
                    title="설명"
                    name="description"
                    rows={3}
                    textLimit={2000}
                    warningText="설명은 2,000자를 넘을 수 없습니다."
                    setState={setStates}
                    num={9}
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
                  onClick={createNewCareer}
                />
              </SaveBtnWrapper>
            </BoxTail>
          </Container>
          <AskCancel
            state={showAskCancelModal}
            closeAskCancelModal={closeAskCancelModal}
            closeUpperModal={closeCareerAddModal}
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
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  color: grey;
  font-size: 15px;

  a {
    padding-top: 5px;
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

import { useState } from 'react';
import styled from 'styled-components';
import EndInput from './components/EndInput';
import StartInput from './components/StartInput';
import Button from '../../../components/Button/Button';
import TextInput from './components/TextInput';
import TextArea from './components/TextArea';
import AskCancel from './components/AskCancelModal';
import theme from '../../../styles/theme';

export default function EducationEditModal(props) {
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

  const { showEducationEditModal, closeEducationEditModal } = props;
  const { schoolName, degree, major, startDate, endDate, gpa, activity, desc } =
    props.education || {};

  return (
    <StyledEducationEditModal showEducationEditModal={showEducationEditModal}>
      {showEducationEditModal && (
        <div>
          <DimBg
            scrollY={window.scrollY}
            onClick={hasChanged ? openAskCancelModal : closeEducationEditModal}
          />
          <Container scrollY={window.scrollY}>
            <BoxHeader>
              <h2>학력사항 수정</h2>
              <div className="highlightCircle">
                <i
                  className="fal fa-times"
                  onClick={
                    hasChanged ? openAskCancelModal : closeEducationEditModal
                  }
                />
              </div>
            </BoxHeader>
            <BoxBody onChange={toggleHasChanged}>
              <form method="POST">
                <SchoolInput>
                  <TextInput
                    title="학교"
                    name="schoolName"
                    defaultValue={schoolName}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </SchoolInput>
                <DegreeInput>
                  <TextInput
                    title="학위"
                    name="degree"
                    defaultValue={degree}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={true}
                  />
                </DegreeInput>
                <MajorInput>
                  <TextInput
                    title="전공"
                    name="major"
                    defaultValue={major}
                    textLimit={100}
                    warningText="100자를 초과할 수 없습니다."
                    isNullable={true}
                  />
                </MajorInput>
                <StartAndEndWrapper>
                  <StartInput title="입학일" defaultValue={startDate} />
                  <EndInput title="졸업일(예정)" defaultValue={endDate} />
                </StartAndEndWrapper>
                <GradeInput>
                  <TextInput
                    title="학점"
                    name="grade"
                    defaultValue={gpa}
                    textLimit={10}
                    warningText="10자를 초과할 수 없습니다."
                    isNullable={false}
                  />
                </GradeInput>
                <ActivityInput>
                  <TextArea
                    title="동아리나 학회"
                    name="activity"
                    defaultValue={activity}
                    rows={3}
                    textLimit={500}
                    warningText="동아리나 학회는 500자를 넘을 수 없습니다."
                  />
                </ActivityInput>
                <DescInput>
                  <TextArea
                    title="설명"
                    name="description"
                    defaultValue={desc}
                    rows={3}
                    textLimit={1000}
                    warningText="설명은 1,000자를 넘을 수 없습니다."
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
                  onClick={closeEducationEditModal}
                />
              </SaveBtnWrapper>
            </BoxTail>
          </Container>

          <AskCancel
            state={showAskCancelModal}
            closeAskCancelModal={closeAskCancelModal}
            closeUpperModal={closeEducationEditModal}
          />
        </div>
      )}
    </StyledEducationEditModal>
  );
}

const StyledEducationEditModal = styled.div``;

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

const SchoolInput = styled.div`
  margin-top: 10px;
`;

const DegreeInput = styled.div`
  margin-top: 30px;
`;

const MajorInput = styled.div`
  margin-top: 30px;
`;

const StartAndEndWrapper = styled.div`
  margin-top: 30px;
`;

const GradeInput = styled.div`
  margin-top: 30px;
`;

const ActivityInput = styled.div`
  margin-top: 30px;
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

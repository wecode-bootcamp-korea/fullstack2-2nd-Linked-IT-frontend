import styled from 'styled-components';
import Button from '../../../../../components/Button/Button';
import theme from '../../../../../styles/theme';

export default function AskCancel(props) {
  const { state, closeAskCancelModal, closeUpperModal } = props;
  return (
    <StyledAskCancelModal>
      {state && (
        <div>
          <DimBg scrollY={window.scrollY} onClick={closeAskCancelModal} />
          <Container>
            <BoxHeader>
              <h2>변경 취소</h2>
              <div className="highlightCircle">
                <i className="fal fa-times" onClick={closeAskCancelModal} />
              </div>
            </BoxHeader>
            <BoxBody>변경하신 내용을 삭제하시겠어요?</BoxBody>
            <BoxTail>
              <NoBtnWrapper onClick={closeAskCancelModal}>
                <Button color={theme.colors.primary} text="아니요" />
              </NoBtnWrapper>
              <DeleteBtnWrapper
                onClick={e => {
                  closeAskCancelModal(e);
                  closeUpperModal(e);
                }}
              >
                <Button
                  bgc={theme.colors.primary}
                  color={theme.colors.white}
                  text="삭제"
                />
              </DeleteBtnWrapper>
            </BoxTail>
          </Container>
        </div>
      )}
    </StyledAskCancelModal>
  );
}

const StyledAskCancelModal = styled.div``;

const DimBg = styled.div`
  position: absolute;
  top: ${({ scrollY }) => scrollY - 52 + 'px'};
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  z-index: 20000;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 120px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 300px;
  margin: 0 auto;
  border-radius: 5pt;
  background-color: white;
  z-index: 25000;
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
  padding: 10px;
  max-height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const BoxTail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 10px;
  border-top: 1px solid lightgray;
`;

const NoBtnWrapper = styled.div``;
const DeleteBtnWrapper = styled.div`
  margin-left: 10px;
`;

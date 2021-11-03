import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import theme from '../../styles/theme';
import AskCancel from './Modals/components/AskCancelModal';

export default function ImgUploadModal(props) {
  const [imgPreview, setImgPreView] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [showAskCancelModal, setShowAskCancelModal] = useState(false);

  const handleChangeFile = e => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const preView = reader.result;
      if (preView) setImgPreView(preView.toString()); // 파일 preView 상태 업데이트
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(e.target.files[0]); // 파일 상태 업데이트
    }
  };

  const uploadImg = type => {
    type === 'img' ? updateProfileImg(imgPreview) : updateBgImg(imgPreview);
    setHasChanged(false);
    closeImgUploadmodal();
    setImgPreView('');
  };

  const openAskCancelModal = e => {
    e.preventDefault();
    setShowAskCancelModal(true);
  };

  const closeAskCancelModal = e => {
    e.preventDefault();
    if (e.target.textContent === '삭제') setHasChanged(false);
    setShowAskCancelModal(false);
    setImgPreView('');
  };

  const {
    type,
    showImgUploadModal,
    closeImgUploadmodal,
    updateBgImg,
    updateProfileImg,
  } = props;
  console.log(type);
  return (
    <StyledImgUploadModal>
      {showImgUploadModal && (
        <div>
          <DimBg
            scrollY={window.scrollY}
            onClick={hasChanged ? openAskCancelModal : closeImgUploadmodal}
          />
          <Container scrollY={window.scrollY}>
            <BoxHeader>
              <h2>프로필 배경사진 업로드</h2>
              <div className="highlightCircle">
                <i
                  className="fal fa-times"
                  onClick={
                    hasChanged ? openAskCancelModal : closeImgUploadmodal
                  }
                />
              </div>
            </BoxHeader>
            <BoxBody>
              <img
                alt="사진업로드 안내사진"
                src={imgPreview ? imgPreview : 'images/imgUploadDefault.png'}
              />
            </BoxBody>
            <BoxTail onChange={() => setHasChanged(true)}>
              <UploadBtnWrapper>
                <form encType="multipart/form-data" action="/" method="POST">
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    name="file"
                    required
                    onChange={handleChangeFile}
                  />
                  {!imgPreview && <label htmlFor="upload">사진 찾기</label>}
                  {imgPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        uploadImg(type);
                      }}
                    >
                      업로드
                    </button>
                  )}
                </form>
              </UploadBtnWrapper>
              <CancelBtnWrapper
                onClick={hasChanged ? openAskCancelModal : closeImgUploadmodal}
              >
                <Button color={theme.colors.primary} text="취소" />
              </CancelBtnWrapper>
            </BoxTail>
          </Container>
          <AskCancel
            state={showAskCancelModal}
            closeAskCancelModal={closeAskCancelModal}
            closeUpperModal={closeImgUploadmodal}
          />
        </div>
      )}
    </StyledImgUploadModal>
  );
}

const StyledImgUploadModal = styled.div`
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

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
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 15px;
  max-height: 300px;
  overflow-y: hidden;
  overflow-x: hidden;

  img {
    margin: -10px 0 0 15px;
    width: 600px;
    object-fit: contain;
  }
`;

const BoxTail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  padding: 15px;
  border-top: 1px solid lightgray;
`;

const UploadBtnWrapper = styled.div`
  input {
    display: none;
  }

  label {
    display: block;
    text-align: center;
    width: 100px;
    height: 30px;
    padding-top: 8px;
    margin-right: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 15px;
    font-style: 20px;
  }

  button {
    display: block;
    text-align: center;
    width: 100px;
    height: 30px;
    padding-top: 3px;
    margin-right: 10px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 18px;
  }
`;

const CancelBtnWrapper = styled.div``;

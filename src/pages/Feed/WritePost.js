import { useState, useRef } from 'react';
import styled from 'styled-components';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import isKorean from '../../utils/LanguageUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uploadBtns from './data/UploadBtns';
import modalUploadBtns from './data/modalUploadBtns';

export default function WritePost({ myProfileData, addPost }) {
  const {
    id,
    firstName,
    lastName,
    userProfileUrl,
    companyNameKor,
    companyNameEng,
    currentPosition,
  } = myProfileData;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalBtn, setIsModalBtn] = useState(false);
  const valueRef = useRef();

  const name = `${
    isKorean(firstName) ? `${lastName}${firstName}` : `${firstName} ${lastName}`
  }`;

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleBtn = e => {
    if (e.target.value !== '') {
      setIsModalBtn(true);
    } else {
      setIsModalBtn(false);
    }
  };

  const uploadPost = () => {
    addPost([
      {
        id: 113,
        userid: id,
        firstName: firstName,
        lastName: lastName,
        userProfileUrl: userProfileUrl,
        companyNameKor: companyNameKor,
        companyNameEng: companyNameEng,
        currentPosition: currentPosition,
        createdAt: '1일',
        text: valueRef.current.value,
        image: '',
      },
    ]);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <WritePostContainer>
      {isModalOpen && (
        <WriteModalBg>
          <WriteModalBox>
            <ModalHeader>
              <span>업데이트 쓰기</span>
              <button onClick={handleModal}>
                <img alt="thinClose" src="/Images/ico_thinClose.svg" />
              </button>
            </ModalHeader>
            <SetPublic>
              <img alt="myProfileImg" src={userProfileUrl} />
              <span>{name}</span>
              <button>
                <img alt="tallShort" src="/Images/ico_tallShort.svg" />
                <span>1촌만</span>
                <div>
                  <FontAwesomeIcon icon={faSortDown} />
                </div>
              </button>
            </SetPublic>
            <WriteBox
              placeholder="나누고 싶은 생각이 있으세요?"
              onChange={handleBtn}
              ref={valueRef}
            />
            <AddHashTag>해시태그 추가</AddHashTag>
            <ModalFooter>
              <ModalUploadBtns>
                {modalUploadBtns.map((el, idx) => {
                  return <img key={idx} alt={el.alt} src={el.src} />;
                })}
              </ModalUploadBtns>
              <TextBox alt="textBox" src="/Images/ico_textBox.svg" />
              <EditPublic>1촌만</EditPublic>
              {isModalBtn ? (
                <AbledButton onClick={uploadPost}>올리기</AbledButton>
              ) : (
                <DisabledButton>올리기</DisabledButton>
              )}
            </ModalFooter>
          </WriteModalBox>
        </WriteModalBg>
      )}
      <WritePostBtn onClick={handleModal}>
        <img alt="myProfileImg" src={userProfileUrl} />
        <div>
          <span>글 올리기</span>
        </div>
      </WritePostBtn>
      <UploadBtns>
        {uploadBtns.map((el, idx) => {
          return (
            <button>
              <img key={idx} alt={el.alt} src={el.src} />
              <span>{el.span}</span>
            </button>
          );
        })}
      </UploadBtns>
    </WritePostContainer>
  );
}

const WritePostContainer = styled.div`
  height: 120px;
  width: 100%;
  min-width: 540px;
  max-width: 760px;
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.white};
`;

const WriteModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 20;
`;

const AddHashTag = styled.div`
  padding: 5px 20px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  font-weight: 600;
`;

const ModalFooter = styled.div`
  position: relative;
  margin-top: 10px;
  text-align: left;
`;

const ModalUploadBtns = styled.div`
  display: inline-block;
  border-right: 1px solid ${({ theme }) => theme.colors.borderGrey};
  width: 300px;
  padding: 5px 0 5px 20px;
  text-align: left;

  img {
    margin-right: 15px;
    color: ${({ theme }) => theme.colors.fontGrey};
    opacity: 0.5;
  }
`;

const TextBox = styled.img`
  position: absolute;
  top: 10px;
  left: 320px;
  opacity: 0.5;
`;

const EditPublic = styled.span`
  position: absolute;
  top: 13px;
  left: 340px;
  color: ${({ theme }) => theme.colors.fontGrey};
`;

const DisabledButton = styled.button`
  position: absolute;
  top: 5px;
  right: 30px;
  height: 30px;
  width: 70px;
  border: none;
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.fontGrey};
  background-color: ${({ theme }) => theme.colors.borderGrey};
  font-size: 1.05rem;

  &:hover {
    cursor: not-allowed;
  }
`;

const AbledButton = styled.button`
  position: absolute;
  top: 5px;
  right: 30px;
  height: 30px;
  width: 70px;
  border: none;
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.btnNavy};
  font-size: 1.05rem;

  &:hover {
    cursor: pointer;
  }
`;

const WriteModalBox = styled.div`
  position: absolute;
  top: calc(50vh - 254px);
  left: calc(50vw - 275px);
  height: 360px;
  width: 550px;
  border-radius: 12px;
  background-color: white;
  z-index: 30;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};

  span {
    font-size: 1.3rem;
  }

  button {
    border: none;
    background-color: white;

    &:hover {
      cursor: pointer;
    }
  }

  img {
    width: 20px;
  }
`;

const SetPublic = styled.div`
  position: relative;
  padding: 15px;
  text-align: left;

  img {
    width: 45px;
  }

  span {
    position: absolute;
    top: 10px;
    font-size: 1.1rem;
    font-weight: 600;
  }

  button {
    position: absolute;
    top: 30px;
    height: 30px;
    width: 90px;
    padding-left: 10px;
    border: 1px solid ${({ theme }) => theme.colors.fontGrey};
    border-radius: 25px;
    color: ${({ theme }) => theme.colors.fontGrey};
    background-color: white;
    text-align: left;

    img {
      width: 18px;
      vertical-align: middle;
    }

    span {
      position: absolute;
      top: 5px;
      left: 30px;
      font-size: 0.9rem;
    }

    div {
      position: absolute;
      top: 5px;
      left: 70px;
    }
  }
`;

const WriteBox = styled.textarea`
  width: 92%;
  height: 9rem;
  border: none;
  font-size: 1.05rem;
  resize: none;
  overflow: hidden;

  &:focus {
    outline: none;
  }
`;

const WritePostBtn = styled.div`
  text-align: left;

  img {
    width: 45px;
    vertical-align: top;
  }

  div {
    display: inline-block;
    height: 46px;
    width: 90%;
    margin-left: 5px;
    margin-top: 2px;
    padding: 15px;
    border: 1px solid #909090;
    border-radius: 25px;

    &:hover {
      background-color: ${({ theme }) => theme.colors.borderGrey};
      cursor: pointer;
    }

    span {
      display: inline-block;
      color: ${({ theme }) => theme.colors.fontGrey};
    }
  }
`;

const UploadBtns = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 15px 0;

  button {
    height: 40px;
    width: 90px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};

    &:hover {
      background-color: ${({ theme }) => theme.colors.borderGrey};
      cursor: pointer;
    }

    img {
      margin-right: 5px;
      vertical-align: middle;
    }

    span {
      color: ${({ theme }) => theme.colors.fontGrey};
    }
  }
`;

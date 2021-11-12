import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import isKorean from '../../utils/LanguageUtil';
import modalUploadBtns from './data/modalUploadBtns';
import API_ENDPOINT from '../../api';

export default function PostModal({
  myProfileData,
  postData,
  setPostUpdate,
  setIsModalOpen,
}) {
  const { firstName, lastName, userProfileUrl } = myProfileData;
  const [activeUploadBtn, setActiveUploadBtn] = useState(false);
  const valueRef = useRef();

  const name = `${
    isKorean(firstName) ? `${lastName}${firstName}` : `${firstName} ${lastName}`
  }`;

  const handleBtn = e => {
    if (e.target.value !== '') {
      setActiveUploadBtn(true);
    } else {
      setActiveUploadBtn(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImgShow = postData => {
    if (!postData) return false;
    if (!postData.image) return false;
    else return true;
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const addPost = () => {
    fetch(`${API_ENDPOINT}/post/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: valueRef.current.value,
        postScopeOfPublicId: 1,
        commentScopeOfPublicId: 1,
        userId: 1,
        postAttachmentId: 1,
      }),
    })
      .then(res => res.json())
      .then(console.log('ADD_POST_SUCCESS'))
      .catch(error => {
        console.log(error);
      });
    setPostUpdate(true);
    setIsModalOpen(false);
  };

  const editPost = () => {
    fetch(`${API_ENDPOINT}/post/update`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        updateContent: valueRef.current.value,
        postId: postData.id,
      }),
    })
      .then(res => res.json())
      .then(console.log('EDIT_POST_SUCCESS'))
      .catch(error => {
        console.log(error);
      });
    setPostUpdate(true);
    setIsModalOpen(false);
  };

  return (
    <WriteModal>
      <WriteModalBg onClick={closeModal} />
      <WriteModalBox>
        <ModalHeader>
          <span>업데이트 쓰기</span>
          <button onClick={closeModal}>
            <img alt="thinClose" src="/images/ico_thinClose.svg" />
          </button>
        </ModalHeader>
        <SetPublic>
          <img alt="myProfileImg" src={userProfileUrl} />
          <span>{name}</span>
          <button>
            <img alt="tallShort" src="/images/ico_tallShort.svg" />
            <span>1촌만</span>
            <div>
              <FontAwesomeIcon icon={faSortDown} />
            </div>
          </button>
        </SetPublic>
        <ContentContainer>
          <WriteBox
            placeholder="나누고 싶은 생각이 있으세요?"
            defaultValue={postData ? postData.content : ''}
            ref={valueRef}
            onChange={handleBtn}
          />
          <AddHashTag>해시태그 추가</AddHashTag>
          {handleImgShow(postData) && (
            <ImgBox alt="postImg" src={postData ? postData.image : ''} />
          )}
        </ContentContainer>
        <ModalFooter>
          <ModalUploadBtns>
            {modalUploadBtns.map((el, idx) => {
              return <img key={idx} alt={el.alt} src={el.src} />;
            })}
          </ModalUploadBtns>
          <TextBox alt="textBox" src="/images/ico_textBox.svg" />
          <EditPublic>1촌만</EditPublic>
          {activeUploadBtn ? (
            <AbledButton onClick={postData ? editPost : addPost}>
              올리기
            </AbledButton>
          ) : (
            <DisabledButton>올리기</DisabledButton>
          )}
        </ModalFooter>
      </WriteModalBox>
    </WriteModal>
  );
}

const WriteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
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

const WriteModalBox = styled.div`
  position: absolute;
  top: calc(50vh - 253px);
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
    cursor: pointer;
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

const ContentContainer = styled.div`
  height: 180px;
  width: 540px;
  resize: none;
  overflow-x: hidden;
  overflow-y: scroll;
`;

const WriteBox = styled.textarea`
  min-height: 120px;
  width: 560px;
  padding: 0 20px;
  border: none;
  font-size: 1.05rem;
  overflow: visible;

  &:focus {
    outline: none;
  }
`;

const AddHashTag = styled.div`
  margin-top: 10px;
  padding: 5px 20px;
  color: ${({ theme }) => theme.colors.primary};
  text-align: left;
  font-weight: 600;
`;

const ImgBox = styled.img`
  width: 500px;
  margin-top: 10px;
  border-radius: 5px;
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
  cursor: pointer;
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
  cursor: not-allowed;
`;

import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import isKorean from './../../utils/LanguageUtil';

export default function PostReply(props) {
  const { ...myProfileData } = props.myProfileData;
  const { firstName, lastName, headline, userProfileUrl } = myProfileData;

  const replyInputRef = useRef();
  const inputtedReplyRef = useRef();

  const [replyValue, setReplyValue] = useState('');
  const [replyId, setReplyId] = useState(1);
  const [replyList, setReplyList] = useState([]);

  const name = `${
    isKorean(firstName) ? `${lastName}${firstName}` : `${firstName} ${lastName}`
  }`;

  const handleReplyValue = e => {
    setReplyValue(e.target.value);
  };

  const pushReply = e => {
    setReplyId(e + 1);
    setReplyList([
      ...replyList,
      {
        id: replyId,
        writer: name,
        headline: headline,
        image: userProfileUrl,
        reply: replyValue,
        replyModal: false,
        replyLike: false,
        modifying: false,
        isActiveModifyBtn: false,
      },
    ]);
    setReplyValue('');
    replyInputRef.current.style.height = '44px';
  };

  const resizeReplyTextArea = () => {
    replyInputRef.current.style.height = '44px';
    replyInputRef.current.style.height =
      replyInputRef.current.scrollHeight + 'px';
  };

  const resizeModifyingTextArea = () => {
    inputtedReplyRef.current.style.height = '22px';
    inputtedReplyRef.current.style.height =
      inputtedReplyRef.current.scrollHeight + 'px';
  };

  const handleReplyModal = e => {
    const modalChangedReplyList = replyList.map(el => {
      if (e === el.id) {
        el.replyModal = !el.replyModal;
        return el;
      } else {
        el.replyModal = false;
        return el;
      }
    });
    setReplyList(modalChangedReplyList);
  };

  const handleModifying = e => {
    const modifyingReplyList = replyList.map(el => {
      if (e === el.id) {
        el.modifying = true;
        el.replyModal = false;
        return el;
      } else {
        el.isActiveModifyBtn = false;
        return el;
      }
    });
    setReplyList(modifyingReplyList);
  };

  const deleteReply = e => {
    const deletedReplyList = replyList.filter(el => e !== el.id);
    setReplyList(deletedReplyList);
  };

  const activeModifySaveBtn = e => {
    const modifyBtnChangedReplyList = replyList.map(el => {
      if (Number(e.target.id) === el.id) {
        if (e.target.value !== el.reply) {
          el.isActiveModifyBtn = true;
          return el;
        } else {
          el.isActiveModifyBtn = false;
          return el;
        }
      } else {
        return el;
      }
    });
    setReplyList(modifyBtnChangedReplyList);
  };

  const saveModifiedReply = e => {
    const replyChangedReplyList = replyList.map(el => {
      if (e === el.id) {
        el.reply = inputtedReplyRef.current.value;
        el.modifying = false;
        el.isActiveModifyBtn = false;
        return el;
      } else {
        return el;
      }
    });
    setReplyList(replyChangedReplyList);
    inputtedReplyRef.current.style.height = '20px';
  };

  const cancleModifyingReply = e => {
    const cancleModifyingReplyList = replyList.map(el => {
      if (e === el.id) {
        el.modifying = false;
        return el;
      } else {
        return el;
      }
    });
    setReplyList(cancleModifyingReplyList);
  };

  const handleLike = e => {
    const likeChangedReplyList = replyList.map(el => {
      if (e === el.id) {
        el.replyLike = !el.replyLike;
        return el;
      } else {
        return el;
      }
    });
    setReplyList(likeChangedReplyList);
  };

  const reverseReplyList = [...replyList].reverse();

  const replys = reverseReplyList.map(data => {
    const {
      id,
      writer,
      headline,
      image,
      reply,
      replyModal,
      replyLike,
      modifying,
      isActiveModifyBtn,
    } = data;
    return (
      <div className={id}>
        <img alt={writer} src={image} />
        <ReplyWrap>
          <ReplyButton>
            <button onClick={() => handleReplyModal(id)}>⋯</button>
            {replyModal && (
              <ReplyButtonModal>
                <ModifyReply onClick={() => handleModifying(id)}>
                  <FontAwesomeIcon icon={faPen} />
                  <span>변경</span>
                </ModifyReply>
                <DeleteReply onClick={() => deleteReply(id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                  <span>삭제</span>
                </DeleteReply>
              </ReplyButtonModal>
            )}
          </ReplyButton>
          <Writer>{writer}</Writer>
          <WriterHeadline>{headline}</WriterHeadline>
          {modifying ? (
            <ModifyingValue>
              <textarea
                id={id}
                defaultValue={reply}
                onKeyDown={resizeModifyingTextArea}
                ref={inputtedReplyRef}
                onChange={activeModifySaveBtn}
              />
              {isActiveModifyBtn ? (
                <SaveBtnActived onClick={() => saveModifiedReply(id)}>
                  <span>변경 사항 저장</span>
                </SaveBtnActived>
              ) : (
                <SaveBtnInactived>
                  <span>변경 사항 저장</span>
                </SaveBtnInactived>
              )}
              <CancleBtn onClick={() => cancleModifyingReply(id)}>
                <span>취소</span>
              </CancleBtn>
            </ModifyingValue>
          ) : (
            <ReplyValue>{reply}</ReplyValue>
          )}
        </ReplyWrap>
        <ButtonWrap>
          <LikeBtn onClick={() => handleLike(id)}>
            <span>추천</span>
          </LikeBtn>
          {replyLike && (
            <LikeIcon>
              <span>•</span>
              <img
                alt="likeIcon"
                src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
              />
            </LikeIcon>
          )}
          <ReplyBtn>
            <span>답장</span>
          </ReplyBtn>
        </ButtonWrap>
      </div>
    );
  });

  return (
    <article>
      <InputReply>
        <img alt="profileImage" src={userProfileUrl} />
        <textarea
          placeholder="댓글 남기기"
          value={replyValue}
          onChange={handleReplyValue}
          onKeyDown={resizeReplyTextArea}
          ref={replyInputRef}
        />
        {replyValue && (
          <button onClick={() => pushReply(replyId)}>올리기</button>
        )}
      </InputReply>
      <ReplyContainer>{replys}</ReplyContainer>
    </article>
  );
}

const InputReply = styled.div`
  margin: 10px 23px;
  text-align: left;

  img {
    width: 45px;
    border-radius: 50px;
  }

  textarea {
    height: 44px;
    width: 410px;
    margin-left: 20px;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.shadowGrey};
    border-radius: 25px;
    font-size: 1.06rem;
    resize: none;
    overflow: hidden;

    &:focus {
      outline: none;
    }
  }

  button {
    height: 28px;
    width: 60px;
    margin-top: 15px;
    margin-left: 65px;
    padding: 5px;
    border: none;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.btnNavy};
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
  }
`;

const ReplyContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  text-align: left;

  img {
    width: 40px;
    margin-left: 30px;
  }

  button {
    height: 20px;
    width: 30px;
  }
`;

const ReplyWrap = styled.div`
  display: inline-block;
  position: relative;
  width: 80%;
  margin-left: 5px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bgcBeige};
`;

const ReplyButton = styled.span`
  button {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 40px;
    border: none;
    color: ${({ theme }) => theme.colors.fontGrey};
    background-color: ${({ theme }) => theme.colors.bgcBeige};
    font-size: 1.2rem;

    &:hover {
      cursor: pointer;
    }
  }
`;

const ReplyButtonModal = styled.div`
  position: absolute;
  top: 25px;
  right: 15px;
  height: 70px;
  width: 100px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  box-shadow: 0px 3px 5px 0px #808080;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 0.9rem;

  span {
    margin-left: 10px;
  }
`;

const ModifyReply = styled.span`
  display: block;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
  }
`;
const DeleteReply = styled.span`
  display: block;

  &:hover {
    cursor: pointer;
  }
`;

const Writer = styled.span`
  display: block;
  margin-bottom: 5px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const WriterHeadline = styled.span`
  display: block;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 0.8rem;
`;

const ReplyValue = styled.div`
  line-height: 1.2rem;
  font-size: 0.9rem;
  white-space: pre-wrap;
`;

const ModifyingValue = styled.div`
  padding-bottom: 20px;

  textarea {
    margin-left: 5px;
    height: auto;
    width: 380px;
    border: none;
    background-color: ${({ theme }) => theme.colors.bgcBeige};
    resize: none;
    overflow: hidden;

    &:focus {
      outline: none;
    }
  }
`;

const SaveBtnActived = styled.div`
  display: inline-block;
  height: 25px;
  width: 110px;
  margin-top: 10px;
  margin-left: 5px;
  padding-top: 6px;
  border: none;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.btnNavy};
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const SaveBtnInactived = styled.div`
  display: inline-block;
  height: 25px;
  width: 110px;
  margin-top: 10px;
  margin-left: 5px;
  padding-top: 6px;
  border: none;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.fontGrey};
  background-color: ${({ theme }) => theme.colors.btnLightGrey};
  text-align: center;

  &:hover {
    cursor: not-allowed;
  }
`;

const CancleBtn = styled.div`
  display: inline-block;
  height: 25px;
  width: 50px;
  margin-top: 10px;
  margin-left: 5px;
  padding-top: 5px;
  border: 1px solid black;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.fontgrey};
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

const ButtonWrap = styled.div`
  display: block;
  margin-top: 10px;
  padding-bottom: 30px;
`;

const LikeBtn = styled.span`
  margin-top: 5px;
  margin-left: 80px;
  padding: 4px;
  height: 1.5rem;
  width: 30px;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgcBeige};
    cursor: pointer;
  }
`;

const LikeIcon = styled.span`
  display: inline-block;
  position: relative;
  height: 1.5rem;
  width: 40px;
  vertical-align: middle;

  span {
    position: absolute;
    top: 4px;
    color: ${({ theme }) => theme.colors.btnGrey};
  }

  img {
    position: absolute;
    top: 4px;
    left: -15px;
    width: 15px;
  }
`;

const ReplyBtn = styled.span`
  margin-left: 10px;
  padding: 4px;
  height: 1.5rem;
  width: 30px;
  font-size: 0.9rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgcBeige};
    cursor: pointer;
  }
`;

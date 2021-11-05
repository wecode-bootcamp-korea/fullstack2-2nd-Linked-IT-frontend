import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import isKorean from '../../utils/LanguageUtil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function PostReplyList({
  replyData,
  writer,
  setPostUpdate,
  setReplyUpdate,
  myProfileData,
}) {
  const { id, firstName, lastName, headline, userProfileUrl, content } =
    replyData;
  const [editModal, setEditModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [replyLike, setReplyLike] = useState(false);
  const valueRef = useRef();
  const editReplyModalRef = useRef();

  const name = `${
    isKorean(firstName) ? `${lastName}${firstName}` : `${firstName} ${lastName}`
  }`;

  const handleReplyModal = () => {
    setEditModal(!editModal);
  };

  const handleEditing = () => {
    setEditing(true);
    setEditModal(false);
  };

  const resizeEditingTextArea = () => {
    valueRef.current.style.height = '22px';
    valueRef.current.style.height = valueRef.current.scrollHeight + 'px';
  };

  const activeEditSaveBtn = e => {
    if (e.target.value.length === 0) {
      setEditBtn(false);
    } else if (e.target.value !== content) {
      setEditBtn(true);
    } else {
      setEditBtn(false);
    }
  };

  const cancleEditReply = () => {
    setEditing(false);
  };

  const handleLike = e => {
    setReplyLike(!replyLike);
  };

  const clickReplyModalOutside = ({ target }) => {
    if (
      editModal &&
      (!editReplyModalRef.current ||
        !editReplyModalRef.current.contains(target))
    )
      setEditModal(false);
  };

  useEffect(() => {
    window.addEventListener('click', clickReplyModalOutside);
    return () => {
      window.removeEventListener('click', clickReplyModalOutside);
    };
  });

  const editReply = () => {
    fetch('http://localhost:10000/comment/update', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: valueRef.current.value,
        commentId: replyData.id,
      }),
    })
      .then(res => res.json())
      .then(console.log('EDIT_POST_SUCCESS'))
      .catch(error => {
        console.log(error);
      });
    setReplyUpdate(true);
    setEditing(false);
    setEditBtn(false);
    valueRef.current.style.height = '20px';
  };

  const deleteReply = () => {
    fetch('http://localhost:10000/comment/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentId: replyData.id,
      }),
    })
      .then(res => res.json())
      .then(console.log('DELETE_REPLY_SUCCESS'))
      .catch(error => {
        console.log(error);
      });
    setPostUpdate(true);
    setReplyUpdate(true);
    setEditBtn(false);
    console.log(replyData);
  };

  return (
    <ReplyContainer>
      <img alt={writer} src={userProfileUrl} />
      <ReplyWrap>
        <ReplyButton>
          {myProfileData.id === replyData.userId && (
            <button onClick={handleReplyModal}>⋯</button>
          )}
          {editModal && (
            <ReplyButtonModal ref={editReplyModalRef}>
              <EditReply onClick={handleEditing}>
                <FontAwesomeIcon icon={faPen} />
                <span>변경</span>
              </EditReply>
              <DeleteReply onClick={deleteReply}>
                <FontAwesomeIcon icon={faTrashAlt} />
                <span>삭제</span>
              </DeleteReply>
            </ReplyButtonModal>
          )}
        </ReplyButton>
        <Writer>{name}</Writer>
        <WriterHeadline>{headline}</WriterHeadline>
        {editing ? (
          <EditingValue>
            <textarea
              id={id}
              defaultValue={content}
              onKeyDown={resizeEditingTextArea}
              ref={valueRef}
              onChange={activeEditSaveBtn}
            />
            {editBtn ? (
              <SaveBtnActived onClick={editReply}>
                <span>변경 사항 저장</span>
              </SaveBtnActived>
            ) : (
              <SaveBtnInactived>
                <span>변경 사항 저장</span>
              </SaveBtnInactived>
            )}
            <CancleBtn onClick={cancleEditReply}>
              <span>취소</span>
            </CancleBtn>
          </EditingValue>
        ) : (
          <ReplyValue>{content}</ReplyValue>
        )}
      </ReplyWrap>
      <ButtonWrap>
        <LikeBtn onClick={handleLike}>
          <span>추천</span>
        </LikeBtn>
        {replyLike && (
          <LikeIconWrap>
            <span>•</span>
            <img
              alt="likeIcon"
              src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
            />
          </LikeIconWrap>
        )}
        <ReplyBtn name={replyLike}>
          <span>답장</span>
        </ReplyBtn>
      </ButtonWrap>
    </ReplyContainer>
  );
}

const ReplyContainer = styled.div`
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
  border-radius: 5px;
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
    cursor: pointer;
  }
`;

const ReplyButtonModal = styled.div`
  position: absolute;
  top: 25px;
  right: 15px;
  height: 65px;
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

const EditReply = styled.span`
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
`;

const DeleteReply = styled.span`
  display: block;
  cursor: pointer;
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

const EditingValue = styled.div`
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
  cursor: pointer;
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
  cursor: not-allowed;
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
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: block;
  position: relative;
  margin-top: 10px;
  padding-bottom: 30px;
`;

const LikeBtn = styled.span`
  position: absolute;
  left: 75px;
  padding: 5px;
  height: 1.4rem;
  width: 40px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgcBeige};
  }
`;

const LikeIconWrap = styled.span`
  display: inline-block;
  position: absolute;
  left: 110px;
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
  position: absolute;
  left: ${props => (props.name ? '145px' : '120px')};
  padding: 5px;
  height: 1.5rem;
  width: 40px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.bgcBeige};
  }
`;

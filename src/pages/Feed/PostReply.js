import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PostReplyList from './PostReplyList';
import isKorean from './../../utils/LanguageUtil';

export default function PostReply({ myProfileData, numOfReplys }) {
  const { firstName, lastName, headline, userProfileUrl } = myProfileData;
  const replyInputRef = useRef();

  const [replyValue, setReplyValue] = useState('');
  const [replyId, setReplyId] = useState(1);
  const [replyList, setReplyList] = useState([]);

  const name = `${
    isKorean(firstName) ? `${lastName}${firstName}` : `${firstName} ${lastName}`
  }`;

  const handleReplyValue = e => {
    setReplyValue(e.target.value);
  };

  const pushReply = () => {
    setReplyId(replyId + 1);
    setReplyList([
      ...replyList,
      {
        id: replyId,
        writer: name,
        headline: headline,
        image: userProfileUrl,
        reply: replyValue,
      },
    ]);
    replyInputRef.current.value = '';
    replyInputRef.current.style.height = '44px';
    setReplyValue('');
  };

  const resizeReplyTextArea = () => {
    replyInputRef.current.style.height = '44px';
    replyInputRef.current.style.height =
      replyInputRef.current.scrollHeight + 'px';
  };

  const deleteReply = id => {
    const deletedReplyList = [...replyList].filter(el => id !== el.id);
    setReplyList(deletedReplyList);
  };

  useEffect(() => {
    numOfReplys(replyList.length);
  });

  const saveEditedReply = (id, editedReply) => {
    const editedReplyList = [...replyList].map(el => {
      if (el.id === id) {
        el.reply = editedReply;
        return el;
      } else {
        return el;
      }
    });
    setReplyList(editedReplyList);
  };

  const reverseReplyList = [...replyList].reverse();

  const replys = reverseReplyList.map(data => {
    return (
      <PostReplyList
        key={data.id}
        data={data}
        writer={name}
        deleteReply={deleteReply}
        saveEditedReply={saveEditedReply}
      />
    );
  });

  return (
    <article>
      <InputReply>
        <img alt="profileImage" src={userProfileUrl} />
        <textarea
          placeholder="댓글 남기기"
          onChange={handleReplyValue}
          onKeyDown={resizeReplyTextArea}
          ref={replyInputRef}
        />
        {replyValue ? <button onClick={pushReply}>올리기</button> : ''}
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
`;

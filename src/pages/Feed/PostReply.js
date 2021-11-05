import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PostReplyList from './PostReplyList';
import isKorean from './../../utils/LanguageUtil';

export default function PostReply({ myProfileData, postData, setPostUpdate }) {
  const { firstName, lastName, userProfileUrl } = myProfileData;
  const [replyValue, setReplyValue] = useState('');
  const [replyList, setReplyList] = useState([]);
  const [replyUpdate, setReplyUpdate] = useState(false);
  const replyInputRef = useRef();

  const name = `${
    isKorean(firstName) ? `${lastName}${firstName}` : `${firstName} ${lastName}`
  }`;

  const handleReplyValue = e => {
    setReplyValue(e.target.value);
  };

  const resizeReplyTextArea = () => {
    replyInputRef.current.style.height = '44px';
    replyInputRef.current.style.height =
      replyInputRef.current.scrollHeight + 'px';
  };

  const addReply = () => {
    fetch('http://localhost:10000/comment/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: replyInputRef.current.value,
        postId: postData.id,
        userId: myProfileData.id,
      }),
    })
      .then(res => res.json())
      .then(console.log('ADD_REPLY_SUCCESS'))
      .catch(error => {
        console.log(error);
      });
    setPostUpdate(true);
    setReplyUpdate(true);
    setReplyValue('');
    replyInputRef.current.value = '';
    replyInputRef.current.style.height = '44px';
  };

  useEffect(() => {
    fetch('http://localhost:10000/comment/')
      .then(res => res.json())
      .then(res => setReplyList(res))
      .then(console.log('GET_REPLY_SECCESS'))
      .catch(error => {
        console.log(error);
      });
    setReplyUpdate(false);
  }, [replyUpdate]);

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
        {replyValue ? <button onClick={() => addReply()}>올리기</button> : ''}
      </InputReply>
      <ReplyContainer>
        {replyList
          .filter(el => el.postId === postData.id)
          .map(data => {
            return (
              <PostReplyList
                key={data.id}
                replyData={data}
                writer={name}
                myProfileData={myProfileData}
                setPostUpdate={setPostUpdate}
                setReplyUpdate={setReplyUpdate}
              />
            );
          })}
      </ReplyContainer>
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
    cursor: pointer;
  }
`;

const ReplyContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  text-align: left;
`;

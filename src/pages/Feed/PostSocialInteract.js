import styled from 'styled-components';
import LikeBtnAndModal from './LikeBtnAndModal';

export default function PostSocialInteract({ handleReply, numOfReplys }) {
  return (
    <article>
      <Header>
        <span>댓글 {numOfReplys}</span>
      </Header>
      <Interact>
        <BtnWrap>
          <LikeBtnAndModal />
          <button onClick={handleReply}>
            <img alt="reply" src="/Images/ico_reply.svg" />
            <span>댓글</span>
          </button>
          <button>
            <img alt="share" src="/Images/ico_share.svg" />
            <span>공유</span>
          </button>
          <button>
            <img alt="send" src="/Images/ico_send.svg" />
            <span>보내기</span>
          </button>
        </BtnWrap>
      </Interact>
    </article>
  );
}

const Header = styled.div`
  margin: 0 20px;
  padding: 10px 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
  text-align: right;
`;

const Interact = styled.div`
  position: relative;
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;

  button {
    position: relative;
    height: 46px;
    width: 122px;
    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.white};
    text-align: center;

    &:hover {
      background-color: ${({ theme }) => theme.colors.borderGrey};
    }

    img {
      margin-right: 5px;
      vertical-align: middle;
    }
  }
`;

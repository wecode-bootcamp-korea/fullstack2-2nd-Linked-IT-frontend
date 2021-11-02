import styled from 'styled-components';
import LikeBtnAndModal from './LikeBtnAndModal';

export default function PostSocialInteract(props) {
  return (
    <article>
      <Header>
        <span>아이콘 수</span>
        <span>댓글 수</span>
      </Header>
      <Interact>
        <BtnWrap>
          <LikeBtnAndModal />
          <button onClick={props.handleReply}>
            <img alt="reply" src={require('./data/Images/reply.svg').default} />
            <span>댓글</span>
          </button>
          <button>
            <img alt="share" src={require('./data/Images/share.svg').default} />
            <span>공유</span>
          </button>
          <button>
            <img alt="send" src={require('./data/Images/send.svg').default} />
            <span>보내기</span>
          </button>
        </BtnWrap>
      </Interact>
    </article>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGrey};
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

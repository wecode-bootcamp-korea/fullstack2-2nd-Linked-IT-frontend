import styled from 'styled-components';
import uploadBtns from './data/UploadBtns';

export default function WritePost({ myProfileData, setIsModalOpen }) {
  const { userProfileUrl } = myProfileData;

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <WritePostContainer>
      <WritePostBtn onClick={openModal}>
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
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.borderGrey};
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
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.colors.borderGrey};
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

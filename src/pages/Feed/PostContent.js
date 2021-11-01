import { useState } from 'react';
import styled from 'styled-components';

export default function PostContent({ postData }) {
  const { createdAt, text, image } = postData;

  const [isShowMoreClicked, setIsShowMoreClicked] = useState('');

  const contentShow = () => {
    setIsShowMoreClicked('show');
  };

  return (
    <div>
      <CreatedAt>
        <span>{createdAt}</span>
      </CreatedAt>
      <TextWrap>
        <Text name={isShowMoreClicked}>{text}</Text>
        {text.length > 220 && (
          <MoreBtn name={isShowMoreClicked} onClick={contentShow}>
            ...더보기
          </MoreBtn>
        )}
      </TextWrap>
      {image && (
        <Image>
          <img alt="contentImg" src={image} />
        </Image>
      )}
    </div>
  );
}

const CreatedAt = styled.div`
  position: absolute;
  left: 105px;
  top: 70px;
  color: ${({ theme }) => theme.colors.fontGrey};
`;

const TextWrap = styled.div`
  position: relative;
  height: auto;
`;

const Text = styled.div`
  display: -webkit-box;
  margin: 15px;
  max-height: ${props => (props.name !== 'show' ? '4.5rem' : 'none')};
  line-height: 1.5rem;
  text-align: left;
  overflow: ${props => (props.name !== 'show' ? 'hidden' : 'auto')};
  white-space: pre-wrap;
  --webkit-line-clamp: ${props => props.name !== 'show' && 'unset'};
`;

const MoreBtn = styled.button`
  display: ${props => (props.name !== 'show' ? '' : 'none')};
  position: absolute;
  right: 10px;
  bottom: 1px;
  padding-left: 20px;
  max-height: 1.5rem;
  line-height: 1.5rem;
  border: none;
  background: ${({ theme }) => theme.colors.white};
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 18%
  );
  color: ${({ theme }) => theme.colors.fontGrey};

  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.div`
  img {
    width: 100%;
  }
`;

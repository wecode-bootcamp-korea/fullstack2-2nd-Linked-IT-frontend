import React, { useState } from 'react';
import styled from 'styled-components';

export default function PostContent(props) {
  const { ...postData } = props.postData;
  const { createdAt, text, image } = postData.contentData;

  const [isShowMoreClicked, setIsShowMoreClicked] = useState(false);

  const contentShow = () => {
    setIsShowMoreClicked(true);
  };

  return (
    <div>
      <CreatedAt>
        <span>{createdAt}</span>
      </CreatedAt>
      <TextWrap>
        <span className={isShowMoreClicked ? 'show' : 'hide'}>{text}</span>
        <button
          className={isShowMoreClicked ? 'show' : 'hide'}
          onClick={contentShow}
        >
          ...더보기
        </button>
      </TextWrap>
      <Image>
        <img alt="contentImg" src={image} />
      </Image>
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

  span {
    display: -webkit-box;
    margin: 15px;
    max-height: 4.5rem;
    line-height: 1.5rem;
    text-align: left;
    overflow: hidden;
    white-space: pre-wrap;

    &.show {
      max-height: none;
      overflow: auto;
      --webkit-line-clamp: unset;
    }
  }

  button {
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

    &.show {
      display: none;
    }
  }
`;

const Image = styled.div`
  img {
    width: 100%;
  }
`;

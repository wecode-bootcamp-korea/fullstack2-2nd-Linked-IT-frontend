import { useState } from 'react';
import styled from 'styled-components';
import icons from './data/Images/socialIcons';

export default function LikeBtnAndModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [thumbIcon, setThumbIcon] = useState(false);

  const iconList = icons.map(data => {
    return (
      <Icons
        key={data.id}
        alt={data.alt}
        src={data.src}
        onClick={() => {
          selectIcon(data.src);
        }}
      />
    );
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const selectIcon = e => {
    thumbIcon === e ? setThumbIcon(false) : setThumbIcon(e);
  };

  const handleLike = () => {
    thumbIcon ? setThumbIcon(false) : setThumbIcon(icons[0].src);
  };

  return (
    <>
      <Button
        onMouseEnter={showModal}
        onMouseLeave={hideModal}
        onClick={handleLike}
      >
        <LikeIcon
          alt="thumbDefault"
          src={thumbIcon ? thumbIcon : '/Images/ico_thumb.svg'}
        />
        <span>추천</span>
      </Button>
      {isModalOpen && (
        <IconsWrap onMouseEnter={showModal} onMouseLeave={hideModal}>
          {iconList}
        </IconsWrap>
      )}
    </>
  );
}

const Button = styled.button`
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
`;

const IconsWrap = styled.div`
  position: absolute;
  top: -38px;
  left: -30px;
  height: 46px;
  width: 300px;
  border: 1px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: 25px;
  box-shadow: 0px 2px 10px 2px #808080;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 10;
`;

const Icons = styled.img`
  padding: 3px 7px 0;
  width: 42px;

  &:hover {
    transform: translateY(-7px) scale(1.5);
    transition-duration: 0.5s;
  }
`;

const LikeIcon = styled.img`
  margin-right: 5px;
  vertical-align: middle;
`;

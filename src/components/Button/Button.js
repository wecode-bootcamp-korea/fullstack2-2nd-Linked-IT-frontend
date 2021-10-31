import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCheck,
  faSortDown,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

/*
 * props 중 bgc와 color는 Button 컴포넌트를 사용하는 부모 컴포넌트에서 theme을 import하시면 됩니다.
 * ex) bgc={theme.colors.primary} color={theme.colors.white}
 * theme은 이미 index.js에서 import 되었지만, 컴포넌트 안에서 theme을 사용하기 위해 다시 import했습니다.
 */

export default function Button({
  bgc, //background-color, 값 안주면 'transparent'
  color, // 값 안주면 theme.colors.btnGrey
  onClick,
  text,
  type, // (optional) 팔로우 버튼 & dropdown 버튼만 해당됨
  numOfFilters, // (optional) dropdown 버튼에 적용된 필터 갯수 보여줄 떄
  isFollowing, // (optional) 팔로우 버튼의 팔로우 상태
  // width, //나중에 추가예정
  // height, //나중에 추가예정
  // fontSize, //나중에 추가예정
}) {
  return (
    <StyledButton bgc={bgc} color={color} onClick={onClick}>
      {type === 'follow' && (
        <FontAwesomeIcon
          icon={isFollowing ? faCheck : faPlus}
          className="leftIcon"
          size="sm"
        />
      )}
      {text}
      {numOfFilters > 0 && <Circle>{numOfFilters}</Circle>}
      {type === 'dropdown' && (
        <FontAwesomeIcon icon={faSortDown} className="rightIcon" />
      )}
      {type === 'apply' && (
        <FontAwesomeIcon
          icon={faExternalLinkAlt}
          className="rightIcon"
          size="sm"
        />
      )}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  padding: 5px 10px;
  border: 1px solid
    ${({ bgc, color }) => {
      return bgc || color;
    }};
  border-radius: 15px;
  background-color: ${({ bgc }) => bgc || 'transparent'};
  color: ${({ color, theme }) => color || theme.colors.btnGrey};
  font-size: 16px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border: 1px solid
      ${({ theme, bgc, color }) => {
        const { primary, btnNavy } = theme.colors;
        if (bgc === primary) return btnNavy;
        return bgc || color;
      }};
    background-color: ${({ theme, color, bgc }) => {
      const { primary, btnLightBlue, btnNavy, btnGreen, btnLightGrey } =
        theme.colors;
      if (bgc === primary) return btnNavy;
      if (bgc === btnGreen) return;
      return color ? btnLightBlue : btnLightGrey;
    }};
  }

  &:active {
    border: 1px solid
      ${({ theme, bgc, color }) => {
        const { primary, btnNavy, btnGreen, btnDarkGreen, black } =
          theme.colors;
        if (bgc === btnGreen) return btnDarkGreen;
        if (color === primary) return btnNavy;
        return black;
      }};
    background-color: ${({ theme, bgc }) => {
      const { primary, btnGreen, btnDarkGreen, black } = theme.colors;
      if (bgc === primary) return black;
      if (bgc === btnGreen) return btnDarkGreen;
    }};
    color: ${({ theme, color }) => {
      const { primary, btnNavy, black } = theme.colors;
      if (color === primary) return btnNavy;
      if (!color) return black;
    }};
  }

  .leftIcon {
    margin-right: 5px;
  }

  .rightIcon {
    margin-left: 5px;
  }
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  padding: 2px 6px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.fontGrey};
  font-size: 12px;
`;

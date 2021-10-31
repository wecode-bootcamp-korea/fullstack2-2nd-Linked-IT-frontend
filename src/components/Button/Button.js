import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faCheck,
  faSortDown,
  faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function Button({
  bgc, //background-color, 값 안주면 'transparent'
  color, // 값 안주면 theme.colors.btnGrey
  onClick,
  text,
  width, // (optional)
  height, // (optional)
  margin, // (optional) (ex. '0 5px 0 0')
  fontSize, // (optional)
  type, // (optional) add, dropdown & apply 버튼만 해당됨
  numOfFilters, // (optional) dropdown 버튼에 적용된 필터 갯수 보여줄 떄
  isFollowing, // (optional) 팔로우 버튼의 팔로우 상태 - Boolean
}) {
  return (
    <StyledButton
      bgc={bgc}
      color={color}
      width={width}
      height={height}
      margin={margin}
      fontSize={fontSize}
      onClick={onClick}
    >
      {type === 'add' && (
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
  height: ${({ height }) => height || '31px'};
  width: ${({ width }) => width || null};
  margin: ${({ margin }) => margin || '0'};
  padding: 5px 10px;
  border: 1px solid
    ${({ bgc, color }) => {
      return bgc || color;
    }};
  border-radius: 15px;
  background-color: ${({ bgc }) => bgc || 'transparent'};
  color: ${({ color, theme }) => color || theme.colors.btnGrey};
  font-size: ${({ fontSize }) => fontSize || '16px'};
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

// const FaIconLeft = styled(FontAwesomeIcon).attrs(({ icon, size }) => ({
//   icon: icon,
//   size: size,
// }))``;

// const StyledButton = styled(Button).attrs(({ theme, text }) => ({
//   bgc: text === 'Cancel' ? null : theme.colors.primary,
//   color: text === 'Cancel' ? null : theme.colors.white,
// }))``;

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

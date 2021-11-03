import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faShareSquare } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

import { mores } from '../../data/dropDownData';

export default function MoresDropDown(props) {
  const { showMoresDropDown } = props;

  return (
    <StyledDropDown showMoresDropDown={showMoresDropDown}>
      {mores.map((list, i) => {
        return (
          <li>
            <span>{list}</span>
            <FontAwesomeIcon icon={i === 0 ? faShareSquare : faFilePdf} />
          </li>
        );
      })}
    </StyledDropDown>
  );
}

const StyledDropDown = styled.ul`
  position: absolute;
  top: 60px;
  left: 185px;
  width: 200px;
  background-color: whitesmoke;
  box-shadow: 1px 2px 2px;
  border: 1px solid lightgray;
  border-radius: 5px;
  z-index: 1000;

  transform: ${({ showMoresDropDown }) =>
    showMoresDropDown ? 'translateY(-20px)' : 'none'};
  opacity: ${({ showMoresDropDown }) => (showMoresDropDown ? 1 : 0)};
  transition: all 0.5s ease;

  li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid lightgray;
    cursor: pointer;

    div {
      margin-bottom: 3px;
      font-size: 15px;
    }

    span {
      font-size: 13px;
    }

    svg {
      color: gray;
    }

    &:hover {
      background-color: lightgray;
    }

    &:last-child {
      border: none;
    }
  }
`;

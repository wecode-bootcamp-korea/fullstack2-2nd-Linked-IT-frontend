import styled from 'styled-components';

import { sections } from '../data/dropDownData';

export default function SectionsDropDown(props) {
  const { showSectionsDropDown } = props;

  return (
    <StyledDropDown showSectionsDropDown={showSectionsDropDown}>
      {sections.map(list => {
        return (
          <li>
            <div>{`${list.title}`}</div>
            <span>{`${list.desc}`}</span>
          </li>
        );
      })}
    </StyledDropDown>
  );
}

const StyledDropDown = styled.ul`
  position: absolute;
  top: 60px;
  left: 95px;
  width: 200px;
  background-color: whitesmoke;
  box-shadow: 1px 2px 2px;
  border: 1px solid lightgray;
  border-radius: 5px;
  z-index: 1000;

  transform: ${({ showSectionsDropDown }) =>
    showSectionsDropDown ? 'translateY(-20px)' : 'none'};
  opacity: ${({ showSectionsDropDown }) => (showSectionsDropDown ? 1 : 0)};
  transition: all 0.5s ease;

  li {
    padding: 10px;
    border-bottom: 1px solid lightgray;
    cursor: pointer;

    div {
      margin-bottom: 3px;
      font-size: 15px;
    }

    span {
      color: gray;
      font-size: 13px;
    }

    &:hover {
      background-color: lightgray;
    }

    &:last-child {
      border: none;
    }
  }
`;

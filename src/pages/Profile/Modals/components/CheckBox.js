import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';

export default function CheckBox(props) {
  const { id, name, state, text, onClick } = props;

  return (
    <StyledCheckBox state={state}>
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={state}
        onClick={onClick}
      />
      <label htmlFor={id}>
        <FontAwesomeIcon icon={state ? faCheckSquare : faSquare} />
        <span>{text}</span>
      </label>
    </StyledCheckBox>
  );
}

const StyledCheckBox = styled.div`
  input {
    display: none;
  }

  label {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: grey;
    font-size: 15px;
    cursor: pointer;

    span {
      margin-left: 10px;
    }
  }

  svg {
    font-size: 20px;
    color: ${({ theme, state }) => (state ? theme.colors.btnGreen : 'grey')};
  }
`;

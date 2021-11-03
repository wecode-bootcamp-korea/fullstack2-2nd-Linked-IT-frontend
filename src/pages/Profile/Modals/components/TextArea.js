import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { addComma } from '../../../../utils/NumberUtil';

export default function TextArea(props) {
  const [numberOfLetters, setNumberOfLetters] = useState(0);

  useEffect(() => {
    if (defaultValue) setNumberOfLetters(defaultValue.length);
  }, []);

  const getNumberOfLetters = e => {
    setNumberOfLetters(+e.target.value.length);
  };

  const { title, name, rows, textLimit, warningText, defaultValue } = props;

  return (
    <StyledTextarea>
      <div>{title}</div>
      <MyTextArea
        numberOfLetters={numberOfLetters}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        textLimit={textLimit}
        onChange={getNumberOfLetters}
      />
      <LetterCount
        numberOfLetters={numberOfLetters}
        textLimit={textLimit}
      >{`${addComma(numberOfLetters)}/${textLimit}`}</LetterCount>
      {numberOfLetters > textLimit && (
        <OverFlowAlarm>
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span>{warningText}</span>
        </OverFlowAlarm>
      )}
    </StyledTextarea>
  );
}
const StyledTextarea = styled.div`
  div {
    color: grey;
    font-size: 15px;
  }
`;

const MyTextArea = styled.textarea`
  margin-top: 5px;
  width: 600px;
  border: ${({ numberOfLetters, textLimit }) =>
      numberOfLetters > textLimit ? '2px' : '1px'}
    solid
    ${({ theme, numberOfLetters, textLimit }) =>
      numberOfLetters > textLimit ? theme.colors.alarmRed : 'grey'};
  border-radius: 5px;

  &:hover {
    border: 2px solid
      ${({ theme, numberOfLetters, textLimit }) =>
        numberOfLetters > textLimit ? theme.colors.alarmRed : 'grey'};
  }

  &:focus {
    border: 2px solid
      ${({ theme, numberOfLetters, textLimit }) =>
        numberOfLetters > textLimit ? theme.colors.alarmRed : 'grey'};
    outline: none;
  }
`;

const LetterCount = styled.div`
  color: ${({ theme, numberOfLetters, textLimit }) =>
    numberOfLetters > textLimit ? theme.colors.alarmRed : 'grey'};
  font-size: 15px;
  text-align: end;
`;

const OverFlowAlarm = styled.div`
  svg {
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.alarmRed};
  }

  span {
    color: ${({ theme }) => theme.colors.alarmRed};
  }
`;

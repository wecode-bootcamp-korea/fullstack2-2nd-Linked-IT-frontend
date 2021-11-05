import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { addComma } from '../../../../utils/NumberUtil';

export default function TextInput(props) {
  const [numberOfLetters, setNumberOfLetters] = useState(0);
  const [isNull, setIsNull] = useState(false);

  const getNumberOfLetters = e => {
    setNumberOfLetters(+e.target.value.length);
  };

  const checkIsNull = e => {
    return e.target.value ? setIsNull(false) : setIsNull(true);
  };

  const inputValue = e => {
    setState[num](e.target.value);
  };

  const {
    setState,
    num,
    title,
    name,
    defaultValue,
    textLimit,
    warningText,
    isNullable,
  } = props;

  return (
    <StyledTextInput numberOfLetters={numberOfLetters} textLimit={textLimit}>
      <div>{title}</div>
      <input
        name={name}
        type="text"
        defaultValue={defaultValue}
        onKeyUp={getNumberOfLetters}
        onBlur={isNullable ? null : checkIsNull}
        onChange={inputValue}
      />
      {numberOfLetters > textLimit && (
        <div>
          <LetterCount
            numberOfLetters={numberOfLetters}
            textLimit={textLimit}
          >{`${addComma(numberOfLetters)}/${addComma(textLimit)}`}</LetterCount>
          <Alarm>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <span>{warningText}</span>
          </Alarm>
        </div>
      )}
      {isNull && (
        <Alarm>
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span>{`${title}은 필수항목 입니다.`}</span>
        </Alarm>
      )}
    </StyledTextInput>
  );
}

const StyledTextInput = styled.div`
  div {
    color: grey;
    font-size: 15px;
  }

  input {
    margin-top: 5px;
    width: 600px;
    height: 30px;
    border: ${({ numberOfLetters, textLimit }) =>
        numberOfLetters > textLimit ? '2px' : '1px'}
      solid
      ${({ theme, numberOfLetters, textLimit }) =>
        numberOfLetters > textLimit
          ? theme.colors.alarmRed
          : theme.colors.btnGrey};
    border-radius: 5px;

    &:hover {
      border: 2px solid
        ${({ theme, numberOfLetters, textLimit }) =>
          numberOfLetters > textLimit
            ? theme.colors.alarmRed
            : theme.colors.btnGrey};
    }

    &:focus {
      border: 2px solid
        ${({ theme, numberOfLetters, textLimit }) =>
          numberOfLetters > textLimit
            ? theme.colors.alarmRed
            : theme.colors.btnGrey};
      outline: none;
    }
  }
`;

const LetterCount = styled.div`
  margin-top: 3px;
  color: ${({ theme }) => theme.colors.alarmRed};
  font-size: 15px;
  text-align: end;
`;

const Alarm = styled.div`
  margin-top: 5px;

  svg {
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.alarmRed};
  }

  span {
    color: ${({ theme }) => theme.colors.alarmRed};
  }
`;

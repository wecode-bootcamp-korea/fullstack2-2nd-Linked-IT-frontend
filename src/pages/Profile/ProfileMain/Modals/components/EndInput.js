import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function EndInput(props) {
  const [isMonthNull, setIsMonthNull] = useState(false);
  const [isYearNull, setIsYearNull] = useState(false);

  const checkIsNulls = e => {
    if (e.target.value === '월') setIsMonthNull(true);
    else setIsMonthNull(false);
    if (e.target.value === '연도') setIsYearNull(true);
    else setIsYearNull(false);
  };

  const THISYEAR = new Date().getFullYear();
  const SERVICEYEAR = new Date().getFullYear() - 1920;

  const { title, defaultValue, state } = props;
  const SELECTEDMONTH = defaultValue && defaultValue.slice(6);
  const SELECTEDYEAR = defaultValue && defaultValue.slice(0, 5);

  return (
    <StyledStartInput>
      <div className="end">{title}</div>
      <SelectDate>
        <select
          name="endMonth"
          defaultValue={SELECTEDMONTH}
          disabled={state}
          onBlur={checkIsNulls}
        >
          <option defaultValue>월</option>
          {[...Array(12)].map((x, i) => {
            return <option key={i}>{i + 1 + '월'}</option>;
          })}
        </select>
        <select
          name="endYear"
          defaultValue={SELECTEDYEAR}
          disabled={state}
          onBlur={checkIsNulls}
        >
          <option defaultValue>연도</option>
          {[...Array(SERVICEYEAR)].map((x, i) => {
            return <option key={i}>{THISYEAR - i + '년'}</option>;
          })}
        </select>
      </SelectDate>
      {!state &&
        (isMonthNull || isYearNull) && ( // 식이상한듯?
          <Alarm>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <span>{title}은 필수입니다.</span>
          </Alarm>
        )}
    </StyledStartInput>
  );
}

const StyledStartInput = styled.div`
  div {
    margin-bottom: 5px;
    color: gray;
    font-size: 13px;
  }
`;

const SelectDate = styled.div`
  select {
    width: 290px;
    height: 30px;
    margin-right: 10px;
    padding-left: 5px;
    border-radius: 5px;
  }
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

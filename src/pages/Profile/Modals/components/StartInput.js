import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function StartInput(props) {
  const [isMonthNull, setIsMonthNull] = useState(false);
  const [isYearNull, setIsYearNull] = useState(false);

  const checkIsNulls = e => {
    if (e.target.value === '월') setIsMonthNull(true);
    else setIsMonthNull(false);
    if (e.target.value === '연도') setIsYearNull(true);
    else setIsYearNull(false);
  };

  const inputValue = e => {
    if (e.target.value.includes('월')) setState[num](parseInt(e.target.value));
    else setState[num + 1](parseInt(e.target.value));
  };

  const THISYEAR = new Date().getFullYear();
  const SERVICEYEAR = new Date().getFullYear() - 1920;

  const { title, defaultValue, setState, num } = props;
  const SELECTEDMONTH = defaultValue && defaultValue[0] + '월';
  const SELECTEDYEAR = defaultValue && defaultValue[1] + '년';

  return (
    <StyledStartInput>
      <div className="start">{title}</div>
      <SelectDate>
        <select
          name="startMonth"
          defaultValue={SELECTEDMONTH}
          onBlur={checkIsNulls}
          onChange={inputValue}
        >
          <option>월</option>
          {[...Array(12)].map((x, i) => {
            return <option key={i}>{i + 1 + '월'}</option>;
          })}
        </select>
        <select
          name="startYear"
          defaultValue={SELECTEDYEAR}
          onBlur={checkIsNulls}
          onChange={inputValue}
        >
          <option>연도</option>
          {[...Array(SERVICEYEAR)].map((x, i) => {
            return <option key={i}>{THISYEAR - i + '년'}</option>;
          })}
        </select>
      </SelectDate>
      {(isMonthNull || isYearNull) && (
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

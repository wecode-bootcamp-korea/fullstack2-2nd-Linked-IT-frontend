import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function SectionInput(props) {
  const [isNull, setIsNull] = useState(false);

  const checkIsNull = e => {
    if (e.target.value === placeHolder) setIsNull(true);
    else setIsNull(false);
  };

  const inputValue = e => {
    console.log(e.target.value);
    setState[num](e.target.value);
    // setState[num](parseInt(e.target.value));
  };

  const { title, name, defaultValue, placeHolder, setState, num } = props;

  return (
    <StyledSection>
      <div>{title}</div>
      <select
        name={name}
        defaultValue={defaultValue}
        onBlur={checkIsNull}
        onChange={inputValue}
      >
        <option defaultValue>{placeHolder}</option>
        <option id="one">정규직</option>
        {/* <option id="one">1 Full-time</option> */}
        {/* <label htmlFor="one">정규직</label> */}
        <option id="two">계약직</option>
        {/* <option id="two">2 Part-time</option> */}
        {/* <label htmlFor="two">정규직</label> */}
        <option id="three">인턴</option>
        {/* <option id="three">3 Contract</option> */}
        {/* <label htmlFor="three">정규직</label> */}
        <option id="four">자원봉사</option>
        {/* <option id="four">4 Temporary</option> */}
        {/* <label htmlFor="four">정규직</label> */}
        <option id="five">아르바이트</option>
        {/* <option id="five">5 Volunteer</option> */}
        {/* <label htmlFor="five">정규직</label> */}
      </select>
      {isNull && (
        <Alarm>
          <FontAwesomeIcon icon={faExclamationCircle} />
          <span>{`${title}은 필수항목 입니다.`}</span>
        </Alarm>
      )}
    </StyledSection>
  );
}

const StyledSection = styled.div`
  div {
    margin-bottom: 5px;
    color: grey;
    font-size: 15px;
  }

  select {
    width: 600px;
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

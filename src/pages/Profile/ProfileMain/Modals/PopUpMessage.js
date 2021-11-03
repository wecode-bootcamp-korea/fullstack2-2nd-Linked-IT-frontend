import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function PopUpMessage(props) {
  const { text } = props;

  return (
    <StyledPopUpMessage>
      <FontAwesomeIcon icon={faCheckCircle} />
      <span>{text}</span>
    </StyledPopUpMessage>
  );
}

const StyledPopUpMessage = styled.div`
  display: flex;
  flex-direction: row;

  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 500px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  background-color: white;
  z-index: 30000;

  transform: ${({ popUpSaved }) => (popUpSaved ? 'translateY(-20px)' : 'none')};
  opacity: ${({ popUpSaved }) => (popUpSaved ? 1 : 0)};
  transition: all 0.5s ease;

  svg {
    color: ${({ theme }) => theme.colors.btnGreen};
  }
  span {
    color: gray;
    font-size: 15px;
  }
`;

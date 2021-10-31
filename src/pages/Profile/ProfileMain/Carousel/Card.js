import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function Card(props) {
  const [cardHidden, setCardHidden] = useState(false);
  const { card, cardWidth, cardMargin, deleteCard } = props;

  const handleDelete = id => {
    setCardHidden(true);
    setTimeout(() => {
      deleteCard(card.id);
    }, 600);
  };

  return (
    <StyledCard cardWidth={cardWidth} cardMargin={cardMargin}>
      <div className={cardHidden ? 'hidden' : 'notHidden'}>
        <p>
          <span className="title">{card.title}</span>
          <span className="desc">{card.desc}</span>
        </p>
        <FontAwesomeIcon
          className="cancelBtn"
          icon={faTimes}
          onClick={() => {
            handleDelete(card.id);
          }}
        />
        <span className="startBtn">시작</span>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  .notHidden {
    position: relative;
    margin: ${({ cardMargin }) => cardMargin + 'px'};
    padding: 15px;
    border: 1px solid lightgray;
    border-radius: 15px;
    background-color: white;
    transition: all 0.5s ease;
  }

  .hidden {
    position: relative;
    margin: ${({ cardMargin }) => cardMargin + 'px'};
    padding: 15px;
    border: 1px solid lightgray;
    border-radius: 15px;
    background-color: white;
    transform: translateY(-20px);
    opacity: 0;
    transition: all 1s ease;
  }

  p {
    width: ${({ cardWidth, cardMargin }) =>
      cardWidth - cardMargin * 2 - 2 + 'px'};
  }

  span {
    display: block;
    margin-bottom: 5px;
  }

  .title {
    font-weight: 800;
  }

  .desc {
    margin-bottom: 5px;
  }

  .cancelBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    color: gray;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: black;
    }
  }

  .startBtn {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

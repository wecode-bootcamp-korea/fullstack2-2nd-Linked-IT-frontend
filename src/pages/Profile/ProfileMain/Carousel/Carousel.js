import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import styled from 'styled-components';

export default function Carousel(props) {
  const [currentIdx, setCurrentIdx] = useState(1);
  const [cards, setCards] = useState([]);
  const [compShow, setCompShow] = useState(true);

  const { cards: cardData, cardWidth, cardMargin, wrapperWidth } = props;
  const cardLen = cards.length;
  const translateDistance =
    (((cardWidth + cardMargin * 2 + 10) * cardLen - wrapperWidth) /
      (cardLen - 1)) *
    (currentIdx - 1);

  useEffect(() => {
    setCards(cardData);
  }, []);

  const slideToLeft = () => {
    if (currentIdx === 1) return;
    setCurrentIdx(currentIdx - 1);
  };

  const slideToRight = () => {
    if (currentIdx === cardLen) return;
    setCurrentIdx(currentIdx + 1);
  };

  const deleteCard = id => {
    const newCards = [...cards].filter(card => card.id !== id);
    if (currentIdx !== 1) setCurrentIdx(currentIdx - 1);
    setCards(newCards);
    if (newCards.length === 0) setCompShow(false);
  };

  return (
    <StyledGuideCarousel
      wrapperWidth={wrapperWidth}
      translateDistance={translateDistance}
    >
      {compShow && (
        <div className="btnNorm">
          <div className="containerWrapper">
            <div className="container">
              {cards.map(card => {
                return (
                  <Card
                    key={card.id}
                    card={card}
                    cardWidth={cardWidth}
                    cardMargin={cardMargin}
                    deleteCard={deleteCard}
                  />
                );
              })}
            </div>
          </div>
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            className="leftBtn"
            style={{ display: currentIdx === 1 ? 'none' : '' }}
            onClick={slideToLeft}
          />
          <FontAwesomeIcon
            icon={faChevronCircleRight}
            className="rightBtn"
            style={{ display: currentIdx === cards.length ? 'none' : '' }}
            onClick={slideToRight}
          />
        </div>
      )}
    </StyledGuideCarousel>
  );
}

const StyledGuideCarousel = styled.section`
  background-color: white;

  .btnNorm {
    position: relative;
    width: ${({ wrapperWidth }) => wrapperWidth + 'px'};
    margin: 0 auto;

    .containerWrapper {
      position: relative;
      width: ${({ wrapperWidth }) => wrapperWidth + 'px'};
      margin: 0 auto;
      overflow: hidden;

      .container {
        display: flex;
        flex-direction: row;
        width: ${({ wrapperWidth }) => wrapperWidth + 'px'};
        transform: ${({ translateDistance }) =>
          `translateX(-${translateDistance}px)`};
        transition: all 0.5s ease;
      }
    }

    .leftBtn {
      position: absolute;
      top: 40%;
      left: -22px;
      width: 32px;
      height: 32px;
      font-size: 50px;
      color: grey;
      cursor: pointer;

      &:hover {
        color: black;
      }
      &:active {
        opacity: 0.5;
      }
    }

    .rightBtn {
      position: absolute;
      top: 40%;
      right: -22px;
      width: 32px;
      height: 32px;
      font-size: 50px;
      color: grey;
      cursor: pointer;

      &:hover {
        color: black;
      }
      &:active {
        opacity: 0.5;
      }
    }
  }
`;

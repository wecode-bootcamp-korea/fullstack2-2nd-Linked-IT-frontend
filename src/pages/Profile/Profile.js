import Carousel from './Carousel/Carousel';

import cards from './Carousel/CardMockData';

function Profile() {
  return (
    <div>
      <Carousel
        cards={cards}
        cardWidth={350}
        cardMargin={10}
        wrapperWidth={700}
      />
    </div>
  );
}

export default Profile;

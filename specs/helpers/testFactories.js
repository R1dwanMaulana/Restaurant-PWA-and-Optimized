import LikeButtonInitiator from '../../src/scripts/utils/like-button-initiator';
import RestoDevDB from '../../src/scripts/data/restoFavorite';

const createSaveButtonInitiatorWithResto = async (resto) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    resto,
    FavoriteResto: RestoDevDB,
  });
};

export default createSaveButtonInitiatorWithResto;

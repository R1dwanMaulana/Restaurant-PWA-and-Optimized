/* eslint-disable no-undef */
import RestoDevDB from '../src/scripts/data/restoFavorite';
import createLikeButtonInitiatorWithResto from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the save button when the restaurant has not been added to favorite list before', async () => {
    await createLikeButtonInitiatorWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });

  it('should not show the delete button when the restaurant has not been saved before', async () => {
    await createLikeButtonInitiatorWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });

  it('should be able to save the restaurant', async () => {
    await createLikeButtonInitiatorWithResto({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const resto = await RestoDevDB.getResto(1);

    expect(resto).toEqual({ id: 1 });

    RestoDevDB.deleteResto(1);
  });

  it('should not add a restaurant again when its already saved', async () => {
    await createLikeButtonInitiatorWithResto({ id: 1 });

    // Tambahkan film dengan ID 1 ke daftar film yang disukai
    await RestoDevDB.putResto({ id: 1 });
    // Simulasikan pengguna menekan tombol suka film
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    // tidak ada film yang ganda
    expect(await RestoDevDB.getAllResto()).toEqual([{ id: 1 }]);

    RestoDevDB.deleteResto(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await createLikeButtonInitiatorWithResto({});

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // eslint-disable-next-line no-undef
    expect(await RestoDevDB.getAllResto()).toEqual([]);
  });
});

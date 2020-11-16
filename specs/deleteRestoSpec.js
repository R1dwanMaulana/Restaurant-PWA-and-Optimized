/* eslint-disable no-undef */
import RestoDevDB from '../src/scripts/data/restoFavorite';
import createLikeButtonInitiatorWithResto from './helpers/testFactories';

const addLikeButtonContainer = () => {
  document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Deleting A Restaurant', () => {
  beforeEach(async () => {
    addLikeButtonContainer();
    await RestoDevDB.putResto({ id: 1 });
  });

  afterEach(async () => {
    await RestoDevDB.deleteResto(1);
  });

  it('should display delete button when the restaurant has been saved', async () => {
    await createLikeButtonInitiatorWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="unlike this restaurant"]')).toBeTruthy();
  });

  it('should not display save button when the restaurant has been saved', async () => {
    await createLikeButtonInitiatorWithResto({ id: 1 });

    expect(document.querySelector('[aria-label="save this resto"]')).toBeFalsy();
  });

  it('should be able to delete restaurnt from the favorite list', async () => {
    await createLikeButtonInitiatorWithResto({ id: 1 });

    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await RestoDevDB.getAllResto()).toEqual([]);
  });

  it('should not throw error if the deleted restauramt is not in the favorite list', async () => {
    await createLikeButtonInitiatorWithResto({ id: 1 });

    // hapus dulu film dari daftar film yang disukai
    await RestoDevDB.deleteResto(1);

    // kemudian, simulasikan pengguna menekan widget batal menyukai film
    document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

    expect(await RestoDevDB.getAllResto()).toEqual([]);
  });
});

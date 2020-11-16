/* eslint-disable no-undef */
const assert = require('assert');

Feature('Favorite Restaurant');
const defaultFavText = 'disini anda dapat memilih restoran yang telah di recommended dari kami | tidak ada restoran yang tersimpan';
const actionButton = '#likeButton';

Scenario('Menambahkan makanan ke menu favorit', async (I) => {
  I.amOnPage('/');

  const firstRestaurantDetailPageButton = locate('.card-btn a').first();
  const firstRestaurantCard = locate('.card-header p').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurantCard);

  // pergi ke page detail restaurant
  I.click(firstRestaurantDetailPageButton);

  I.seeElement('.fa-heart');

  // menambahkan restaurant ke dalam daftar favorite
  I.click(actionButton);

  // pergi ke page favorite
  I.amOnPage('/#/fav');

  // mengecek apakah sudah masuk ke daftar favorite
  I.seeElement('.card-fav');

  // apakah benar reataurant ini sama dengan yang disimpan tadi
  const firstFavoriteRestaurantName = await I.grabTextFrom('.card-header2 p');
  assert.strictEqual(firstRestaurantName, firstFavoriteRestaurantName);
});

Scenario('Menghapus daftar menu favorit', async (I) => {
  I.amOnPage('/');
  const firstFavoriteRestaurantDetail = locate('.card-btn a').first();
  const firstRestaurantCard = locate('.card-header p').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurantCard);

  // pergi ke page detail
  I.click(firstFavoriteRestaurantDetail);

  I.seeElement('#likeButton');
  I.seeElement('.fa-heart');

  // menambahkan restaurant ke dalam favorite
  I.click(actionButton);

  // pergi ke page favorite
  I.amOnPage('/#/fav');

  // apakah restaurant sudah masuk ke dalam daftar favorite?
  I.seeElement('.card-fav');
  const firstFavoriteRestaurantName = await I.grabTextFrom('.card-header2 p');

  // apakah benar reataurant ini sama dengan yang disimpan tadi
  assert.strictEqual(firstRestaurantName, firstFavoriteRestaurantName);

  const firstFavoriteRestaurantDetailPageButton = locate('.card-btn a').first();

  // pergi ke detail restautant yang sudah masuk list favorite
  I.click(firstFavoriteRestaurantDetailPageButton);

  I.seeElement(actionButton);
  I.seeElement('.fa-heart');

  // menghapus restaurant dari list favorite
  I.click(actionButton);

  // pergi ke page favorite
  I.amOnPage('/#/fav');

  // // apakah benar restaurant sebelumnya telah terhapus dari daftar favorite ?
  I.see(defaultFavText, 'h2');
});

Scenario('User review', async (I) => {
  // buka page home
  I.amOnPage('/');

  // membuka halaman detail
  I.click(locate('.card-btn a').first());

  I.seeElement('.form');

  // review otomatis
  const userReview = 'Testing E2E With Codeceptjs';
  I.fillField('#name', 'Ridwan');
  I.fillField('#desc', userReview);

  // mengirimkan review
  I.click('#submit');

  // apakah sudah masuk ke daftar review?
  const lastReview = locate('.capt').last();
  const textLastReview = await I.grabTextFrom(lastReview);

  assert.strictEqual(`"${userReview}"`, textLastReview);
});

import RestoDevSource from '../../data/restodev-source';
import UrlParser from '../../routes/url-parser';
import ElementViews from '../../utils/element-view';
import {
  restoDetailTemplate,
  dataErrorTemplate,
  detailRestoCategoryTemplate,
  createMenuListTemplate,
  userReviewTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
import Preloader from '../../loader/loading';
import RestoDevDB from '../../data/restoFavorite';

const Detail = {
  async render() {
    return `
    <section class="restoran">
        <article id="resto-list"></article>
        <h2>Daftar Makanan dan Minuman yang Tersedia</h2>
        <article class="menu">
        <div class="list food"><h3>Makanan</h3></div>
        <div class="list drink"><h3>Minuman</h3></div>
        </article>
    </section>

    <section class="rates" id="testi">
        <h2>simak ulasan mereka : </h2>
        <article class="review-user2"></article>
    </section>
    <hr> <br>
    <section class="form">
    <h2>Masukkan feedback Anda:</h2>
    <br>
    <article class="review">
        <div class="form">
            <label for="name">Nama:</label><br>
            <input maxlength="25" type="text" id="name" name="fname"><br>
            <label for="desc">Komentar:</label><br>
            <textarea maxlength="90" type="text" id="desc" name="lname"></textarea>
            <div class="card-btn">
                <button id="submit" class="btn btn-desc">Submit <i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
    </article>
</section>
<div id="likeButtonContainer"></div>
        `;
  },

  async afterRender() {
    Preloader.addPreloader();

    const restoContainer = document.querySelector('#resto-list');
    const userRateContainer = document.querySelector('.review-user2');
    const food = document.querySelector('.food');
    const drink = document.querySelector('.drink');
    const docHero = document.querySelector('hero-view');
    const testimoni = document.querySelector('.testi');

    ElementViews.hideElement(docHero);
    ElementViews.hideElement(testimoni);

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestoDevSource.restoDetail(url.id);

    Preloader.removePreloader();

    if (!restaurant.restaurant) {
      document.querySelector('.content').innerHTML = dataErrorTemplate(restaurant);
      return;
    }

    restoContainer.innerHTML += restoDetailTemplate(restaurant.restaurant);
    const categories = document.querySelector('#categories');

    restaurant.restaurant.categories.forEach((category) => {
      categories.innerHTML += detailRestoCategoryTemplate(category);
    });

    restaurant.restaurant.menus.foods.forEach((foodList) => {
      food.innerHTML += createMenuListTemplate(foodList);
    });

    restaurant.restaurant.menus.drinks.forEach((drinkList) => {
      drink.innerHTML += createMenuListTemplate(drinkList);
    });

    restaurant.restaurant.customerReviews.forEach((usrRate) => {
      userRateContainer.innerHTML += userReviewTemplate(usrRate);
    });

    this.addUserReview(url.id);

    // tombol like

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      resto: restaurant.restaurant,
      FavoriteResto: RestoDevDB,
    });
  },

  addUserReview(idResto) {
    document.querySelector('#submit').addEventListener('click', () => {
      const name = document.querySelector('#name');
      const desc = document.querySelector('#desc');
      const userRateContainer = document.querySelector('.review-user2');

      const nameValueHandling = name.value === '' ? 'Anonym' : name.value;

      if (desc.value === '') {
        alert('Deskripsi harus di isi');
        return;
      }

      RestoDevSource.addReview({
        id: idResto,
        name: nameValueHandling,
        review: desc.value,
      });

      // Menampilkan user review kedalam html secara real time ( tidak menunggu server )
      userRateContainer.innerHTML += userReviewTemplate({
        name: nameValueHandling,
        date: 'Baru saja',
        review: desc.value,
      });

      // Reset Nilai Input
      name.value = '';
      desc.value = '';
    });
  },
};

export default Detail;

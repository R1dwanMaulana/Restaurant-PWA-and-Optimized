import RestoDevSource from '../../data/restodev-source';
import { restoListTemplate, userRateTemplate, dataErrorTemplate } from '../templates/template-creator';
import ElementViews from '../../utils/element-view';
import Preloader from '../../loader/loading';

const RestoList = {
  async render() {
    return `
    <section class="restoran">
        <h2>Restoran yang direkomendasikan untuk anda : </h2>
        <article id="list"></article>
    </section>
    <section class="rate" id="testi">
        <h2>simak ulasan mereka : </h2>
        <article class="review-user"></article>
    </section>
        `;
  },

  async afterRender() {
    Preloader.addPreloader();

    const docHero = document.querySelector('hero-view');
    const testimoni = document.querySelector('.testi');
    ElementViews.showElement(docHero);
    ElementViews.showElement(testimoni);

    const restaurant = await RestoDevSource.restoList();
    const rate = await RestoDevSource.userRate();
    const restoContainer = document.querySelector('#list');
    const userRateContainer = document.querySelector('.review-user');

    Preloader.removePreloader();

    if (!restaurant.restaurants) {
      document.querySelector('.content').innerHTML = dataErrorTemplate(restaurant);
      return;
    }
    rate.users.forEach((usrRate) => {
      userRateContainer.innerHTML += userRateTemplate(usrRate);
    });
    restaurant.restaurants.forEach((resto) => {
      restoContainer.innerHTML += restoListTemplate(resto);
    });
  },
};

export default RestoList;

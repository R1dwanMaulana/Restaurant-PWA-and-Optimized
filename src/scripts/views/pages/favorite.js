import RestoDevDB from '../../data/restoFavorite';
import { dataErrorTemplate, restoFavoriteTemplate } from '../templates/template-creator';
import Preloader from '../../loader/loading';
import ElementViews from '../../utils/element-view';

const Favorite = {
  async render() {
    return `
    <section class="restoran">
        <h2>Whistlist Anda: </h2>
        <article id="list"></article>
    </section>
    `;
  },

  async afterRender() {
    Preloader.addPreloader();

    const docHero = document.querySelector('hero-view');
    const testimonial = document.querySelector('.testi');
    ElementViews.showElement(docHero);
    ElementViews.hideElement(testimonial);

    const restaurant = await RestoDevDB.getAllResto();
    const restoContainer = document.querySelector('#list');

    Preloader.removePreloader();
    if (!restaurant) {
      document.querySelector('.content').innerHTML = dataErrorTemplate(restaurant);
      return;
    }
    if (restaurant.length > 0) {
      restaurant.forEach((resto) => {
        restoContainer.innerHTML += restoFavoriteTemplate(resto);
      });
    } else {
      document.querySelector('.restoran h2').innerHTML = 'tidak ada restoran yang tersimpan';
    }
  },
};

export default Favorite;

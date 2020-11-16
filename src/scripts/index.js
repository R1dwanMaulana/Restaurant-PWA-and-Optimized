import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import '../styles/responsive.css';
import './component/skip-content';
import './component/nav-view';
import './component/hero-view';
import './component/footer-view';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const docContent = document.querySelector('.content');
const app = new App({
  button: document.querySelector('.menu-toggle'),
  // body: document.querySelector('body'),
  content: docContent,
  loader: document.querySelector('#preload'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

console.log('Hello Coders! :)');

import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import Preloader from '../loader/loading';

class App {
  constructor({
    button, content, loader,
  }) {
    this._button = button;
    this._content = content;
    this._loader = loader;
    this._initiallPreloader();
  }

  _initiallPreloader() {
    Preloader.init(this._loader);
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
  }
}

export default App;

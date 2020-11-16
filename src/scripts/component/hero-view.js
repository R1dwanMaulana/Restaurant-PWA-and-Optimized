class HeroView extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
          <header>
          <div class="hero">
              <div class="header">
                  <h1>Resto Dev, platform untuk mencari daftar restoran favorite</h1> <br>
                  <h2>disini anda dapat memilih restoran yang telah di recommended dari kami</h2>
              </div>
              <div class="title"></div>
          </div>
      </header>
          `;
  }
}

customElements.define('hero-view', HeroView);

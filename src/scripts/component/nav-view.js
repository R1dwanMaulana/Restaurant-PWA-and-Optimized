class NavView extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <nav>
        <div class="logo">
            <h3><i class="fas fa-utensils"> </i>Resto Dev</h3>
        </div>

        <ul>
            <li><a href="#/home">Home</a></li>
            <li><a href="#/fav">Favorite</a></li>
            <li><a class="testi" href="#testi">Testimoni</a></li>
            <li><a href="https://my-journey.vercel.app/">About us</a></li>
        </ul>

        <button class="menu-toggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
        </button>
    </nav>
        `;
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('slide');
    });
  }
}

customElements.define('nav-view', NavView);

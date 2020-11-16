class FooterView extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <footer>
        <p>Copyright &#169; 2020 - Resto Dev</p>
    </footer>
        `;
  }
}

customElements.define('footer-view', FooterView);

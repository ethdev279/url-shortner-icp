import { html, render } from "lit-html";
import { url_shortner_backend } from "declarations/url-shortner-backend";
import logo from "./logo2.svg";

class App {
  shortCode = "";
  resolvedUrl = "";

  constructor() {
    this.#render();
  }

  #handleShorten = async (e) => {
    e.preventDefault();
    const url = document.getElementById("url").value;
    this.shortCode = await url_shortner_backend.shorten(url);
    this.#render();
  };

  #handleResolve = async (e) => {
    e.preventDefault();
    const shortCode = document.getElementById("shortCode").value;
    const result = await url_shortner_backend.resolve(shortCode);
    this.resolvedUrl = result ?? "Not found";
    this.#render();
  };

  #render() {
    let body = html`
      <main>
        <img src="${logo}" alt="DFINITY logo" />
        <h1>URL Shortener</h1>

        <!-- Shorten URL Form -->
        <form @submit=${this.#handleShorten}>
          <label for="url">Enter URL:</label>
          <input id="url" type="text" required />
          <button type="submit">Shorten</button>
        </form>

        <!-- Display Shortened Code-->
        ${this.shortCode
          ? html`<p>Shortened Code: <strong>${this.shortCode}</strong></p>`
          : ""}

        <hr />

        <!-- Resolve URL Form -->
        <form @submit=${this.#handleResolve}>
          <label for="shortCode">Enter Short Code:</label>
          <input id="shortCode" type="text" required />
          <button type="submit">Resolve</button>
        </form>

        <!-- Display Resolved URL -->
        ${this.resolvedUrl
          ? html`<p>
              Original URL:
              <a href="${this.resolvedUrl}" target="_blank"
                >${this.resolvedUrl}</a
              >
            </p>`
          : ""}
      </main>
    `;

    render(body, document.getElementById("root"));
  }
}

export default App;

import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import windowStore from "../../share/store/store";
import { debounceTime, delay, tap } from "rxjs";

class Home extends HTMLElement {
  root: HTMLElement;
  counterSubscription = windowStore.createSubscription();
  counterUpdater = { setValue: (value: number) => {} };

  constructor() {
    super();
    this.root = document.createElement("div");
    ReactDOM.createRoot(this.root).render(
      <App counterUpdater={this.counterUpdater}></App>
    );
  }

  connectedCallback() {
    this.appendChild(this.root);

    this.counterSubscription = windowStore.counter$
      .pipe(
        debounceTime(1),
        tap((counter) => {
          this.counterUpdater.setValue(counter);
        })
      )
      .subscribe();
  }

  disconnectedCallback() {
    this.counterSubscription.unsubscribe();
  }
}

customElements.define("react-home-ce", Home);

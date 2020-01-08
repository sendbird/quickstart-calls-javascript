import BaseElement from "./BaseElement";
import { createAudio } from "./utils/domUtil";

export default class App extends BaseElement {
  constructor({ id, className, pages, args }) {
    super({ id, className, args });
    this.pages = pages;
  }

  build() {
    const audio = createAudio({ id: 'remote-audio-view', autoplay: true });
    this.element.appendChild(audio);
    this.route('index', {});
  }

  route(pageName, opt = {}) {
    this.children.forEach( child => child.remove() );
    const _opt = Object.assign({ args: this.args }, opt);

    const pageClass = this.pages[pageName];
    const view = new pageClass(_opt);
    view.appendToBaseElement(this);
  }
}
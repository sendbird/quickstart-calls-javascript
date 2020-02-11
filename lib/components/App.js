import BaseElement from "./BaseElement";
import { createAudio } from "../utils/domUtil";
import { jss, sheet } from "../css/styles.js";

export default class App extends BaseElement {
  constructor({ id, className, pages, styles, args }) {
    super({ id, className, args });
    this.pages = pages;
    this.styles = styles;
  }

  _applyStyle() {
    if (sheet.attached) return;

    sheet.attach();
    const customSheet = jss.createStyleSheet(this.styles);
    customSheet.attach();
  }

  build() {
    this._applyStyle();
    const audio = createAudio({ id: 'remote-audio-view', autoplay: true });
    this.element.appendChild(audio);
    this.route('index', {});
  }

  route(pageName, opt = {}) {
    this.children.forEach( child => child.remove() );

    const pageClass = this.pages[pageName];
    const view = new pageClass(opt);
    view.appendToBaseElement(this);
  }
}
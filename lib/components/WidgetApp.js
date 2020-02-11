import BaseElement from "./BaseElement";
import MainApp from "./MainApp";
import { classes } from "../css/styles.js";
import { createButton, createDiv } from "../utils/domUtil";

export default class WidgetApp extends BaseElement {
  constructor({ id, className, pages, styles, icon, args }) {
    const _className = `${classes['widgetApp']} ${className}`;
    super({ id, className: _className, args });

    this.pages = pages;
    this.styles = styles;
    this.mainApp = null;
    this.widgetIcon = icon || null;
    this.opened = false;
  }

  onLoaded() {
  }

  openWidget() {
    this.mainApp.element.classList.remove(classes['hidden']);
    this.widgetIcon.classList.add(classes['hidden']);
  }

  closeWidget() {
    this.mainApp.element.classList.add(classes['hidden']);
    this.widgetIcon.classList.remove(classes['hidden']);
  }

  build() {
    if (!this.widgetIcon) this.widgetIcon = createDiv({ id: 'widget_icon', className: classes['widgetIcon'] });
    this.mainApp = new MainApp({
      className: `${classes['widgetDiv']} ${classes['hidden']}`,
      pages: this.pages,
      styles: this.styles,
      args: this.args
    });
    const btnClose = createButton({ id: 'btn_close', className: `${classes['widgetCloseBtn']}` });

    this.widgetIcon.onclick = () => {
      if (this.opened) {
        this.closeWidget();
      } else {
        this.openWidget();
      }
    };

    btnClose.onclick = () => {
      this.closeWidget();
    };

    this.element.appendChild(this.widgetIcon);
    this.mainApp.appendToBaseElement(this);
    this.mainApp.element.appendChild(btnClose);
  }

  recvMessage(name, value) {
    switch(name) {
      case 'widgetringing':
        this.sendToParent(name, value);
        this.recvRinging(value);
        break;
      default:
        break;
    }
  }

  recvRinging() {
    if (!this.opened) this.openWidget();
  }
}
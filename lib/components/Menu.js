import BaseElement from "./BaseElement";
import {createButton, createDiv, createLabel} from "../utils/domUtil";
import { classes } from "../css/styles";

export default class Menu extends BaseElement {
  constructor({ id, className, parent, element, items } = {}) {
    super({ id, className, parent, element });

    this.items = items;
    this.opened = false;
  }

  build() {
    this.menuItems = createDiv({ className: `${classes['menuItems']} ${classes['hidden']}` });

    this.items.forEach((item) => {
      const { label, callback } = item;
      const labelElem = createLabel({
        className: `${classes['fontNormal']} ${classes['fontHeavy']}`,
        innerText: label
      });
      const itemElem = createButton({ className: `${classes['btn']} ${classes['menuItem']}` });
      itemElem.onclick = () => {
        callback();
      };
      itemElem.appendChild(labelElem);
      this.menuItems.appendChild(itemElem);
    });

    this.element.appendChild(this.menuItems);
    this.element.onclick = (e) => {
      e.stopPropagation();
      if (this.opened) {
        this.hide();
      } else {
        this.show();
      }
    };
    const app = document.querySelector(`.${classes['mainApp']}`);
    app.addEventListener('click', () => {
      this.hide();
    });
  }

  show() {
    this.menuItems.classList.remove(classes['hidden']);
    this.opened = true;
  }

  hide() {
    this.menuItems.classList.add(classes['hidden']);
    this.opened = false;
  }
}
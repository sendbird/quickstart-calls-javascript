import BaseElement from "./BaseElement";
import { createButton, createDiv, createLabel } from "../utils/domUtil";
import { classes } from "../css/styles";

export default class Menu extends BaseElement {
  constructor({ id, className, divider, parent, element, items } = {}) {
    super({ id, className, parent, element });

    this.items = items;
    this.divider = divider;
    this.opened = false;
  }

  build() {
    this.element.addEventListener('mouseenter', function(){
      this.style.backgroundColor = '#6440c4';
    });

    this.element.addEventListener('mouseout', function(){
      this.style.backgroundColor = '';
    });
    
    this.menuItems = createDiv({ className: `${classes['menuItems']} ${classes['hidden']}` });

    this.items.forEach((item) => {
      const { label, element, callback } = item;
      const labelElem = element ? element : createLabel({
        className: `${classes['fontNormal']} ${classes['fontHeavy']}`,
        innerText: label
      });
      const itemElem = createButton({ className: `${classes['btn']} ${classes['menuItem']}` });

      if (callback) {
        itemElem.onclick = () => {
          callback();
        };
      }

      itemElem.appendChild(labelElem);
      this.menuItems.appendChild(itemElem);

      if (this.divider && item !== this.items[this.items.length - 1]) {
        const divider = this.divider.cloneNode(true);
        this.menuItems.appendChild(divider);
      }
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
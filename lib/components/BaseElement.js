import uuid from 'uuid/v4';
import { createDiv } from "../utils/domUtil";

export default class BaseElement {
  constructor({ id, className, args } = {}) {
    this.id = id || uuid();
    this.className = className;
    this.children = [];
    this.args = args || {};
    this.element = createDiv({ id: this.id, className: this.className });
  }

  build() {
    throw ("Implement this in subclass.");
  }

  onLoaded() {
  }

  _passArgs(args) {
    this.args = args;
  }

  appendToHTML(htmlElement) {
    this.build();
    htmlElement.appendChild(this.element);

    if (this.onLoaded) {
      this.onLoaded();
    }
  }

  appendToBaseElement(baseElement) {
    this._passArgs(baseElement.args);
    this.build();
    const element = baseElement.element;

    element.appendChild(this.element);

    this.parent = baseElement;
    baseElement.children.push(this);

    if (this.onLoaded) {
      this.onLoaded();
    }
  }

  sendToParent(name, value) {
    if (this.parent) this.parent.recvMessage(name, value);
  }

  sendToChildren(name, value) {
    this.children.map(child => child.recvMessage(name, value));
  }

  recvMessage(name, value) {
  }

  remove() {
    // detach from parent BaseElement
    if (this.parent) {
      const index = this.parent.children.indexOf(this);
      if (index > -1) {
        this.parent.children.splice(index, 1);
      }
      this.parent = null;
    }

    // detach from parent HTMLElement
    if (this.element.parentElement) this.element.parentElement.removeChild(this.element);

    // detach every child from itself
    this.children.forEach(child => child.remove());

    this.element = undefined;
    return true;
  }
}
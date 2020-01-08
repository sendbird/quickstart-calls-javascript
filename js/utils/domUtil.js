export function _createElement({ tagName, id, innerText, attrs, className }) {
  if (!tagName) throw "NoTagName";

  const elem = document.createElement(tagName);

  if (id) elem.id = id;
  if (innerText) elem.innerText = innerText;

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      elem.setAttribute(key, value);
    });
  }

  if (className) {
    elem.className = className;
  }

  return elem;
}

export function createDiv({ id, className, innerText } = {}) {
  return _createElement({ tagName: 'div', id: id, className: className, innerText: innerText });
}

export function createHr({ id, className } = {}) {
  return _createElement({ tagName: 'hr', id: id, className: className });
}

export function createLabel({ id, htmlFor, className, innerText } = {}) {
  return _createElement({ tagName: 'label', htmlFor: htmlFor, id: id, className: className, innerText: innerText });
}

export function createAudio({ id, className, autoplay, muted } = {}) {
  const attrs = {};

  if (autoplay) {
    attrs.autoplay = '';
  }

  if (muted) {
    attrs.muted = '';
  }

  return _createElement({ tagName: 'audio', id: id, className: className, attrs: attrs });
}

export function createVideo({ id, className, autoplay, muted } = {}) {
  const attrs = {};

  if (autoplay) {
    attrs.autoplay = '';
  }

  if (muted) {
    attrs.muted = '';
  }

  return _createElement({ tagName: 'video', id: id, className: className, attrs: attrs });
}

export function createInput({ id, className } = {}) {
  return _createElement({ tagName: 'input', id: id, className: className });
}

export function createCheckbox({ id, className } = {}) {
  return _createElement({
    tagName: 'input',
    id: id,
    className: className,
    attrs: { 'type': 'checkbox' }
  });
}

export function createButton({ id, className, innerText } = {}) {
  return _createElement({ tagName: 'button', id: id, className: className, innerText: innerText });
}

export function createImg({ id, className, src } = {}) {
  return _createElement({ tagName: 'img', id: id, className: className, attrs: { src: src } });
}

export function replaceClassName(element, searchValue, newValue) {
  element.classList.replace(searchValue, newValue);
}
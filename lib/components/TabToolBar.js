import BaseElement from "./BaseElement";
import { createDiv, createParagraph, replaceClassName, hasClassName } from "../utils/domUtil";
import { classes } from "../css/styles";

export default class TabToolBar extends BaseElement {
  constructor({ id, className, parent, element } = {}) {
    super({ id, className, parent, element });
    this.element = element;
  }

  build() {
    // dial tab
    const btnDial = createDiv({id: 'btn_tab_dial', className: `${classes['btnTab']}`});
    const icoTabDial = createDiv({id: 'ico_tab_dial', className: `${classes['tabIco']}  ${classes['dialActive']}`});
    const btnDialCaption = createParagraph({id: 'btn_dial_caption', innerText: 'dial', className: `${classes['fontNormal']} ${classes['fontHeavy']} ${classes['btnTabCaption']} ${classes['btnTabActive']}`});

    btnDial.appendChild(icoTabDial);
    btnDial.appendChild(btnDialCaption);

    btnDial.onclick = (ev) => {
      if(!hasClassName(icoTabDial, classes['dialActive'])) {
        replaceClassName(icoTabDial, classes['dialDeactive'], classes['dialActive']);
        replaceClassName(btnDialCaption, classes['btnTabDeactive'], classes['btnTabActive']);

        replaceClassName(icoCallLog, classes['callLogActive'], classes['callLogDeactive']);
        replaceClassName(btnCalllogCaption, classes['btnTabActive'], classes['btnTabDeactive']);
        this.sendToParent('show_dial');
      }
    };

    const btnCallLog = createDiv({id: 'btn_tab_calllog', className: `${classes['btnTab']}`});
    const icoCallLog = createDiv({id: 'ico_tab_callog', className: `${classes['tabIco']} ${classes['callLogDeactive']}`});
    const btnCalllogCaption = createParagraph({id: 'btn_calllog_caption', innerText: 'History', className: `${classes['fontNormal']} ${classes['fontHeavy']} ${classes['btnTabCaption']} ${classes['btnTabDeactive']}`});

    btnCallLog.appendChild(icoCallLog);
    btnCallLog.appendChild(btnCalllogCaption);

    btnCallLog.onclick = (ev) => {
      if(!hasClassName(icoCallLog, classes['callLogActive'])) {
        replaceClassName(icoCallLog, classes['callLogDeactive'], classes['callLogActive']);
        replaceClassName(btnCalllogCaption, classes['btnTabDeactive'], classes['btnTabActive']);

        replaceClassName(icoTabDial, classes['dialActive'], classes['dialDeactive']);
        replaceClassName(btnDialCaption, classes['btnTabActive'], classes['btnTabDeactive']);

        this.sendToParent('show_calllog');
      }
    };

    this.element.appendChild(btnDial);
    this.element.appendChild(btnCallLog);
  }
}
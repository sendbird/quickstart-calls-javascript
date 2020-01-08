import BaseElement from "../BaseElement";
import { createDiv, createLabel, createButton, replaceClassName } from "../utils/domUtil";

export default class CallButtons extends BaseElement {
  constructor({ id, parent, element } = {}) {
    super({ id, parent, element });

    this.acceptDiv = null;
    this.muteDiv = null;
    this.endDiv = null;
    this.btnEnd = null;
    this.endLabel = null;
    this.closeDiv = null;
    this.activeButtons = [];
  }

  build() {
    const element = createDiv({ className: 'row center' });
    this.element = element;

    this.acceptDiv = createDiv({ className: 'column center hidden' });
    const btnAccept = createDiv({ className: 'btn-circle btn-call btn-accept' });
    const acceptLabel = createLabel({ className: 'label-btn', innerText: 'Accept' });
    this.acceptDiv.appendChild(btnAccept);
    this.acceptDiv.appendChild(acceptLabel);

    this.muteDiv = createDiv({ className: 'column center hidden' });
    const btnMute = createDiv({ id: 'btn_mute', className: 'btn-circle btn-call btn-mute' });
    const muteLabel = createLabel({ className: 'label-btn', innerText: 'Mute' });
    this.muteDiv.appendChild(btnMute);
    this.muteDiv.appendChild(muteLabel);

    this.endDiv = createDiv({ className: 'column center hidden' });
    const btnEnd = createDiv({ className: 'btn-circle btn-call btn-end' });
    const endLabel = createLabel({ className: 'label-btn', innerText: 'End' });
    this.endDiv.appendChild(btnEnd);
    this.endDiv.appendChild(endLabel);
    this.btnEnd = btnEnd;
    this.endLabel = endLabel;

    this.closeDiv = createDiv({ className: 'column center hidden' });
    const btnClose = createButton({ className: 'btn-close' });
    const closeLabel = createLabel({ innerText: 'Back to dial page', className: 'desc-light' });
    btnClose.appendChild(closeLabel);
    this.closeDiv.appendChild(btnClose);

    element.appendChild(this.acceptDiv);
    element.appendChild(this.muteDiv);
    element.appendChild(this.endDiv);
    element.appendChild(this.closeDiv);

    btnAccept.onclick = () => {
      this.setAccepting();
      this.sendToParent('click_accept');
    };
    btnMute.onclick = () => {
      this.invertMuteIcon();
      this.sendToParent('click_mute');
    };
    btnEnd.onclick = () => {
      this.sendToParent('click_end');
    };
    btnClose.onclick = () => {
      this.sendToParent('click_close');
    };
  }

  invertMuteIcon() {
    const btnMute = this.muteDiv.querySelector('.btn-mute');
    const btnUnmute = this.muteDiv.querySelector('.btn-unmute');
    const btnLabel = this.muteDiv.querySelector('.label-btn');

    if (btnMute) {
      replaceClassName(btnMute, 'btn-mute', 'btn-unmute');
      btnLabel.innerText = 'Unmute';
    }

    if (btnUnmute) {
      replaceClassName(btnUnmute, 'btn-unmute', 'btn-mute');
      btnLabel.innerText = 'Mute';
    }
  }

  recvMessage(name, value) {
    switch (name) {
      case 'dialing':
        this.setDialing();
        break;
      case 'ringing':
        this.setRinging();
        break;
      case 'connected':
        this.setConnected();
        break;
      case 'ended':
        this.setEnded();
        break;
      default:
        break;
    }
  }

  setAccepting() {
    this.hideActiveButtons()
    this.showButtons(this.endDiv);
    replaceClassName(this.btnEnd, 'btn-decline', 'btn-end');
    this.endLabel.innerText = 'End';
  }

  setDialing() {
    this.hideActiveButtons();
    this.showButtons(this.endDiv);
  }

  setRinging() {
    this.hideActiveButtons();
    this.showButtons(this.acceptDiv, this.endDiv);

    replaceClassName(this.btnEnd, 'btn-end', 'btn-decline');
    this.endLabel.innerText = 'Decline';
  }

  setConnected() {
    this.hideActiveButtons();
    this.showButtons(this.muteDiv, this.endDiv);
  }

  setEnded() {
    this.hideActiveButtons();
    this.showButtons(this.closeDiv);
  }

  hideActiveButtons() {
    for (const btn of this.activeButtons) {
      btn.classList.add('hidden');
    }
    this.activeButtons = [];
  }

  showButtons(...btns) {
    for (const btn of btns) {
      btn.classList.remove('hidden');
    }

    this.activeButtons.push(...btns);
  }
}

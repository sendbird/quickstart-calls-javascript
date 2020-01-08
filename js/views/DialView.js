import BaseElement from "../BaseElement";
import { createButton, createDiv, createImg, createInput, createLabel, createHr } from "../utils/domUtil";
import { getCallOption } from "../utils/util";
import SendBirdCall from "sendbird-calls";
import logoImage from "../../img/ic-logo-horizontal-purple-300.svg";

export default class DialView extends BaseElement {
  constructor({ args }) {
    super({ id: 'dial_view', className: 'column center dial-view', args });
  }

  onLoaded() {
  }

  build() {
    const logoImg = createImg({
      src: logoImage,
      className: 'ic-logo-horizontal-purple-300'
    });

    const formContainer = createDiv({ className: 'form-container' });
    const peerIdLabel = createLabel({
      htmlFor: 'peer_id',
      id: 'peer_id_label',
      innerText: 'Peer ID',
      className: "input-title"
    });
    const peerId = createInput({ id: 'peer_id', className: 'field' });
    const hr = createHr();

    const btns = createDiv({ id: 'buttons', className: 'row-reverse' });
    const btnDial = createButton({ id: 'btn_dial', className: 'btn btn-primary btn-mid dial-button' });
    const dialLabel = createLabel({ innerText: 'Dial' });
    const btnDeauth = createButton({ id: 'btn_dial', className: 'btn btn-primary btn-mid logout-button' });
    const deauthLabel = createLabel({ innerText: 'Logout' });

    btnDial.appendChild(dialLabel);
    btnDeauth.appendChild(deauthLabel);
    btns.appendChild(btnDial);
    btns.appendChild(btnDeauth);

    formContainer.appendChild(peerIdLabel);
    formContainer.appendChild(peerId);
    formContainer.appendChild(hr);
    formContainer.appendChild(btns);

    this.element.append(logoImg);
    this.element.append(formContainer);

    btnDial.onclick = () => {
      this.dial(peerId.value);
    };

    btnDeauth.onclick = () => {
      this.deauthenticate();
    }
  }

  dial(peerId) {
    const callOption = getCallOption();

    try {

      const call = SendBirdCall.dial(peerId, true, callOption, (call, error) => {
        if (error) {
          console.error('dial failed');
          return;
        }

        this.sendToParent('dial', call);
      });

    } catch (e) {
      alert(e);
    }
  }

  deauthenticate() {
    SendBirdCall.deauthenticate();
    this.sendToParent('deauthenticate');
  }
}
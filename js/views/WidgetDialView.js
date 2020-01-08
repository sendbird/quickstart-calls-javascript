import BaseElement from "../BaseElement";
import { createButton, createDiv, createImg, createInput, createLabel } from "../utils/domUtil";
import { getCallOption } from "../utils/util";
import SendBirdCall from "sendbird-calls";
import logoImage from "../../img/ic-logo-purple-300.svg";

export default class widgetDialView extends BaseElement {
  constructor({ args }) {
    super({ id: 'widget_dial_view', className: 'container column', args });
  }

  onLoaded() {
  }

  build() {
    const header = createDiv({ id: 'header', className: 'widget-header' });
    const logoImg = createImg({
      src: logoImage,
      className: "ic-logo-purple-300"
    });
    header.appendChild(logoImg);

    const formContainer = createDiv({ className: 'widget-form-container' });
    const peerIdLabel = createLabel({
      htmlFor: 'peer_id',
      id: 'peer_id_label',
      innerText: 'Peer ID',
      className: 'input-title'
    });
    const peerId = createInput({ id: 'peer_id', className: 'field' });

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
    formContainer.appendChild(btns);

    this.element.append(header);
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

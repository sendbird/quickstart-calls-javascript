import BaseElement from "../components/BaseElement";
import { createButton, createDiv, createInput, createLabel, createHr } from "../utils/domUtil";
import { getCallOption } from "../utils/util";
import SendBirdCall from "sendbird-calls";
import { classes } from "../css/styles.js";

export default class DialView extends BaseElement {
  constructor({ args }) {
    super({ id: 'dial_view', className: `${classes['column']} ${classes['center']} ${classes['view']} ${classes['viewDial']}`, args });
  }

  onLoaded() {
  }

  build() {
    const logoImg = createDiv({ id: 'logo_horizontal', className: classes['logoBig'] });

    const formContainer = createDiv({ className: classes['formContainer'] });
    const peerIdLabel = createLabel({
      htmlFor: 'peer_id',
      id: 'peer_id_label',
      innerText: 'Peer ID',
      className: `${classes['fieldLabel']} ${classes['fontSmall']} ${classes['fontHeavy']}`
    });
    const peerId = createInput({ id: 'peer_id', className: `${classes['field']} ${classes['fontNormal']}` });
    const hr = createHr({ className: classes['hr'] });

    const btns = createDiv({ id: 'buttons', className: `${classes['row']} ${classes['right']} ${classes['btns']}` });
    const btnDial = createButton({ id: 'btn_dial', className: `${classes['btn']} ${classes['btnPrimary']} ${classes['btnMid']} ${classes['dialButton']} ${classes['fontNormal']}` });
    const dialLabel = createLabel({ innerText: 'Dial' });
    const btnDeauth = createButton({ id: 'btn_deauth', className: `${classes['btn']} ${classes['btnPrimary']} ${classes['btnMid']} ${classes['logoutButton']} ${classes['fontNormal']}` });
    const deauthLabel = createLabel({ innerText: 'Logout' });

    btnDial.appendChild(dialLabel);
    btnDeauth.appendChild(deauthLabel);
    btns.appendChild(btnDeauth);
    btns.appendChild(btnDial);

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

      const call = SendBirdCall.dial({
        userId: peerId,
        isVideoCall: false,
        callOption: callOption
      }, (call, error) => {
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
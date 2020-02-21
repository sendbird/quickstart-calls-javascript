import BaseElement from "../components/BaseElement";
import { createButton, createDiv, createInput, createLabel } from "../utils/domUtil";
import { getCallOption } from "../utils/util";
import SendBirdCall from "sendbird-calls";
import { sheet, classes } from "../css/styles.js";

export default class widgetDialView extends BaseElement {
  constructor({ args }) {
    super({ id: 'widget_dial_view', className: `${classes['container']} ${classes['column']} ${classes['view']} ${classes['viewDialWidget']}`, args });
    this.errorMsg = null;
  }

  onLoaded() {
  }

  build() {
    const header = createDiv({ id: 'header', className: classes['widgetHeader'] });
    if (this.args.user && this.args.user.profileUrl) {
      sheet.update({ profileUrl: this.args.user.profileUrl });
      const profileImg = createDiv({ id: 'header_profile_img', className: classes['profileSmall'] });
      header.appendChild(profileImg);
    } else {
      let logoImg = createDiv({ id: 'header_logo', className: `${classes['logoSmall']}` });
      header.appendChild(logoImg);
    }
    const headerInfo = createDiv({ id: 'header_info', className: `${classes['headerInfo']} ${classes['grow1']}` });
    const userId = createDiv({ id: 'header_user_id', className: `${classes['headerUserId']} ${classes['fontNormal']} ${classes['fontHeavy']}`, innerText: this.args.user.userId || '' });
    const nickname = createDiv({ id: 'header_nickname', className: `${classes['headerNickname']} ${classes['fontSmall']}`, innerText: this.args.user.nickname || 'no nickname' });
    headerInfo.appendChild(userId);
    headerInfo.appendChild(nickname);
    header.appendChild(headerInfo);

    const formContainer = createDiv({ className: `${classes['formContainer']} ${classes['column']} ${classes['center']}` });
    const logoMid = createDiv({ id: 'logo_oval', className: `${classes['logoMid']}` });
    const welcomeDiv = createDiv({ id: 'welcome_div', className: `${classes['fontBig']} ${classes['fontHeavy']}`, innerText: 'Welcome to SendBird' });
    const descDiv = createDiv({ id: 'desc_div', className: `${classes['fontNormal']}`, innerText: 'Start call to a user you want' });
    const peerId = createInput({ id: 'peer_id', className: `${classes['field']} ${classes['fontNormal']}`, placeholder: 'Enter Callee ID' });
    this.errorMsg = createLabel({ id: 'error_msg', className: `${classes['error']} ${classes['fontSmall']}`, htmlFor: 'peer_id' });

    const btns = createDiv({ id: 'buttons', className: `${classes['row']} ${classes['right']} ${classes['btns']}` });
    const btnDial = createButton({ id: 'btn_dial', className: `${classes['btn']} ${classes['btnPrimary']} ${classes['btnMid']} ${classes['dialButton']} ${classes['fontNormal']}` });
    const dialLabel = createLabel({ innerText: 'Dial' });
    const btnDeauth = createButton({ id: 'btn_deauth', className: `${classes['btn']} ${classes['btnPrimary']} ${classes['btnMid']} ${classes['logoutButton']} ${classes['fontNormal']}` });
    const deauthLabel = createLabel({ innerText: 'Logout' });

    btnDial.appendChild(dialLabel);
    btnDeauth.appendChild(deauthLabel);
    btns.appendChild(btnDeauth);
    btns.appendChild(btnDial);

    formContainer.appendChild(logoMid);
    formContainer.appendChild(welcomeDiv);
    formContainer.appendChild(descDiv);
    formContainer.appendChild(peerId);
    formContainer.appendChild(this.errorMsg);
    formContainer.appendChild(btns);

    this.element.append(header);
    this.element.append(formContainer);

    btnDial.onclick = () => {
      this.dial(peerId.value);
    };

    btnDeauth.onclick = () => {
      this.deauthenticate();
    };
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
          this.errorMsg.textContent = error.message;
          if (this.errorMsg.htmlFor) {
            const field = document.querySelector(`#${this.errorMsg.htmlFor}`);
            field.classList.add(classes['fieldInvalid']);
          }
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

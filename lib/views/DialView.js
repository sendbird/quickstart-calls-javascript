import SendBirdCall from "sendbird-calls";

import BaseElement from "../components/BaseElement";
import { sheet, classes } from "../css/styles.js";
import { createButton, createDiv, createInput, createLabel } from "../utils/domUtil";
import Menu from "../components/Menu";
import pack from "../../package";

export default class DialView extends BaseElement {
  constructor({ args }) {
    super({
      id: 'dial_view',
      className: `${classes['container']} ${classes['column']} ${classes['center']} ${classes['view']} ${classes['viewDial']}`,
      args
    });

    this.settingItems = [
      {
        'label': 'Device settings',
        'callback': () => { this.sendToParent('show_settings') }
      },
      {
        'label': 'Sign out',
        'callback': () => { this.deauthenticate(); }
      }
    ];
  }

  onLoaded() {
  }

  build() {
    const header = createDiv({ id: 'header', className: classes['widgetHeader'] });

    const content = createDiv({
      id: 'content',
      className: `${classes['content']} ${classes['column']} ${classes['center']}`
    });

    const userDiv = createDiv({
      id: 'header_user_div',
      className: `${classes['userDiv']} ${classes['center']}`
    });

    let profileImg;
    if (this.args.user && this.args.user.profileUrl) {
      sheet.update({ profileUrl: this.args.user.profileUrl });
      profileImg = createDiv({ id: 'header_profile_img', className: classes['profileSmall'] });
    } else {
      profileImg = createDiv({ id: 'header_avatar', className: `${classes['avatar']}` });
    }

    const headerInfo = createDiv({ id: 'header_info', className: `${classes['headerInfo']}` });
    const userId = createDiv({
      id: 'header_user_id',
      className: `${classes['headerUserId']} ${classes['fontNormal']} ${classes['fontHeavy']}`,
      innerText: this.args.user.userId || ''
    });
    const nickname = createDiv({
      id: 'header_nickname',
      className: `${classes['headerNickname']} ${classes['fontSmall']}`,
      innerText: this.args.user.nickname || 'no nickname'
    });
    headerInfo.appendChild(userId);
    headerInfo.appendChild(nickname);

    userDiv.appendChild(profileImg);
    userDiv.appendChild(headerInfo);

    const headerButtons = createDiv({
      id: 'header_buttons',
      className: `${classes['headerButtons']} ${classes['row']} ${classes['center']}`
    });
    const settingsButton = new Menu({
      id: 'settings_button',
      element: createDiv({ className: `${classes['settingsButton']}` }),
      items: this.settingItems
    });

    const closeButton = createDiv({
      id: 'close_button',
      className: `${classes['closeButton']}`
    });
    closeButton.onclick = () => {
      this.sendToParent('widgetclose');
    };
    settingsButton.appendToHTML(headerButtons);
    headerButtons.appendChild(closeButton);

    const divider = createDiv({
      id: 'header_divider',
      className: classes['headerDivider']
    });

    header.appendChild(userDiv);
    header.appendChild(divider);
    header.appendChild(headerButtons);

    const formContainer = createDiv({
      className: `${classes['formContainer']} ${classes['column']} ${classes['center']}`
    });
    const logoMid = createDiv({ id: 'logo_oval', className: `${classes['logoMidBlack']}` });
    const welcomeDiv = createDiv({
      id: 'welcome_div',
      className: `${classes['fontBig']} ${classes['fontHeavy']}`,
      innerText: 'SendBird Calls'
    });
    const descDiv = createDiv({
      id: 'desc_div',
      className: `${classes['dialDesc']} ${classes['fontNormal']}`,
      innerText: 'Make a call'
    });
    const peerId = createInput({
      id: 'peer_id',
      className: `${classes['field']} ${classes['fontNormal']}`,
      placeholder: 'User ID'
    });

    const btns = createDiv({ id: 'buttons', className: `${classes['row']} ${classes['center']} ${classes['btns']}` });
    const btnVideo = createButton({
      id: 'btn_video',
      className: `${classes['btnCircle']} ${classes['btnCall']} ${classes['btnVideo']}`
    });
    const btnAudio = createButton({
      id: 'btn_audio',
      className: `${classes['btnCircle']} ${classes['btnCall']} ${classes['btnAudio']}`
    });

    btns.appendChild(btnVideo);
    btns.appendChild(btnAudio);

    formContainer.appendChild(logoMid);
    formContainer.appendChild(welcomeDiv);
    formContainer.appendChild(descDiv);
    formContainer.appendChild(peerId);
    formContainer.appendChild(btns);

    content.appendChild(formContainer);

    const sampleVersion = pack.version;
    const sdkVersion = SendBirdCall.sdkVersion;
    const versionInfo = createDiv({
      id: 'version_info',
      className: `${classes['versionInfo']} ${classes['row']} ${classes['center']}`
    });
    const sampleVersionLabel = createLabel({
      id: 'sample_version_label',
      className: `${classes['fontSmall']} ${classes['versionLabel']}`,
      innerText: `Quickstart ${sampleVersion}`
    });
    const sdkVersionLabel = createLabel({
      id: 'sdk_version_label',
      className: `${classes['fontSmall']} ${classes['versionLabel']}`,
      innerText: `SDK ${sdkVersion}`
    });
    versionInfo.appendChild(sampleVersionLabel);
    versionInfo.appendChild(sdkVersionLabel);

    this.element.appendChild(header);
    this.element.appendChild(content);
    this.element.appendChild(versionInfo);

    btnVideo.onclick = () => {
      this.dial(peerId.value, true, null);
    };

    btnAudio.onclick = () => {
      this.dial(peerId.value, false, null);
    };
  }

  dial(peerId, isVideoCall, callOption) {
    this.sendToParent('dial', {
      peerId,
      isVideoCall,
      callOption
    });
  }

  deauthenticate() {
    SendBirdCall.deauthenticate();
    this.sendToParent('deauthenticate');
  }
}
import SendBirdCall from "sendbird-calls";
import BaseElement from "./BaseElement";
import { createDiv } from "../utils/domUtil";
import Menu from "../components/Menu";
import { sheet, classes } from "../css/styles";

export default class Header extends BaseElement {
  constructor({ id, className, parent, element, args } = {}) {
    super({ id, className, parent, element, args });
    this.element = element;
    this.parent = parent;

    this.settingItems = [
      {
        'label': 'Device settings',
        'callback': () => { this.sendToParent('show_settings') }
      },
      {
        'label': 'Application information',
        'callback': () => { this.sendToParent('show_app_info') }
      },
      {
        'label': 'Sign out',
        'callback': () => { 
            SendBirdCall.deauthenticate();
            this.sendToParent('deauthenticate'); 
        }
      }
    ];

    this.parent = parent;
  }

  build() {
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
      className: `${classes['headerUserId']} ${classes['fontMidBig']} ${classes['fontDemi']}`,
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
      this.parent.sendToParent('widgetclose');
    };
    settingsButton.appendToHTML(headerButtons);
    headerButtons.appendChild(closeButton);

    const divider = createDiv({
      id: 'header_divider',
      className: classes['headerDivider']
    });

    this.element.appendChild(userDiv);
    this.element.appendChild(divider);
    this.element.appendChild(headerButtons);

    if(!this.args.isWidget){
      const headerLogo = createDiv({ id: 'header_logo', className: `${classes['headerLogo']}`});
      this.element.appendChild(headerLogo);
    }
  }
}
import BaseElement from "../components/BaseElement";
import { createButton, createDiv, createInput, createLabel, createHr } from "../utils/domUtil";
import SendBirdCall from "sendbird-calls";
import { classes } from "../css/styles.js";

export default class LoginView extends BaseElement {
  constructor({ args }) {
    super({ id: 'login_view', className: `${classes['column']} ${classes['center']} ${classes['view']} ${classes['viewLogin']}`, args });
  }

  onLoaded() {
    if (this.args.userId) {
      this.login(this.args.userId, this.args.accessToken);
    }

    this.args.userId = undefined;
    this.args.accessToken = undefined;
  }

  build() {
    const oval = createDiv({ id: 'logo_oval', className: classes['logoMid'] });

    const loginTitleDiv = createDiv({ id: 'login_title_div', className: classes['loginTitleDiv'] });
    const loginTitle = createLabel({ id: 'login_title', innerText: 'Voice Sample Login', className: classes['fontBig'] });
    loginTitleDiv.appendChild(loginTitle);

    const formContainer = createDiv({ id: 'form_container', className: classes['formContainer'] });
    const inputIdLabel = createLabel({ id: 'input_id_label', htmlFor: 'input_id', innerText: 'User ID', className: `${classes['fieldLabel']} ${classes['fontSmall']} ${classes['fontHeavy']}` });
    const inputId = createInput({ id: 'input_id', className: `${classes['field']} ${classes['fontNormal']}` });
    const inputAccessTokenLabel = createLabel({ id: 'input_access_token_label', htmlFor: 'input_access_token', innerText: 'Access Token', className: `${classes['fieldLabel']} ${classes['fontSmall']} ${classes['fontHeavy']}` });
    const inputAccessToken = createInput({ id: 'input_access_token', className: `${classes['field']} ${classes['fontNormal']}` });
    const contour = createHr({ className: classes['hr'] });

    const btns = createDiv({ id: 'buttons', className: `${classes['row']} ${classes['right']} ${classes['btns']}` });
    const btnLogin = createButton({ id: 'btn_login', className: `${classes['btn']} ${classes['btnPrimary']} ${classes['btnMid']} ${classes['loginButton']} ${classes['fontNormal']}`, });
    const loginLabel = createLabel({ id: 'login_label', innerText: 'Login' });
    btnLogin.appendChild(loginLabel);
    btnLogin.onclick = () => {
      const userId = inputId.value;
      const accessToken = inputAccessToken.value;
      this.login(userId, accessToken);
    };
    btns.appendChild(btnLogin);

    formContainer.appendChild(inputIdLabel);
    formContainer.appendChild(inputId);
    if (this.args.isAccessTokenNeeded) {
      formContainer.appendChild(inputAccessTokenLabel);
      formContainer.appendChild(inputAccessToken);
    }
    formContainer.appendChild(contour);
    formContainer.appendChild(btns);

    this.element.appendChild(oval);
    this.element.appendChild(loginTitleDiv);
    this.element.appendChild(formContainer);
  }

  async auth(userId, accessToken) {
    console.log(`userId: ${userId}, accessToken: ${accessToken}`);
    return await SendBirdCall.authenticate({ userId: userId, accessToken: accessToken });
  }

  async connect() {
    await SendBirdCall.connectWebSocket();
  }

  async login(userId, accessToken) {
    if (!userId || userId.length <= 0) {
      alert("No UserID");
      return;
    }

    try {
      this.args.user = await this.auth(userId, accessToken);
      await this.connect();

      this.sendToParent('login');
    } catch (e) {
      alert(e);
    }
  }
}
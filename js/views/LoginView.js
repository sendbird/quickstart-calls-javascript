import BaseElement from "../BaseElement";
import { createButton, createDiv, createInput, createLabel, createHr } from "../utils/domUtil";
import SendBirdCall from "sendbird-calls";


export default class LoginView extends BaseElement {
  constructor({ args }) {
    super({ id: 'login_view', className: 'column center login-view', args });
  }

  onLoaded() {
    if (this.args.userId) {
      this.login(this.args.userId, this.args.accessToken);
    }

    this.args.userId = undefined;
    this.args.accessToken = undefined;
  }

  build() {
    const oval = createDiv({ id: 'logo_oval', className: 'logo-oval' });

    const loginTitleDiv = createDiv({ id: 'login_title_div', className: 'login-title-div' });
    const loginTitle = createLabel({ id: 'login_title', innerText: 'Voice Sample Login', className: 'title' });
    loginTitleDiv.appendChild(loginTitle);

    const formContainer = createDiv({ id: 'form_container', className: 'form-container' });
    const inputIdLabel = createLabel({ id: 'input_id_label', htmlFor: 'input_id', innerText: 'User ID', className: 'input-title' });
    const inputId = createInput({ id: 'input_id', className: 'field' });
    const inputAccessTokenLabel = createLabel({ id: 'input_access_token_label', htmlFor: 'input_access_token', innerText: 'Access Token', className: 'input-title' });
    const inputAccessToken = createInput({ id: 'input_access_token', className: 'field' });
    const contour = createHr();

    const btnLogin = createButton({ id: 'btn_login', className: 'btn btn-primary btn-mid login-button' });
    const loginLabel = createLabel({ id: 'login_label', innerText: 'Login' });
    btnLogin.appendChild(loginLabel);
    btnLogin.onclick = () => {
      const userId = inputId.value;
      const accessToken = inputAccessToken.value;
      this.login(userId, accessToken);
    };

    formContainer.appendChild(inputIdLabel);
    formContainer.appendChild(inputId);
    if (this.args.isAccessTokenNeeded) {
      formContainer.appendChild(inputAccessTokenLabel);
      formContainer.appendChild(inputAccessToken);
    }
    formContainer.appendChild(contour);
    formContainer.appendChild(btnLogin);

    this.element.appendChild(oval);
    this.element.appendChild(loginTitleDiv);
    this.element.appendChild(formContainer);
  }

  async auth(userId, accessToken) {
    console.log(`userId: ${userId}, accessToken: ${accessToken}`);
    await SendBirdCall.authenticate({ userId: userId, accessToken: accessToken });
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
      await this.auth(userId, accessToken);
      await this.connect();

      this.sendToParent('login');
    } catch (e) {
      alert(e);
    }
  }
}
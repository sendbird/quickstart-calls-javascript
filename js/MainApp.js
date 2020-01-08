import CallView from "./views/CallView";
import App from "./App";
import SendBirdCall from "sendbird-calls";


export default class MainApp extends App {
  constructor({ id, className, pages, eventTarget, args }) {
    super({ id, className, pages, args });
    this.eventTarget = eventTarget;
  }

  onLoaded() {
    this.init();
  }

  init() {
    SendBirdCall.init(this.args.appId);
    SendBirdCall.addListener(1, {
      onRinging: (call) => {
        if (this.isBusy()) {
          call.end();
        } else {
          if (this.eventTarget) {
            this.eventTarget.dispatchEvent(new Event('widgetringing'));
          }
          this.addCall(call, 'ringing');
        }
      }
    });
  }

  addCall(call, state) {
    if (this.isBusy()) {
      return undefined;
    }

    this.route('call_view', { call: call, state: state });
    this.changeBackground('bg-dark');
  }

  isBusy() {
    return this.children.some(child => child instanceof CallView);
  }

  changeBackground(bgName) {
    this.element.classList.remove('bg-light');
    this.element.classList.remove('bg-dark');
    this.element.classList.add(bgName);
  }

  recvMessage(name, value) {
    switch (name) {
      case 'login':
        this.recvLogin(value);
        break;
      case 'dial':
        this.recvDial(value);
        break;
      case 'deauthenticate':
        this.recvDeauth();
        break;
      case 'close':
        this.recvClose(value);
        break;
      default:
        break;
    }
  }

  recvLogin() {
    this.route('dial_view', {});
    this.changeBackground('bg-light');
  }

  recvDial(call) {
    this.addCall(call, 'dialing');
  }

  recvDeauth() {
    this.route('login_view', {});
    this.changeBackground('bg-light');
  }

  recvClose() {
    this.route('dial_view', {});
    this.changeBackground('bg-light');
  }
}
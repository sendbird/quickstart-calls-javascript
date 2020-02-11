import CallView from "../views/CallView";
import App from "./App";
import SendBirdCall from "sendbird-calls";
import { classes } from "../css/styles.js";

export default class MainApp extends App {
  constructor({ id, className, pages, styles, args }) {
    const _className = `${classes['container']} ${classes['center']} ${className}`;
    super({ id, className: _className, pages, styles, args });

    this.init();
  }

  onLoaded() {
  }

  init() {
    SendBirdCall.init(this.args.appId);
    SendBirdCall.addListener(1, {
      onRinging: (call) => {
        if (this.isBusy()) {
          call.end();
        } else {
          this.sendToParent('widgetringing', undefined);
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
  }

  isBusy() {
    return this.children.some(child => child instanceof CallView);
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
  }

  recvDial(call) {
    this.addCall(call, 'dialing');
  }

  recvDeauth() {
    this.args.user = undefined;
    this.route('login_view', {});
  }

  recvClose() {
    this.route('dial_view', {});
  }
}
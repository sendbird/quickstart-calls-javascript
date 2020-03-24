import CallView from "../views/CallView";
import App from "./App";
import SendBirdCall from "sendbird-calls";
import { classes } from "../css/styles.js";
import { getCallOption } from "../utils/util";
import { Toast } from "./Toast";
import Settings from "../views/Settings";

export default class MainApp extends App {
  constructor({ id, className, pages, styles, args }) {
    const _className = `${classes['mainApp']} ${classes['container']} ${classes['center']} ${className || ''}`;
    super({ id, className: _className, pages, styles, args });

    this.onLoginSuccess = null;
    this.onLoginFailure = null;

    this.init();
  }

  onLoaded() {
  }

  toast(msg, duration) {
    const toast = new Toast({ msg: msg, duration: duration });
    toast.appendToBaseElement(this);
    toast.show();

    if (duration) {
      setTimeout(() => {
        toast.remove()
      }, duration + 500);
    }
  }

  showSettings() {
    this.settings = new Settings({});
    this.settings.appendToBaseElement(this);
  }

  closeSettings() {
    if (this.settings) {
      this.settings.remove();
      this.settings = null;
    }
  }

  async setAppId(appId) {
    await this._setArgs({ appId: appId });
  }

  async setCredentials(userId, accessToken) {
    await this._setArgs({ userId: userId, accessToken: accessToken });
  }

  async _setArgs(args) {
    if (args) Object.assign(this.args, args);

    if (args.appId) {
      this.init();
    }

    if (args.userId) {
      await this.login(args.userId, args.accessToken);
    }
  }

  init() {
    if (!this.args.appId) return;

    SendBirdCall.init(this.args.appId);
    SendBirdCall.addListener(1, {
      onRinging: (call) => {
        if (this.isBusy()) {
          call.end();
        } else if (!call.endResult) {
          this.sendToParent('widgetringing', undefined);
          this.addCall(call, 'ringing');
        }
      },
      onAudioInputDeviceChanged: (currentDevice, availableDevices) => {
        this.sendToChildren('audio_input_device_change', { currentDevice, availableDevices });
      },
      onAudioOutputDeviceChanged: (currentDevice, availableDevices) => {
        this.sendToChildren('audio_output_device_change', { currentDevice, availableDevices });
      },
      onVideoInputDeviceChanged: (currentDevice, availableDevices) => {
        this.sendToChildren('video_input_device_change', { currentDevice, availableDevices });
      }
    });
  }

  async login(userId, accessToken) {
    try {
      const user = await SendBirdCall.authenticate({ userId: userId, accessToken: accessToken });
      await SendBirdCall.connectWebSocket();

      this.args.user = user;

      if (this.onLoginSuccess) this.onLoginSuccess();
      this.route('dial_view', {});
    } catch (e) {
      if (this.onLoginFailure) this.onLoginFailure(e);
      this.toast(e);
    }
  }

  dial(peerId, isVideoCall = false, callOption, callback) {
    if (peerId === '') {
      this.toast(`Enter a valid user ID`);
      return;
    }

    const _callOption = getCallOption(callOption);

    try {
      const call = SendBirdCall.dial({
        userId: peerId,
        isVideoCall: isVideoCall,
        callOption: _callOption
      }, (call, error) => {
        if (error) {
          this.toast(error);
          if (callback) callback(call, error);
          return;
        }

        this.addCall(call, 'dialing');
        if (callback) callback(call, error);
      });
    } catch (e) {
      this.toast(e);
    }
  }

  addCall(call, state) {
    if (this.isBusy()) {
      return undefined;
    }

    this.route('call_view', { call: call, state: state });
  }

  isBusy() {
    return this.children.some(child => {
      return child instanceof CallView && !child.call.isEnded;
    });
  }

  recvMessage(name, value) {
    switch (name) {
      case 'widgetclose':
        this.recvWidgetClose();
        break;
      case 'appId':
        this.setAppId(value);
        break;
      case 'credentials':
        const { userId, accessToken } = value;
        this.setCredentials(userId, accessToken);
        break;
      case 'dial':
        this.recvDial(value);
        break;
      case 'deauthenticate':
        this.recvDeauth();
        break;
      case 'show_settings':
        this.recvShowSettings();
        break;
      case 'close_settings':
        this.recvCloseSettings();
        break;
      case 'close':
        this.recvClose(value);
        break;
      default:
        break;
    }
  }

  recvWidgetClose() {
    this.sendToParent('widgetclose');
  }

  recvDial({ peerId, isVideoCall, callOption }) {
    this.dial(peerId, isVideoCall, callOption);
  }

  recvDeauth() {
    this.args.user = undefined;
    this.args.userId = undefined;
    this.args.accessToken = undefined;
    this.route('login_view', {});
  }

  recvShowSettings() {
    this.showSettings();
  }

  recvCloseSettings() {
    this.closeSettings();
  }

  recvClose() {
    this.route('dial_view', {});
  }
}
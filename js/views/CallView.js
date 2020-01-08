import BaseElement from "../BaseElement";
import { createDiv, createImg, createLabel, replaceClassName } from "../utils/domUtil";
import { getCallOption } from "../utils/util";
import CallButtons from "./CallButtons";

export default class CallView extends BaseElement {
  constructor({ call, state, args }) {
    super({ id: 'call_view', className: 'column center', args });

    this.call = call;
    this.state = state;
    this.timer = null;
    this.connected = false;
    this.addCallListeners(call);
  }

  onLoaded() {
  }

  build() {
    const localUser = this.call.localUser;
    const remoteUser = this.call.remoteUser;

    const peerProfile = createImg({ src: remoteUser.profileUrl, className: 'remote-profile' });
    const peerName = createLabel({ id: 'peer_name', innerText: remoteUser.userId, className: 'title peer-name' });

    const connectionInfo = createLabel({ id: 'conn_info_label', className: 'desc connection-info' });

    const peerStateDiv = createDiv({ id: 'peer_state', className: 'column peer-state-div-invisible' });
    const peerMuteIcon = createDiv({ id: 'peer_mute_icon', className: 'peer-mute-icon' });
    const peerMuteLabel = createLabel({ id: 'peer_mute_label', className: 'peer-mute-label', innerText: `${remoteUser.userId} muted this call` });
    peerStateDiv.appendChild(peerMuteIcon);
    peerStateDiv.appendChild(peerMuteLabel);

    const buttons = new CallButtons();

    this.element.appendChild(peerProfile);
    this.element.appendChild(peerName);
    this.element.appendChild(connectionInfo);
    this.element.appendChild(peerStateDiv);
    buttons.appendToBaseElement(this);

    let tick = 0;
    this.timer = setInterval(() => {
      const callingStr = 'Calling';
      if (this.call && this.call.endResult) {
        connectionInfo.innerText = this.call.endResult;
        clearInterval(this.timer);
      } else if (!this.connected && this.call.caller.userId === localUser.userId) {
        connectionInfo.innerText = callingStr + '.'.repeat((tick % 3) + 1);
      } else if (this.connected) {
        const durationInSec = Math.floor(this.call.getDuration() / 1000);
        const minutes = `0${Math.floor(durationInSec / 60)}`.slice(-2);
        const seconds = `0${durationInSec % 60}`.slice(-2);
        connectionInfo.innerText = `${minutes}:${seconds}`;
      }

      tick += 1;
    }, 1000);

    this.sendToChildren(this.state);
  }

  addCallListeners(call) {
    call.onConnected = () => {
      this.connected = true;
      this.sendToChildren('connected');
    };

    call.onEnded = () => {
      this.sendToChildren('ended');
    };

    call.onRemoteAudioEnabled = (call) => {
      this.onRemoteMuted(call.isRemoteAudioEnabled);
    };
  }

  onRemoteMuted(isEnabled) {
    const peerStateDiv = this.element.querySelector('#peer_state');
    if (isEnabled) {
      replaceClassName(peerStateDiv, 'peer-state-div', 'peer-state-div-invisible');
    } else {
      replaceClassName(peerStateDiv, 'peer-state-div-invisible', 'peer-state-div');
    }
  }

  recvMessage(name, value) {
    switch (name) {
      case 'click_accept':
        this.accept();
        break;
      case 'click_end':
        this.end();
        break;
      case 'click_mute':
        this.toggleMute();
        break;
      case 'click_close':
        this.close();
        break;
      default:
        break;
    }
  }

  accept() {
    const callOption = getCallOption();

    this.call.accept(callOption).catch((e) => {
      alert(e);
    });
  }

  end() {
    this.call.end();
  }

  toggleMute() {
    if (this.call.isLocalAudioEnabled) {
      this.call.mute();
    } else {
      this.call.unmute();
    }
  }

  close() {
    this.end();
    clearInterval(this.timer);

    this.sendToParent('close', this.call);
  }
}

import BaseElement from "../components/BaseElement";
import { createAudio, createDiv, createImg, createLabel, createVideo } from "../utils/domUtil";
import { getCallOption } from "../utils/util";
import { hasClassName } from "../utils/domUtil";
import CallButtons from "./CallButtons";
import { classes } from "../css/styles.js";
import PeriodicJob from "../modules/periodicJob";

export default class CallView extends BaseElement {
  constructor({ call, state, args }) {
    super({ id: 'call_view', className: `${classes['column']} ${classes['center']} ${classes['view']} ${classes['viewCall']}`, args });

    this.call = call;
    this.state = state;
    this.connected = false;

    this.peerStateDiv = null;
    this.peerMuteIcon = null;
    this.peerMuteLabel = null;
    this.peerVideoMuteIcon = null;
    this.peerVideoMuteLabel = null;

    this.addCallListeners(call);
  }

  onLoaded() {
  }

  build() {
    const localUser = this.call.localUser;
    const remoteUser = this.call.remoteUser;

    this.peerProfile = createImg({
      src: remoteUser.profileUrl,
      alt: 'Sendbird voice & video call opponent profile photo',
      className: classes['remoteProfile'],
      onerror: (e) => e.target.style.visibility = 'hidden'
    });
    this.peerName = createLabel({ id: 'peer_name', innerText: remoteUser.userId, className: `${classes['peerName']} ${classes['fontBig']}` });

    let connectionText;
    if (this.call.isVideoCall) {
      connectionText = 'Incoming video call…';
    } else {
      connectionText = 'Incoming voice call…';
    }
    this.connectionInfo = createLabel({
      id: 'conn_info_label',
      className: `${classes['connectionInfo']} ${classes['fontNormal']}`,
      innerText: connectionText
    });

    this.peerStateDiv = createDiv({ id: 'peer_state', className: `${classes['column']} ${classes['peerStateDiv']} ${classes['invisible']}` });
    this.peerMuteIcon = createDiv({ id: 'peer_mute_icon', className: `${classes['peerMuteIcon']}` });
    this.peerMuteLabel = createLabel({ id: 'peer_mute_label', className: `${classes['peerMuteLabel']} ${classes['fontSmall']}`, innerText: `${remoteUser.userId} audio muted this call` });
    this.peerVideoMuteIcon = createDiv({ id: 'peer_video_mute_icon', className: `${classes['peerVideoMuteIcon']}` });
    this.peerVideoMuteLabel = createLabel({ id: 'peer_video_mute_label', className: `${classes['peerVideoMuteLabel']} ${classes['fontSmall']}`, innerText: 'The other person’s camera has been turned off.' });

    const buttons = new CallButtons({
      call: this.call
    });

    if (this.call.isVideoCall) {
      this.localMediaView = createVideo({ className: `${classes['videoView']}`, autoplay: true, muted: true, style: "background-color: #fff;" });
      this.remoteMediaView = createVideo({ className: `${classes['videoView']}`, autoplay: true, muted: false, remote: true });
    } else {
      this.localMediaView = createAudio({ autoplay: true, muted: true });
      this.remoteMediaView = createAudio({ autoplay: true, muted: false, remote: true });
    }

    this.localMediaViewDiv = createDiv({ className: `${classes['videoViewDiv']} ${classes['videoFull']}` });
    this.remoteMediaViewDiv = createDiv({ className: `${classes['videoViewDiv']} ${classes['videoHidden']}` });
    this.localMediaViewDiv.appendChild(this.localMediaView);
    this.remoteMediaViewDiv.appendChild(this.remoteMediaView);

    this.call.setLocalMediaView(this.localMediaView);
    this.call.setRemoteMediaView(this.remoteMediaView);

    const background = createDiv({ className: classes['callBackground'] });
    const foreground = createDiv({ className: `${classes['column']} ${classes['center']} ${classes['callForeground']}` });

    background.appendChild(this.remoteMediaViewDiv);
    background.appendChild(this.localMediaViewDiv);

    foreground.appendChild(this.peerProfile);
    foreground.appendChild(this.peerName);
    foreground.appendChild(this.connectionInfo);
    foreground.appendChild(this.peerStateDiv);

    this.element.appendChild(background);
    this.element.appendChild(foreground);

    buttons.appendToBaseElement(this);

    if (this.call.caller.userId === localUser.userId) {
      this.drawCallingText();
    }

    this.sendToChildren(this.state);
  }

  addCallListeners(call) {
    call.onConnected = () => {
      this.connected = true;
      this.drawCurrentTime();
      if (this.call.isVideoCall) {
        this.localMediaViewDiv.classList.remove(classes['videoFull']);
        this.localMediaViewDiv.classList.add(classes['videoSmall']);
        this.remoteMediaViewDiv.classList.remove(classes['videoHidden']);
        this.remoteMediaViewDiv.classList.add(classes['videoFull']);

        this.hideSecondaryInfo();
      }
      this.sendToChildren('connected');
    };

    call.onEnded = (endedCall) => {
      this.drawEndResult();
      if (endedCall.isVideoCall) {
        this.localMediaViewDiv.classList.add(classes['videoHidden']);
        this.remoteMediaViewDiv.classList.add(classes['videoHidden']);

        this.showSecondaryInfo();
      }

      console.log(endedCall.getCallLog);
      this.sendToChildren('ended');
    };

    call.onReconnected = () => {
      this.drawCurrentTime();
    };

    call.onReconnecting = () => {
      this.drawReconnectingText();
    };

    call.onRemoteAudioSettingsChanged = (call) => {
      this.onRemoteAudioMuted(call.isRemoteAudioEnabled);
    };

    call.onRemoteVideoSettingsChanged = (call) => {
      this.onRemoteVideoMuted(call.isRemoteVideoEnabled);
    };
  }

  onRemoteAudioMuted(isEnabled) {
    if (isEnabled) {
      if (!hasClassName(this.peerStateDiv, classes['invisible'])) {
        this.peerStateDiv.classList.add(classes['invisible']);
        this.peerStateDiv.removeChild(this.peerMuteIcon);
        this.peerStateDiv.removeChild(this.peerMuteLabel);  
      } else{
        this.peerStateDiv.removeChild(this.peerMuteIcon);
        this.peerStateDiv.removeChild(this.peerMuteLabel);  
      }
    } else {
      if (hasClassName(this.peerStateDiv, classes['invisible'])) {
        this.peerStateDiv.classList.remove(classes['invisible']);
        this.peerStateDiv.appendChild(this.peerMuteIcon);
        this.peerStateDiv.appendChild(this.peerMuteLabel);  
      } else {
        this.peerStateDiv.appendChild(this.peerMuteIcon);
        this.peerStateDiv.appendChild(this.peerMuteLabel);
      }
    }
  }

  onRemoteVideoMuted(isEnabled) {
    if (isEnabled) {
      this.remoteMediaViewDiv.classList.remove(classes['videoHidden']);
      if (!hasClassName(this.peerStateDiv, classes['invisible'])) {
        this.peerStateDiv.classList.add(classes['invisible']);
        this.peerStateDiv.removeChild(this.peerVideoMuteIcon);
        this.peerStateDiv.removeChild(this.peerVideoMuteLabel);  
      } else{
        this.peerStateDiv.removeChild(this.peerVideoMuteIcon);
        this.peerStateDiv.removeChild(this.peerVideoMuteLabel);  
      }
    } else {
      this.remoteMediaViewDiv.classList.add(classes['videoHidden']);
      if (hasClassName(this.peerStateDiv, classes['invisible'])) {
        this.peerStateDiv.classList.remove(classes['invisible']);
        this.peerStateDiv.appendChild(this.peerVideoMuteIcon);
        this.peerStateDiv.appendChild(this.peerVideoMuteLabel);  
      } else{
        this.peerStateDiv.appendChild(this.peerVideoMuteIcon);
        this.peerStateDiv.appendChild(this.peerVideoMuteLabel);  
      }
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
      case 'click_video':
        this.toggleVideo();
        break;
      case 'click_close':
        this.close();
        break;
      default:
        break;
    }
  }

  accept() {
    const callOption = getCallOption({
      localMediaView: this.localMediaView,
      remoteMediaView: this.remoteMediaView,
      audioEnabled: this.call.isLocalAudioEnabled,
      videoEnabled: this.call.isLocalVideoEnabled
    });

    this.call.accept({ callOption: callOption });
  }

  end() {
    this.call.end();
  }

  toggleMute() {
    if (this.call.isLocalAudioEnabled) {
      this.call.muteMicrophone();
    } else {
      this.call.unmuteMicrophone();
    }
  }

  toggleVideo() {
    if (this.call.isLocalVideoEnabled) {
      this.call.stopVideo();
    } else {
      this.call.startVideo();
    }
  }

  close() {
    this.end();
    this.removeConnectionInfoDrawer();

    this.sendToParent('close', this.call);
  }

  drawCallingText() {
    this.removeConnectionInfoDrawer();
    const rotatingTexts = ['Calling', 'Calling.', 'Calling..'];
    let frame = 0;
    this.connectionInfoDrawer = new PeriodicJob(() => {
      this.connectionInfo.innerText = rotatingTexts[frame];
      frame = (frame + 1) % rotatingTexts.length;
    }).start();
  }

  drawReconnectingText() {
    this.removeConnectionInfoDrawer();
    const rotatingTexts = ['Reconnecting', 'Reconnecting.', 'Reconnecting..'];
    let frame = 0;
    this.connectionInfoDrawer = new PeriodicJob(() => {
      this.connectionInfo.innerText = rotatingTexts[frame];
      frame = (frame + 1) % rotatingTexts.length;
    }).start();
  }

  drawCurrentTime() {
    this.removeConnectionInfoDrawer();
    this.connectionInfoDrawer = new PeriodicJob(() => {
      const durationInSec = Math.floor(this.call.getDuration() / 1000);
      const minutes = `0${Math.floor(durationInSec / 60)}`.slice(-2);
      const seconds = `0${durationInSec % 60}`.slice(-2);
      this.connectionInfo.innerText = `${minutes}:${seconds}`;
    }).start();
  }

  drawEndResult() {
    this.removeConnectionInfoDrawer();
    this.connectionInfo.innerText = this.call.endResult;
  }

  removeConnectionInfoDrawer() {
    if (this.connectionInfoDrawer) {
      this.connectionInfoDrawer.stop();
      this.connectionInfoDrawer = null;
    }
    this.connectionInfo.innerText = '';
  }

  hideSecondaryInfo() {
    this.peerProfile.classList.add(classes['invisible']);
    this.peerName.classList.add(classes['invisible']);
    this.connectionInfo.classList.add(classes['invisible']);
  }

  showSecondaryInfo() {
    this.peerProfile.classList.remove(classes['invisible']);
    this.peerName.classList.remove(classes['invisible']);
    this.connectionInfo.classList.remove(classes['invisible']);
  }
}

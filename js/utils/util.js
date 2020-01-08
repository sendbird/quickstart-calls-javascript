export function getCallOption() {
  return {
    localMediaView: null,
    remoteMediaView: document.getElementById('remote-audio-view'),
    videoEnabled: false,
    audioEnabled: true,
    videoWidth: 320,
    videoHeight: 320,
    videoFps: 30,
    frontCamera: false
  }
}

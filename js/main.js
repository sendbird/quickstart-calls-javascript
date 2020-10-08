import "../css/main.css";
import MainApp from "../lib/components/MainApp";
import DialView from "../lib/views/DialView";
import CallView from "../lib/views/CallView";
import LoginView from "../lib/views/LoginView";
import CallLogView from "../lib/views/CallLogView";
import { ACCESS_TOKEN, IS_ACCESS_TOKEN_NEEDED, TEST_APP_ID, USER_ID } from "../envs";

function onLoadedHandler() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  let args = {};
  if (query) {
    try {
      args = JSON.parse(atob(query));
    } catch(e) {}
  }

  const app = new MainApp({
    id: 'main_app',
    pages: {
      'index': LoginView,
      'login_view': LoginView,
      'dial_view': DialView,
      'call_view': CallView,
      'calllog_view': CallLogView
    },
    styles: {},
    args: {
      appId: args.app_id || TEST_APP_ID,
      userId: args.user_id || USER_ID,
      accessToken: args.access_token || ACCESS_TOKEN,
      isAccessTokenNeeded: IS_ACCESS_TOKEN_NEEDED,
    }
  });

  const container = document.querySelector('#container');
  app.appendToHTML(container);
}

document.addEventListener('DOMContentLoaded', onLoadedHandler);

import "../css/main.css";
import MainApp from "../lib/components/MainApp";
import DialView from "../lib/views/DialView";
import CallView from "../lib/views/CallView";
import LoginView from "../lib/views/LoginView";
import { ACCESS_TOKEN, IS_ACCESS_TOKEN_NEEDED, TEST_APP_ID, USER_ID } from "../envs";

function onLoadedHandler() {
  const app = new MainApp({
    id: 'main_app',
    pages: {
      'index': LoginView,
      'login_view': LoginView,
      'dial_view': DialView,
      'call_view': CallView
    },
    styles: {},
    args: {
      appId: TEST_APP_ID,
      userId: USER_ID,
      accessToken: ACCESS_TOKEN,
      isAccessTokenNeeded: IS_ACCESS_TOKEN_NEEDED,
    }
  });

  const container = document.querySelector('#container');
  app.appendToHTML(container);
}

document.addEventListener('DOMContentLoaded', onLoadedHandler);

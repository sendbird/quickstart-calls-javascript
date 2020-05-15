import "../css/main.css";
import LoginView from "../lib/views/LoginView";
import CallView from "../lib/views/CallView";
import DialView from "../lib/views/DialView";
import CallLogView from "../lib/views/CallLogView";
import { TEST_APP_ID, USER_ID, ACCESS_TOKEN, IS_ACCESS_TOKEN_NEEDED } from "../envs.js";
import WidgetApp from "../lib/components/WidgetApp";

function onLoadedHandler() {
  const widgetDiv = document.querySelector('#widget');
  const app = new WidgetApp({
    id: 'widget_app',
    pages: {
      'index': LoginView,
      'login_view': LoginView,
      'dial_view': DialView,
      'call_view': CallView,
      'calllog_view': CallLogView
    },
    styles: {
    },
    args: {
      appId: TEST_APP_ID,
      userId: USER_ID,
      accessToken: ACCESS_TOKEN,
      isAccessTokenNeeded: IS_ACCESS_TOKEN_NEEDED
    }
  });
  app.appendToHTML(widgetDiv);
}

document.addEventListener('DOMContentLoaded', onLoadedHandler);

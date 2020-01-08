import "../../css/main.css";
import MainApp from "../MainApp";
import LoginView from "../views/LoginView";
import CallView from "../views/CallView";
import WidgetDialView from "../views/WidgetDialView";
import { TEST_APP_ID, USER_ID, ACCESS_TOKEN, IS_ACCESS_TOKEN_NEEDED } from "../../envs.js";

function onLoadedHandler() {
  const widgetIcon = document.querySelector('#widget_icon');
  const widgetDiv = document.querySelector('#widget_div');

  const isWidgetOpened = () => {
    return !(widgetDiv.classList.contains('widget-div-hidden'));
  };

  const expandWidget = () => {
    const widgetTooltip = document.querySelector('#widget_tooltip');
    if (widgetTooltip) {
      widgetTooltip.parentElement.removeChild(widgetTooltip);
    }

    widgetDiv.className = 'widget-div';
  };

  const collapseWidget = () => {
    widgetDiv.className = 'widget-div-hidden';
  };

  widgetIcon.onclick = () => {
    const widgetIcon = document.querySelector('#widget_icon');
    const isOpened = isWidgetOpened();

    if (isOpened) {
      collapseWidget();
      widgetIcon.className = 'widget-open-icon';
    } else {
      expandWidget();
      widgetIcon.className = 'widget-close-icon';
    }
  };

  widgetDiv.addEventListener('widgetringing', () => {
    if (!isWidgetOpened()) expandWidget();
  });

  const app = new MainApp({
    id: 'main_app',
    className: 'container center bg-light',
    pages: {
      'index': LoginView,
      'login_view': LoginView,
      'dial_view': WidgetDialView,
      'call_view': CallView
    },
    eventTarget: widgetDiv,
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

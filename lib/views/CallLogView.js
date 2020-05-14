import SendBirdCall from "sendbird-calls";
import BaseElement from "../components/BaseElement";
import { classes } from "../css/styles.js";
import { createList, createDiv } from "../utils/domUtil";
import { CallLogItem } from "./CallLogItem";

export default class CallLogView extends BaseElement{
  constructor({ args }) {
    super({
      id: 'calllog_view',
      className: `${classes['container']} ${classes['center']} ${classes['viewDial']}`,
      args
    });

    this.callLogQuery = null;
    this.callLogQueryData = [];
    this.args = args;
  }

  build() {
    const callLogList = createList({ id: 'call_log_list', className: `${classes['callLogListContainer']}` });
    this.callLogQuery = SendBirdCall.createDirectCallLogListQuery({ limit: 30 });
    this.getCallLogs(callLogList);
    callLogList.onscroll = (e) => {
      let scrollposition = e.target.scrollHeight - e.target.clientHeight;
      if(scrollposition === e.target.scrollTop) {
        this.getCallLogs(callLogList);
      }
    };

    if(this.args.isWidget) {
      callLogList.classList.add(classes['widgetCallLog']);
      this.element.appendChild(callLogList);
    }
    else{
      const callLogDescription = createDiv({ id: 'call_log_desc', className: `${classes['callLogListDesc']}` });
      const callLogDescLogo = createDiv({ className: `${classes['callLogDescLogo']}` });
      const callLogDescTitle = createDiv({ innerText: 'Sendbird Calls Quickstart', className: `${classes['callLogDescTitle']} ${classes['font24']} ${classes['fontDemi']}` });
      const callLogDescLabel = createDiv({ innerText: 'This is the Sendbird Calls Quickstart page. Lorem ipsum', className: `${classes['callLogDescLabel']} ${classes['fontNormal']} ${classes['fontHeavy']}` });
      callLogDescription.appendChild(callLogDescLogo);
      callLogDescription.appendChild(callLogDescTitle);
      callLogDescription.appendChild(callLogDescLabel);

      this.element.appendChild(callLogList);
      this.element.appendChild(callLogDescription);
    }
  }

  getCallLogs(element){
    if(this.callLogQuery.hasNext && !this.callLogQuery.isLoading) {
      this.callLogQuery.next((directCallLog) => {
        if(directCallLog){
          if(directCallLog.length > 0) {
            for( let i = 0; i < directCallLog.length; i++ ){
              let callItem = null;
              if(i === 0){
                callItem = new CallLogItem({ callLogInfo: directCallLog[i], className: `${classes['callLogItemWrap']}` });
              } else {
                callItem = new CallLogItem({ callLogInfo: directCallLog[i], className: `${classes['callLogItemWrap']} ${classes['callLogItemWarpBorder']}` }); 
              }
              callItem.onclick = (event, args) => {
                this.sendToParent('dial', args);              
              };

              element.appendChild(callItem.element);
            }
          }
          else{
            // empty call log
            const emptyCallLog = new CallLogItem({ className: `${classes['callLogEmptyWrap']}` });
            element.appendChild(emptyCallLog.element);
          }
        }
      });
    }
  }
}
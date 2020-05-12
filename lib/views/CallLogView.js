import SendBirdCall from "sendbird-calls";
import BaseElement from "../components/BaseElement";
import { classes } from "../css/styles.js";
import { createList } from "../utils/domUtil";
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
    }

    build() {
        const callLogList = createList({ id: 'call_log_list', className: `${classes['callLogListContainer']}` });
        this.callLogQuery = SendBirdCall.createDirectCallLogListQuery({limit: 30});
        this.getCallLogs(callLogList);
        callLogList.onscroll = (e) => {
            let scrollposition = e.target.scrollHeight - e.target.clientHeight;
            
            if( scrollposition === e.target.scrollTop ) {
                this.getCallLogs(callLogList);
            }
        };
        this.element.appendChild(callLogList);
    }

    getCallLogs(element){
        if(this.callLogQuery.hasNext && !this.callLogQuery.isLoading) {
            this.callLogQuery.next((directCallLog) => {
                if(directCallLog){
                    for(let i = 0; i < directCallLog.length; i++){
                        let callItem = null;
                        if( i === 0 ){
                            callItem = new CallLogItem({callLogInfo: directCallLog[i], className: `${classes['callLogItemWrap']}`});
                        }
                        else {
                            callItem = new CallLogItem({callLogInfo: directCallLog[i], className: `${classes['callLogItemWrap']} ${classes['callLogItemWarpBorder']}`}); 
                        }
                        callItem.onclick = (event, args) => {
                            this.sendToParent('dial', args);              
                        };

                        element.appendChild(callItem.element);
                    }
                }                
            });
        }
    }
}
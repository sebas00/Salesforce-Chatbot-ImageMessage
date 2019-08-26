import BaseChatMessage from 'lightningsnapin/baseChatMessage';
import { track } from 'lwc';

const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];


/**
 * Displays a chat message using the inherited api messageContent and is styled based on the inherited api userType and messageContent api objects passed in from BaseChatMessage.
 */
export default class ChatMessageDefaultUI extends BaseChatMessage {
    @track messageStyle = '';
    @track mcontent = '';
    @track flowname = '';
    @track msgtxt = ''
    @track hasimg = false;
    @track hasflow = false;
    isSupportedUserType(userType) {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    connectedCallback() {
        this.msgtxt = this.messageContent.value;
        if(this.messageContent.value.startsWith("image:")){
            this.hasimg = true;
            //this.mcontent.sub
        this.conts = this.messageContent.value.split("'");
        this.mcontent = this.conts[1];
        //this.mcontent = this.mcontent.replace('</a>', '')
        this.msgtxt = ' ';
        //this.messageContent.value = 'image';
        }
        if(this.messageContent.value.startsWith("flow:")){
            this.hasflow = true;
            //this.mcontent.sub
        this.conts = this.messageContent.value.split(":");
        
        this.flowurl = unescape(this.conts[1]).replace(/&amp;/g, '&');
        this.flowname = '/help/s/flowcomponent?flowName=' + this.flowurl;
        console.log('flowname2', this.flowname);
        //this.mcontent = this.mcontent.replace('</a>', '')
        this.msgtxt = ' ';
        //this.messageContent.value = 'image';
        }
        //this.mcontent = JSON.stringify(this.messageContent);
        if (this.isSupportedUserType(this.userType)) {
            this.messageStyle = `${CHAT_CONTENT_CLASS} ${this.userType}`;
        } else {
            throw new Error(`Unsupported user type passed in: ${this.userType}`);
        }
    }
}
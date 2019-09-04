import BaseChatMessage from 'lightningsnapin/baseChatMessage';
//import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import { track } from 'lwc';

const CHAT_CONTENT_CLASS = 'chat-content';
const AGENT_USER_TYPE = 'agent';
const CHASITOR_USER_TYPE = 'chasitor';
const SUPPORTED_USER_TYPES = [AGENT_USER_TYPE, CHASITOR_USER_TYPE];


/**
 * Displays a chat message using the inherited api messageContent and is styled based on the inherited api userType and messageContent api objects passed in from BaseChatMessage.
 */
export default class ChatMessageDefaultUI extends NavigationMixin(BaseChatMessage) {
    @track messageStyle = '';
    @track mcontent = '';
    @track flowname = '';
    @track msgtxt = ''
    @track hasimg = false;
    @track hasflow = false;

/*
{
    type: 'comm__namedPage',
    attributes: {
        pageName: 'home'
    }
}
*/
    navigatePage(pageName) {
        this.hasdirected = sessionStorage.getItem(pageName);
        console.log('hasdirected', this.hasdirected);
        if(this.hasdirected){
            console.log('already went here');
            return;
        }
        sessionStorage.setItem(pageName, true);
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                pageName: pageName
            }
        });
    }
    navigateArticle(url) {
        this.hasdirected = sessionStorage.getItem(url);
        console.log('hasdirected', this.hasdirected);
        if(this.hasdirected){
            console.log('already went here');
            return;
        }
        sessionStorage.setItem(url, true);
        this[NavigationMixin.Navigate]({
            type: 'standard__knowledgeArticlePage',
            attributes: {
                articleType: 'article',
                urlName: url
            }
        });
    }
    navigateRecord(recordId) {
        this.hasdirected = sessionStorage.getItem(recordId);
        console.log('hasdirected', this.hasdirected);
        if(this.hasdirected){
            console.log('already went here');
            return;
        }
        sessionStorage.setItem(recordId, true);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view'
            }
     
        });
    }

    isSupportedUserType(userType) {
        return SUPPORTED_USER_TYPES.some((supportedUserType) => supportedUserType === userType);
    }

    connectedCallback() {
       // console.log('cookies', document.cookie);
        this.msgtxt = this.messageContent.value;
        if(this.messageContent.value.startsWith("clearCache")){
            //console.log('redirect');
            sessionStorage.clear();
        }
        if(this.messageContent.value.startsWith("article:")){
            //console.log('redirect');
            this.conts = this.messageContent.value.split(":");
            console.log('redirect article', this.conts[1]);
            this.navigateArticle(this.conts[1]);
            this.msgtxt = '';
            this.hidden = true;
            
    }
    if(this.messageContent.value.startsWith("record:")){
        //console.log('redirect');
        this.conts = this.messageContent.value.split(":");
        this.navigateRecord(this.conts[1]);
        this.msgtxt = '';
        
        this.hidden = true;
        
}

        if(this.messageContent.value.startsWith("page:")){
            // console.log('redirect page');
            this.conts = this.messageContent.value.split(":");
            console.log('redirect page', this.conts[1]);
            this.navigatePage(this.conts[1]);
            this.msgtxt = '';
            this.hidden = true;
            
    }
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
        this.comm = window.location.pathname.split('/')[1];
        if(this.comm === 's'){
            this.comm = '';
        } else {
            this.comm = '/' + this.comm;
        }
        this.flowname =   this.comm + '/s/flowcomponent?flowName=' + this.flowurl;
       // console.log('flowname2', this.flowname);
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
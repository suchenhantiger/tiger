import LocalLoading from '../common/loading/LocalLoading';
import {EVENT_PAGE_LOADING} from '../../store/actions';

const Event_ShowModuleIntro = "Event_ShowModuleIntro";//触发模块引导页
const Event_ShowPwdPop = "Event_ShowPwdPop";//触发强制密码修改窗口
const Event_ShowLoginErrPop = "Event_ShowLoginErrPop";//触发登录异常修改窗口

class PageComponent extends PureComponent {
    //构造函数，创建请求清单
    constructor(props,context) {
        super(props,context);
        this._page_cnt = 0;
        Event.register(EVENT_PAGE_LOADING+this.getPageId(), this._changeLoading);
    }

    componentDidMount(){
        //记录页面进入
        Client.trackPageBegin(this.getPageName());
        Event.fire(Event_ShowModuleIntro);
        Event.fire(Event_ShowPwdPop);
        Event.fire(Event_ShowLoginErrPop);
    }

    getPageId(){
        return "";
    }

    getPageName(){
        try{
            return this.__proto__.constructor.name;
        }catch(e){
            return "无名";
        }
    }

    componentWillUnmount(){
        //记录页面离开
        Client.trackPageEnd(this.getPageName());
        Event.unregister(EVENT_PAGE_LOADING+this.getPageId(), this._changeLoading);
        super.componentWillUnmount();
    }

    _changeLoading = (status)=>{
        if(status){
            this._page_cnt++;
            this.setState({_page_loading_:status});
        }
        else{
            if(--this._page_cnt == 0){
                this.setState({_page_loading_:false});
            }
        }

    }

    renderLoading(){
        var {_page_loading_} = this.state;
        return _page_loading_?<LocalLoading/>:null;
    }

}

module.exports = PageComponent;

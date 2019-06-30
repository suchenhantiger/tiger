import AppHeader from '../../../../components/common/appheader/AppHeader';
import LazyLoad from '../../../../components/common/subtabs/LazyLoad';
import ClassifyFrame from '../../components/documentary/ClassifyFrame';
import MultipleFrame from '../../components/documentary/MultipleFrame';


import styles from './css/documentaryPage.less';

/********跟单主页*********/
class DocumentaryPage extends PageComponent{

    constructor(props,context) {
        super(props,context);
        this.state = {
            index:0,
            mulIndex:0
        }
    }
    
    componentDidMount(){
        document.addEventListener("backbutton", this.onBackKeyDown, false);
        this.sendWS();
    }


sendWS=()=>{
    
            if(!WebSocketUtil.isValid()){
                    //进入自选股开始推送，离开时关闭推送
                    var reqStr = "0";
                    WebSocketUtil.onOpen=()=>{
                        console.log("----open-----");
    
                      //  WebSocketUtil.send(reqStr)            
                    };
                    
                    WebSocketUtil.onClose=()=>{
                  //  console.log("WebSocketClosed!");
                    };
                    WebSocketUtil.onMessage=(wsData)=>{
                    //   console.log("sch optList ws new data");
                
                    };
                    WebSocketUtil.onError=(evt)=>{
                    console.log("WebSocketError!");
                    };
                    WebSocketUtil.send(reqStr)

            }else{
    
            }
        }
    componentWillUnmount(){
        document.removeEventListener("backbutton", this.onBackKeyDown, false);
        super.componentWillUnmount();
    }

    onBackKeyDown = ()=>{
        var hash = this.getHashPath();

        if(hash != '/work/documentary'){
            hashHistory.goBack();
        }
        else{
            if(systemApi.getDeviceMessage().isAndroid){
                Client.backForAndroid();
            }
        }
    }

      //获取页面名称
    getPageName(){ return "跟单主页"; }

    tabChange = (index) => () => {
        this.setState({ index });
    }

    renderHeader() {
        var { index } = this.state;
        return (
            <div className={styles.tabs}>
                <span className={this.mergeClassName(styles.item, index == 0 ? styles.on : "")} onClick={this.tabChange(0)}>{McIntl.message("top")} <i></i></span>
                <span className={this.mergeClassName(styles.item, index == 1 ? styles.on : "")} onClick={this.tabChange(1)}>{McIntl.message("all")} <i></i></span>
            </div>
        )
    }
    gotoMultipleFrame=(mulIndex)=>{
        this.setState({index:1,mulIndex});


    }

    render(){
        systemApi.log("DocumentaryPage render");

        var {index,mulIndex} = this.state;

        return (
            <div>
                <AppHeader headerName={this.renderHeader()} showBack={false}/>
                <Content scroll={true} coverBottom={false}>
                    <LazyLoad index={index}>
                        <ClassifyFrame mulFrame = {this.gotoMultipleFrame}/>
                        <MultipleFrame index={mulIndex}/>
                    </LazyLoad>
                </Content>
                {this.props.children}
            </div>
        );
    }

}


module.exports = DocumentaryPage;

import {updateToken} from '../../../work/actions/login/loginAction';

import {getAppConfig,showUpdateDialog,showConfirmWithCb} from '../../../../store/actions';
import { connect } from 'react-redux';
import styles from './welcome.less';
/********我的主页*********/
class WelcomePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
        this.state={
            loadingMsg:"loading..."
        }
        this._Interval=null;
        this._errorNum = 0;
    }

    beginInterval =()=>{
        this._errorNum++;
        if(this._errorNum>3){
            this.clearThisInterval();
            this.props.showConfirmWithCb("检查线路中，正在自动选择最优线路，请稍等...",()=>{
                this._errorNum = 0;
                this.beginInterval();
                this._Interval = setInterval(this.beginInterval,8000);
            });
            return;
        }
        systemApi.log("sch beginInterval");
        if(!updateflag){
         
            let rootIp1 = "";
            let rootIp2 = "";
            let rootIp3 = "";
            var returnflag=false;
            var errorNum = 0;
            if(TestEnvironment){

                rootIp1 = "47.244.91.80";
                rootIp2 = "47.103.201.234";
                rootIp3 = "47.101.164.147";

            // this.props.getAppConfig(this,"http://"+rootIp1+":8088/mcAppServer/mcapp/",(data)=>{
            //     updateflag=true;
            //     if(!returnflag){
            //         systemApi.log("sch choose1:"+rootIp1);
            //         returnflag = true;
            //         this.clearThisInterval();
            //         this.setRootIp(rootIp1,()=>{
            //             this.props.showUpdateDialog(data);
            //             this.updateTokenFunc();
            //         });
            //     }
                
            // },()=>{
           
            //    // this.setState({loadingMsg:"初始化失败，请重启大家汇"});
            // });

            this.props.getAppConfig(this,"http://"+rootIp2+":8088/mcAppServer/mcapp/",(data)=>{
                updateflag=true;
                if(!returnflag){
                     systemApi.log("sch choose2:"+rootIp2);
                     this.clearThisInterval();
                    returnflag = true;
                    this.setRootIp(rootIp2,()=>{
                        this.props.showUpdateDialog(data);
                        this.updateTokenFunc();
                    });
                }
                
            },()=>{
                //this.setState({loadingMsg:"初始化失败，请重启大家汇"});
 
            });

            this.props.getAppConfig(this,"http://"+rootIp3+":8088/mcAppServer/mcapp/",(data)=>{
                updateflag=true;
                if(!returnflag){
                    this.clearThisInterval();
                    returnflag = true;
                    systemApi.log("sch choose3:"+rootIp3);
                    this.setRootIp(rootIp3,()=>{this.props.showUpdateDialog(data);

                        this.updateTokenFunc();
                    });
                }
                
            },()=>{
                //this.setState({loadingMsg:"初始化失败，请重启大家汇"});

            });




            }else{
                rootIp1 = "180.235.135.206";
                rootIp2 = "";
                rootIp3 = "";

            this.props.getAppConfig(this,"http://"+rootIp1+":8088/mcAppServer/mcapp/",(data)=>{
                updateflag=true;
                if(!returnflag){
                    this.clearThisInterval();
                    systemApi.log("sch choose1:"+rootIp1);
                    returnflag = true;
                    this.setRootIp(rootIp1,()=>{
                        this.props.showUpdateDialog(data);
                        this.updateTokenFunc();
                    });
                }
                
            },()=>{
                
               // this.setState({loadingMsg:"初始化失败，请重启大家汇"});
            });

            // this.props.getAppConfig(this,"http://"+rootIp2+":8088/mcAppServer/mcapp/",(data)=>{
            //     if(!returnflag){
            //          systemApi.log("sch choose2:"+rootIp2);
                    
            //         returnflag = true;
            //         this.setRootIp(rootIp2,()=>{
            //             this.props.showUpdateDialog(data);
            //             this.updateTokenFunc();
            //         });
            //     }
                
            // },()=>{
            //     //this.setState({loadingMsg:"初始化失败，请重启大家汇"});
            // });

            // this.props.getAppConfig(this,"http://"+rootIp3+":8088/mcAppServer/mcapp/",(data)=>{
            //     if(!returnflag){
            //         returnflag = true;
            //         systemApi.log("sch choose3:"+rootIp3);
            //         this.setRootIp(rootIp3,()=>{this.props.showUpdateDialog(data);

            //             this.updateTokenFunc();
            //         });
            //     }
                
            // },()=>{
            //     //this.setState({loadingMsg:"初始化失败，请重启大家汇"});
            // });





            }


        }
    }

    clearThisInterval=()=>{
        if(this._Interval){
            systemApi.log("sch clear _Interval");
             clearInterval(this._Interval);
             this._Interval=null;
        }
    }

    componentDidMount(){
        this.beginInterval();
        this._Interval = setInterval(this.beginInterval,8000);

    }
    componentWillUnmount(){
        this.clearThisInterval();
           
        super.componentWillUnmount();

    }

    setRootIp=(rootIP,cb)=>{
            systemApi.setValue("rootUrl","http://"+rootIP+":8088/mcAppServer/mcapp/");
            systemApi.setValue("websocketUrl","ws://"+rootIP+":8086"); 
            cb && cb();
    }

    updateTokenFunc=()=>{
        var tigertoken = systemApi.getValue("tigertoken");
        if(tigertoken  && tigertoken.length>0){
            this.props.updateToken(this,()=>{
                hashHistory.push("/work");
            },()=>{
                hashHistory.push("/login");
            });
            
        }else{
            hashHistory.push("/login");
        }
    }


    render() {
        systemApi.log("WelcomePage render");
        var {loadingMsg} = this.state;

        return (
            <div style={{    marginTop: "5rem",textAlign: "center"}} className={"font36"}>
                <img src="./images/logo.png" />
                <div className={styles.isAnimate+" "+styles.style1}>
                    <div>L</div>
                    <div>o</div>
                    <div>a</div>
                    <div>d</div>
                    <div>i</div>
                    <div>n</div>
                    <div>g</div>
                    <div>...</div>
                </div>

            </div>
        );
    }

}

function injectAction() {
    return { updateToken ,getAppConfig,showUpdateDialog,showConfirmWithCb};
}

module.exports = connect(null, injectAction())(WelcomePage);

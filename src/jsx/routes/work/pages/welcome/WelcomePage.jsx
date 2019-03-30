import {updateToken} from '../../../work/actions/login/loginAction';
import { connect } from 'react-redux';
/********我的主页*********/
class WelcomePage extends PageComponent {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount(){

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

        return (
            <div style={{    marginTop: "5rem",textAlign: "center"}}>
                loading...

            </div>
        );
    }

}

function injectAction() {
    return { updateToken };
}

module.exports = connect(null, injectAction())(WelcomePage);

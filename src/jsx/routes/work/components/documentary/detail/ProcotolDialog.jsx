import Confirm from '../../../../../components/common/popup/Confirm2';
import InputFormate2 from "../../optional/detail/InputFormate2"
import styles from './css/copyDialog.less';
import { connect } from 'react-redux';
import { querySinglePage } from '../../../actions/documentary/documentaryAction';
class ProcotolDialog extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            data:{}
        }
    }

    componentDidMount(){
        this.props.querySinglePage(this,{pageCode:"COPY_PROTOCOL"},(data)=>{
            console.log(data);
            this.setState({data});
            });
    }


    onSure = ()=>{
        setTimeout(()=>{
            var {onSure} = this.props;
            onSure && onSure();
        },50);


    }

    numChange = (num)=>{
        this.setState({num});
    }


    //渲染函数
    render(){

        var {onCancel, followName} = this.props,
            {data} = this.state;
            var {pagetitle,
                pagecode,
                htmltext
                }=data;

console.log();
        return(
            <Confirm sureText={"同意"} onSure={this.onSure} onCancel={onCancel}>
                <div>
                <p className="font26 mg-bt-20 mg-tp-20 c1 line-ht-36">{pagetitle}</p>
                <div style={{height:"3rem",overflow: "scroll"}} dangerouslySetInnerHTML={{__html:htmltext} } >

                </div>

                </div>
            </Confirm>
        );
    }

}
function injectAction() {
    return { querySinglePage };
}

module.exports = connect(null, injectAction())(ProcotolDialog);

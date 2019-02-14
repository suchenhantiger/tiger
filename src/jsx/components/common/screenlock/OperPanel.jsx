import styles from '../../../../css/components/common/screenlock/operPanel.css';

class OperPanel extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            opacity:false
        }
    }

    backClick(){
        this.props.backClick();
    }

    buttonTouchStart(){
        this.setState({
            opacity:true
        })
    }

    buttonTouchEnd(){
        this.setState({
            opacity:false
        })
    }

    renderButton(){
        var {showDel,delClick} = this.props,
            {opacity} = this.state,
            btnCls = styles.opBtn + " " + (opacity?styles.opacity:"");

        if(showDel){
            return(<div className={btnCls}
                        onTouchTap={delClick}
                        onTouchStart={this.buttonTouchStart.bind(this)}
                        onTouchEnd={this.buttonTouchEnd.bind(this)}
                    >删除</div>)
        }
        else{
            return(<div className={btnCls}
                        onClick={this.backClick.bind(this)}
                    >返回</div>)
        }
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("OperPanel render");

        return(
            <div className={styles.opPanel}>
                {this.renderButton()}
            </div>
        );
    }


}

module.exports = OperPanel;

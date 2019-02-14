import PwdDot from './pwdDot';

import styles from '../../../../css/components/common/screenlock/pwdPanel.css';

class PwdPanel extends PureComponent{

    //默认属性值
    static defaultProps = {
        length:0,
        total:4
    };

    //构造函数
    constructor(props) {
        super(props);
    }

    renderDot(){
        var list = [],
            {length,total} = this.props;

        for(var i=0;i<total;i++){
            list.push(<PwdDot key={i} select={i<length}/>);
        }
        return list;
    }

    shake(cb){
        var {dotList} = this.refs,
            jqDotList = $(dotList);
        jqDotList.addClass(styles.shake);
        setTimeout(()=>{
            jqDotList.removeClass(styles.shake);
            if(cb) cb();
        },400);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("PwdPanel render");

        return(
            <div className={styles.pwdFrame}>
                <div className={styles.pwdText}>输入密码</div>
                <div className={styles.pwdListBox}>
                    <div className={styles.pwdDotList} ref="dotList">
                        {this.renderDot()}
                    </div>
                </div>

            </div>
        );
    }


}

module.exports = PwdPanel;

import FullScreenView from '../../../../components/common/fullscreen/FullScreenView';

import styles from './css/operationSelect.less';

class OperationSelect extends PureComponent {

    //构造函数
    constructor(props) {
        super(props);

    }

    chooseLocal=()=>{
        var {tranImg,cancel,cbid}=this.props;
        cancel && cancel();
        Client.getPicture(2,(imgstr)=>{
                tranImg && tranImg(cbid,imgstr);
    
        },()=>{
        
        });



    }

    takePic=()=>{
        var {tranImg,cancel,cbid}=this.props;
        cancel && cancel();
        Client.getPicture(1,(imgstr)=>{
                tranImg && tranImg(cbid,imgstr);
      
        },()=>{
           
        });

    }

    cancel=()=>{
        var {cancel}=this.props;
        cancel && cancel();
    }

    

    


    //渲染函数
    render() {

        // var {cbid  } = this.props;

        return (
            <FullScreenView mask={true}>
                 <div className={styles.bottom_btn_fixed}>
                    <div className={styles.login_btn} onClick={this.chooseLocal}>
                    从相册选择
                    </div>
                    <div className={styles.login_btn} onClick={this.takePic}>
                    拍摄
                    </div>
                    <div className={styles.red+" "+styles.login_btn} onClick={this.cancel}>
                    取消
                    </div>
                </div>
            </FullScreenView>
        );
    }

}


module.exports = OperationSelect;

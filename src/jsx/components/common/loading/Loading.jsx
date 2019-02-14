import FullScreenView from '../fullscreen/FullScreenView';

import styles from './css/loading.css';

class Loading extends PureComponent{

    //构造函数
    constructor(props,context) {
        super(props,context);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("Loading render");

        return(
            <FullScreenView transparent={true}>
                <div className={styles.frame}>
                    <div className={styles.loading}></div>
                </div>
            </FullScreenView>
        );
    }


}

module.exports = Loading;

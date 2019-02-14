import NumButton from './NumButton';

import styles from '../../../../css/components/common/screenlock/buttonPanel.css';

class ButtonPanel extends PureComponent{

    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render(){
        //打印渲染日志，必写
        systemApi.log("ButtonPanel render");

        var {text,onButtonClick} = this.props;

        return(
            <div>
                <div className={styles.btnList}>
                    <NumButton text={1} onClick={onButtonClick} />
                    <NumButton text={2} onClick={onButtonClick} />
                    <NumButton text={3} onClick={onButtonClick} />
                </div>
                <div className={styles.btnList}>
                    <NumButton text={4} onClick={onButtonClick} />
                    <NumButton text={5} onClick={onButtonClick} />
                    <NumButton text={6} onClick={onButtonClick} />
                </div>
                <div className={styles.btnList}>
                    <NumButton text={7} onClick={onButtonClick} />
                    <NumButton text={8} onClick={onButtonClick} />
                    <NumButton text={9} onClick={onButtonClick} />
                </div>
                <div className={styles.btnList}>
                    <NumButton text={0} onClick={onButtonClick} />
                </div>
            </div>
        );
    }


}

module.exports = ButtonPanel;

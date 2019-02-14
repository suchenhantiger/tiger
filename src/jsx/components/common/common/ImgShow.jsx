import styles from './css/imgshow.css';
import FullScreenView from '../fullscreen/FullScreenView';

class ImgShow extends PureComponent {
    //构造函数
    constructor(props) {
        super(props);
    }

    //渲染函数
    render() {
        //打印渲染日志，必写
        systemApi.log("ImgShow render");

        var {close} = this.props;

        return (
            <FullScreenView mask={true}>
                <div className={styles.popupbox} onClick={close}>
                    <div className={styles.popupinnerbox}>
                        <div>
                            <img src={this.props.imgsrc}/>
                        </div>
                    </div>
                </div>
            </FullScreenView>
        );
    }

}

module.exports = ImgShow;
